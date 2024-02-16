export interface itm {
  id: string;
  user: string | null;
  name: string;
  qty: string;
  category: string;
  created_at: Date;
}

// const items = pgTable("items", {
//   id: uuid("id").defaultRandom().notNull().primaryKey(),
//   user: text("userid").default("1"),
//   name: text("name").notNull(),
//   qty: text("qty").notNull(),
//   category: text("category").notNull(),
//   created_at: timestamp("created_at").notNull().defaultNow(),
// });
