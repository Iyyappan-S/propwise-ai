import { and, desc, eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { analyses, comparisons, locations, properties, savedProperties, users } from "../drizzle/schema";
import { ENV } from "./_core/env";
let _db = null;
async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
    }
  }
  return _db;
}
async function upsertUser(user) {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;
  const values = { openId: user.openId, name: user.name ?? null, email: user.email ?? null, loginMethod: user.loginMethod ?? null, lastSignedIn: user.lastSignedIn ?? /* @__PURE__ */ new Date() };
  const updateSet = { name: values.name, email: values.email, loginMethod: values.loginMethod, lastSignedIn: values.lastSignedIn };
  if (user.role || user.openId === ENV.ownerOpenId) {
    values.role = user.role ?? "admin";
    updateSet.role = values.role;
  }
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) return void 0;
  const rows = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return rows[0];
}
async function createLocation(input) {
  const db = await getDb();
  if (!db) return null;
  const r = await db.insert(locations).values(input);
  return { id: Number(r[0].insertId), ...input };
}
async function createProperty(input) {
  const db = await getDb();
  if (!db) return null;
  const r = await db.insert(properties).values(input);
  return { id: Number(r[0].insertId), ...input };
}
async function createAnalysis(input) {
  const db = await getDb();
  if (!db) return null;
  const r = await db.insert(analyses).values(input);
  return { id: Number(r[0].insertId), ...input };
}
async function listProperties(userId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(properties).where(eq(properties.userId, userId)).orderBy(desc(properties.createdAt));
}
async function getProperty(userId, id) {
  const db = await getDb();
  if (!db) return void 0;
  const r = await db.select().from(properties).where(and(eq(properties.userId, userId), eq(properties.id, id))).limit(1);
  return r[0];
}
async function listAnalyses(userId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(analyses).where(eq(analyses.userId, userId)).orderBy(desc(analyses.createdAt));
}
async function saveProperty(input) {
  const db = await getDb();
  if (!db) return null;
  const r = await db.insert(savedProperties).values(input);
  return { id: Number(r[0].insertId), ...input };
}
async function listSaved(userId) {
  const db = await getDb();
  if (!db) return [];
  const saved = await db.select().from(savedProperties).where(eq(savedProperties.userId, userId)).orderBy(desc(savedProperties.createdAt));
  const ids = saved.map((s) => s.propertyId);
  const props = ids.length ? await db.select().from(properties).where(and(eq(properties.userId, userId), inArray(properties.id, ids))) : [];
  return saved.map((s) => ({ ...s, property: props.find((p) => p.id === s.propertyId) ?? null }));
}
async function removeSaved(userId, id) {
  const db = await getDb();
  if (!db) return;
  await db.delete(savedProperties).where(and(eq(savedProperties.userId, userId), eq(savedProperties.id, id)));
}
async function createComparison(input) {
  const db = await getDb();
  if (!db) return null;
  const r = await db.insert(comparisons).values(input);
  return { id: Number(r[0].insertId), ...input };
}
async function updateProperty(userId, id, input) {
  const db = await getDb();
  if (!db) return null;
  await db.update(properties).set(input).where(and(eq(properties.userId, userId), eq(properties.id, id)));
  return getProperty(userId, id);
}
async function deleteProperty(userId, id) {
  const db = await getDb();
  if (!db) return;
  await db.delete(properties).where(and(eq(properties.userId, userId), eq(properties.id, id)));
}
export {
  createAnalysis,
  createComparison,
  createLocation,
  createProperty,
  deleteProperty,
  getDb,
  getProperty,
  getUserByOpenId,
  listAnalyses,
  listProperties,
  listSaved,
  removeSaved,
  saveProperty,
  updateProperty,
  upsertUser
};
