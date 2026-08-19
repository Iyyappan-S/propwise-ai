import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
const ctx = { user: null, req: {}, res: {} };
describe("propwise analysis engine", () => {
  it("returns transparent value, scores, classification, and future projections", async () => {
    const result = await appRouter.createCaller(ctx).ml.predict({
      title: "Test plot",
      address: "Bengaluru",
      latitude: 12.97,
      longitude: 77.59,
      areaSqft: 1200,
      propertyType: "Residential plot",
      category: "residential",
      roadAccess: "Paved road",
      amenities: ["School", "Hospital"]
    });
    expect(result.estimatedValue).toBeGreaterThan(0);
    expect(result.pricePerSqft).toBeGreaterThan(0);
    expect(result.marketRange[0]).toBeLessThan(result.estimatedValue);
    expect(result.marketRange[1]).toBeGreaterThan(result.estimatedValue);
    expect(["Urban", "Suburban", "Semi-Rural", "Rural"]).toContain(result.areaType);
    expect(result.locationScore).toBeGreaterThanOrEqual(0);
    expect(result.locationScore).toBeLessThanOrEqual(100);
    expect(result.futureValues).toHaveLength(3);
    expect(result.methodology).toMatch(/indicative/i);
  });
});
