import { int, json, mysqlEnum, mysqlTable, text, timestamp, varchar, double } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const locations = mysqlTable("locations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  address: text("address"),
  latitude: double("latitude").notNull(),
  longitude: double("longitude").notNull(),
  areaType: mysqlEnum("areaType", ["Urban", "Suburban", "Semi-Rural", "Rural"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const properties = mysqlTable("properties", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  locationId: int("locationId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  propertyType: varchar("propertyType", { length: 80 }).notNull(),
  category: varchar("category", { length: 40 }).notNull(),
  areaSqft: double("areaSqft").notNull(),
  bedrooms: int("bedrooms"),
  bathrooms: int("bathrooms"),
  propertyAge: int("propertyAge"),
  roadAccess: varchar("roadAccess", { length: 40 }),
  facing: varchar("facing", { length: 20 }),
  parking: int("parking"),
  amenities: json("amenities"),
  sourceUrl: text("sourceUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const analyses = mysqlTable("analyses", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  propertyId: int("propertyId").notNull(),
  result: json("result").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const savedProperties = mysqlTable("savedProperties", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  propertyId: int("propertyId").notNull(),
  notes: text("notes"),
  tags: json("tags"),
  favorite: int("favorite").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const comparisons = mysqlTable("comparisons", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  propertyIds: json("propertyIds").notNull(),
  recommendation: text("recommendation"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Location = typeof locations.$inferSelect;
export type Property = typeof properties.$inferSelect;
export type Analysis = typeof analyses.$inferSelect;
export type SavedProperty = typeof savedProperties.$inferSelect;
export type Comparison = typeof comparisons.$inferSelect;
