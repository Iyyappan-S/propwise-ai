import { and, desc, eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { analyses, comparisons, InsertUser, locations, properties, savedProperties, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try { _db = drizzle(process.env.DATABASE_URL); } catch (error) { console.warn("[Database] Failed to connect:", error); }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb(); if (!db) return;
  const values: InsertUser = { openId: user.openId, name: user.name ?? null, email: user.email ?? null, loginMethod: user.loginMethod ?? null, lastSignedIn: user.lastSignedIn ?? new Date() };
  const updateSet: Record<string, unknown> = { name: values.name, email: values.email, loginMethod: values.loginMethod, lastSignedIn: values.lastSignedIn };
  if (user.role || user.openId === ENV.ownerOpenId) { values.role = user.role ?? "admin"; updateSet.role = values.role; }
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}
export async function getUserByOpenId(openId: string) { const db = await getDb(); if (!db) return undefined; const rows = await db.select().from(users).where(eq(users.openId, openId)).limit(1); return rows[0]; }
export async function createLocation(input: typeof locations.$inferInsert) { const db = await getDb(); if (!db) return null; const r = await db.insert(locations).values(input); return { id: Number(r[0].insertId), ...input }; }
export async function createProperty(input: typeof properties.$inferInsert) { const db = await getDb(); if (!db) return null; const r = await db.insert(properties).values(input); return { id: Number(r[0].insertId), ...input }; }
export async function createAnalysis(input: typeof analyses.$inferInsert) { const db = await getDb(); if (!db) return null; const r = await db.insert(analyses).values(input); return { id: Number(r[0].insertId), ...input }; }
export async function listProperties(userId: number) { const db = await getDb(); if (!db) return []; return db.select().from(properties).where(eq(properties.userId, userId)).orderBy(desc(properties.createdAt)); }
export async function getProperty(userId: number, id: number) { const db = await getDb(); if (!db) return undefined; const r = await db.select().from(properties).where(and(eq(properties.userId, userId), eq(properties.id, id))).limit(1); return r[0]; }
export async function listAnalyses(userId: number) { const db = await getDb(); if (!db) return []; return db.select().from(analyses).where(eq(analyses.userId, userId)).orderBy(desc(analyses.createdAt)); }
export async function saveProperty(input: typeof savedProperties.$inferInsert) { const db = await getDb(); if (!db) return null; const r = await db.insert(savedProperties).values(input); return { id: Number(r[0].insertId), ...input }; }
export async function listSaved(userId: number) { const db = await getDb(); if (!db) return []; const saved = await db.select().from(savedProperties).where(eq(savedProperties.userId, userId)).orderBy(desc(savedProperties.createdAt)); const ids = saved.map(s => s.propertyId); const props = ids.length ? await db.select().from(properties).where(and(eq(properties.userId, userId), inArray(properties.id, ids))) : []; return saved.map(s => ({ ...s, property: props.find(p => p.id === s.propertyId) ?? null })); }
export async function removeSaved(userId: number, id: number) { const db = await getDb(); if (!db) return; await db.delete(savedProperties).where(and(eq(savedProperties.userId, userId), eq(savedProperties.id, id))); }
export async function createComparison(input: typeof comparisons.$inferInsert) { const db = await getDb(); if (!db) return null; const r = await db.insert(comparisons).values(input); return { id: Number(r[0].insertId), ...input }; }
export async function updateProperty(userId: number, id: number, input: Partial<typeof properties.$inferInsert>) { const db = await getDb(); if (!db) return null; await db.update(properties).set(input).where(and(eq(properties.userId, userId), eq(properties.id, id))); return getProperty(userId, id); }
export async function deleteProperty(userId: number, id: number) { const db = await getDb(); if (!db) return; await db.delete(properties).where(and(eq(properties.userId, userId), eq(properties.id, id))); }
