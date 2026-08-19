import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { invokeLLM } from "./_core/llm";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { createAnalysis, createComparison, createLocation, createProperty, deleteProperty, getProperty, listAnalyses, listProperties, listSaved, removeSaved, saveProperty, updateProperty } from "./db";
const inputSchema = z.object({
  title: z.string().min(2).default("Untitled property"),
  address: z.string().optional(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  areaSqft: z.number().positive(),
  propertyType: z.string().default("Land parcel"),
  category: z.enum(["residential", "commercial", "agricultural"]).default("residential"),
  bedrooms: z.number().int().nonnegative().optional(),
  bathrooms: z.number().int().nonnegative().optional(),
  propertyAge: z.number().int().nonnegative().optional(),
  roadAccess: z.enum(["Main road", "Paved road", "Narrow road", "Unpaved", "Unknown"]).default("Unknown"),
  facing: z.string().optional(),
  parking: z.number().int().nonnegative().optional(),
  amenities: z.array(z.string()).default([]),
  sourceUrl: z.string().url().optional()
});
function haversine(lat, lng, lat2, lng2) {
  const r = 6371;
  const dLat = (lat2 - lat) * Math.PI / 180;
  const dLng = (lng2 - lng) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return r * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function buildAnalysis(input) {
  const urbanSignal = Math.max(0, Math.min(1, (Math.abs(input.latitude) < 30 ? 0.2 : 0.08) + (input.roadAccess === "Main road" ? 0.55 : input.roadAccess === "Paved road" ? 0.35 : 0.12) + input.amenities.length * 0.04));
  const areaType = urbanSignal > 0.62 ? "Urban" : urbanSignal > 0.4 ? "Suburban" : urbanSignal > 0.2 ? "Semi-Rural" : "Rural";
  const base = input.category === "commercial" ? 6100 : input.category === "agricultural" ? 620 : 3350;
  const locationPulse = 1 + (Math.sin(input.latitude * 9) + Math.cos(input.longitude * 7)) * 0.06;
  const roadBoost = input.roadAccess === "Main road" ? 1.32 : input.roadAccess === "Paved road" ? 1.12 : input.roadAccess === "Narrow road" ? 0.94 : 0.82;
  const amenityBoost = 1 + Math.min(0.2, input.amenities.length * 0.025);
  const agePenalty = input.propertyAge ? Math.max(0.78, 1 - input.propertyAge * 8e-3) : 1;
  const pricePerSqft = Math.round(base * locationPulse * roadBoost * amenityBoost * agePenalty);
  const estimatedValue = Math.round(pricePerSqft * input.areaSqft);
  const connectivity = input.roadAccess === "Main road" ? 94 : input.roadAccess === "Paved road" ? 81 : input.roadAccess === "Narrow road" ? 63 : 44;
  const facilities = Math.min(96, 52 + input.amenities.length * 8);
  const development = areaType === "Urban" ? 91 : areaType === "Suburban" ? 82 : areaType === "Semi-Rural" ? 65 : 48;
  const demand = input.category === "commercial" ? 84 : input.category === "residential" ? 76 : 58;
  const growth = areaType === "Suburban" ? 88 : areaType === "Urban" ? 76 : 63;
  const locationScore = Math.round(connectivity * 0.25 + facilities * 0.2 + development * 0.2 + demand * 0.15 + growth * 0.1 + 70 * 0.1);
  const investmentScore = Math.round(locationScore * 0.55 + growth * 0.25 + (input.category === "commercial" ? 88 : 74) * 0.2);
  const annualAppreciation = areaType === "Suburban" ? 8.2 : areaType === "Urban" ? 6.6 : areaType === "Semi-Rural" ? 5.4 : 3.8;
  const futureValues = [1, 3, 5].map((years) => ({ horizon: `${years} year${years > 1 ? "s" : ""}`, value: Math.round(pricePerSqft * (1 + annualAppreciation / 100) ** years * input.areaSqft) }));
  const risks = [input.roadAccess === "Unknown" ? "Road access should be independently verified." : "Road access is an input-based signal, not a title or right-of-way verification.", "Planning approvals, title, taxes, zoning, and utilities were not verified by this model."];
  return { estimatedValue, pricePerSqft, marketRange: [Math.round(estimatedValue * 0.93), Math.round(estimatedValue * 1.07)], areaType, classificationConfidence: Math.round(68 + Math.min(24, input.amenities.length * 3) + (input.roadAccess !== "Unknown" ? 5 : 0)), locationScore, investmentScore, annualAppreciation, futureValues, factors: [{ name: "Connectivity", score: connectivity, weight: 25, note: "Derived from the supplied road-access signal." }, { name: "Nearby facilities", score: facilities, weight: 20, note: "Based on user-supplied amenity indicators." }, { name: "Development", score: development, weight: 20, note: "Transparent area-type heuristic." }, { name: "Demand", score: demand, weight: 15, note: "Category-weighted indicative demand." }, { name: "Growth potential", score: growth, weight: 10, note: "Model-based forward signal." }], facilities: [{ name: "Schools", distanceKm: Math.max(0.4, 2.4 - input.amenities.length * 0.1), availability: input.amenities.includes("School") ? "Reported nearby" : "Needs verification" }, { name: "Hospitals", distanceKm: Math.max(0.8, 4.2 - input.amenities.length * 0.12), availability: input.amenities.includes("Hospital") ? "Reported nearby" : "Needs verification" }, { name: "Main road", distanceKm: input.roadAccess === "Main road" ? 0.2 : 1.6, availability: input.roadAccess === "Unknown" ? "Needs verification" : "Input-based" }], risks, methodology: "Indicative JavaScript valuation heuristic using location coordinates, property inputs, access, category, and amenity signals. It is not a professional appraisal and does not claim live comparable transactions." };
}
async function explain(result, input) {
  try {
    const response = await invokeLLM({ messages: [{ role: "system", content: "You are a cautious real-estate research assistant. Use only the supplied numbers. Never invent ownership, title, approvals, market comparables, or legal records. Return JSON." }, { role: "user", content: JSON.stringify({ task: "Explain this indicative property analysis", input, result }) }], response_format: { type: "json_schema", json_schema: { name: "property_explanation", strict: true, schema: { type: "object", properties: { summary: { type: "string" }, advantages: { type: "array", items: { type: "string" } }, concerns: { type: "array", items: { type: "string" } }, dueDiligence: { type: "array", items: { type: "string" } }, negotiation: { type: "array", items: { type: "string" } } }, required: ["summary", "advantages", "concerns", "dueDiligence", "negotiation"], additionalProperties: false } } } });
    const content = response.choices?.[0]?.message?.content;
    return content ? JSON.parse(typeof content === "string" ? content : JSON.stringify(content)) : void 0;
  } catch {
    return { summary: "The model-based analysis suggests a potentially workable location, but the result remains indicative and should be verified against current local evidence.", advantages: ["Clear access and amenity inputs improve the signal quality.", "The area classification and score are transparent and measurable."], concerns: ["No title, approval, tax, or live comparable verification was performed."], dueDiligence: ["Verify title, ownership, zoning, approvals, taxes, utilities, and road rights with qualified professionals."], negotiation: ["Use the indicative range as a discussion anchor, not as a guaranteed market value."] };
  }
}
const appRouter = router({
  system: systemRouter,
  auth: router({ me: publicProcedure.query((opts) => opts.ctx.user), logout: publicProcedure.mutation(({ ctx }) => {
    ctx.res.clearCookie(COOKIE_NAME, { ...getSessionCookieOptions(ctx.req), maxAge: -1 });
    return { success: true };
  }) }),
  analysis: router({ analyze: protectedProcedure.input(inputSchema).mutation(async ({ ctx, input }) => {
    const result = await buildAnalysis(input);
    result.aiExplanation = await explain(result, input);
    const loc = await createLocation({ userId: ctx.user.id, address: input.address ?? null, latitude: input.latitude, longitude: input.longitude, areaType: result.areaType });
    if (!loc) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
    const property = await createProperty({ userId: ctx.user.id, locationId: loc.id, title: input.title, propertyType: input.propertyType, category: input.category, areaSqft: input.areaSqft, bedrooms: input.bedrooms ?? null, bathrooms: input.bathrooms ?? null, propertyAge: input.propertyAge ?? null, roadAccess: input.roadAccess, facing: input.facing ?? null, parking: input.parking ?? null, amenities: input.amenities, sourceUrl: input.sourceUrl ?? null });
    if (!property) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Property could not be saved" });
    const analysis = await createAnalysis({ userId: ctx.user.id, propertyId: property.id, result });
    return { ...result, propertyId: property.id, analysisId: analysis?.id };
  }), history: protectedProcedure.query(({ ctx }) => listAnalyses(ctx.user.id)) }),
  properties: router({ list: protectedProcedure.query(({ ctx }) => listProperties(ctx.user.id)), get: protectedProcedure.input(z.object({ id: z.number() })).query(({ ctx, input }) => getProperty(ctx.user.id, input.id)), create: protectedProcedure.input(inputSchema).mutation(async ({ ctx, input }) => {
    const loc = await createLocation({ userId: ctx.user.id, address: input.address ?? null, latitude: input.latitude, longitude: input.longitude, areaType: buildAnalysis(input).areaType });
    if (!loc) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
    return createProperty({ userId: ctx.user.id, locationId: loc.id, title: input.title, propertyType: input.propertyType, category: input.category, areaSqft: input.areaSqft, bedrooms: input.bedrooms ?? null, bathrooms: input.bathrooms ?? null, propertyAge: input.propertyAge ?? null, roadAccess: input.roadAccess, facing: input.facing ?? null, parking: input.parking ?? null, amenities: input.amenities, sourceUrl: input.sourceUrl ?? null });
  }), update: protectedProcedure.input(z.object({ id: z.number(), title: z.string().min(2).optional(), areaSqft: z.number().positive().optional(), notes: z.string().optional() })).mutation(({ ctx, input }) => updateProperty(ctx.user.id, input.id, { title: input.title, areaSqft: input.areaSqft })), remove: protectedProcedure.input(z.object({ id: z.number() })).mutation(({ ctx, input }) => deleteProperty(ctx.user.id, input.id)) }),
  saved: router({ list: protectedProcedure.query(({ ctx }) => listSaved(ctx.user.id)), add: protectedProcedure.input(z.object({ propertyId: z.number(), notes: z.string().optional(), tags: z.array(z.string()).default([]) })).mutation(({ ctx, input }) => saveProperty({ userId: ctx.user.id, propertyId: input.propertyId, notes: input.notes ?? null, tags: input.tags, favorite: 0 })), remove: protectedProcedure.input(z.object({ id: z.number() })).mutation(({ ctx, input }) => removeSaved(ctx.user.id, input.id)) }),
  comparison: router({ analyze: protectedProcedure.input(z.object({ propertyIds: z.array(z.number()).min(2).max(4) })).mutation(async ({ ctx, input }) => {
    const props = await Promise.all(input.propertyIds.map((id) => getProperty(ctx.user.id, id)));
    const valid = props.filter(Boolean);
    if (valid.length < 2) throw new TRPCError({ code: "BAD_REQUEST", message: "Select at least two saved properties." });
    const recommendation = `Compare the ${valid.length} selected properties using location score, access, indicative price, area fit, and verification readiness. The highest score should not override title, zoning, tax, or inspection checks.`;
    return { properties: valid, recommendation, comparisonId: (await createComparison({ userId: ctx.user.id, propertyIds: input.propertyIds, recommendation }))?.id };
  }) }),
  ai: router({ explain: protectedProcedure.input(z.object({ result: z.any(), input: z.any() })).mutation(({ input }) => explain(input.result, input.input)) }),
  ml: router({ predict: publicProcedure.input(inputSchema).mutation(({ input }) => buildAnalysis(input)) })
});
export {
  appRouter,
  buildAnalysis
};
