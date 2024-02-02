import { timestamp, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const items = pgTable("items", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  user: text("userid").default("1"),
  name: text("name").notNull(),
  qty: text("qty").notNull(),
  category: text("category").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow()
});