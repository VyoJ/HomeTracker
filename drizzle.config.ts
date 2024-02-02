import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({ path: ".env.local" });

const config: Config = {
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle",
  driver: "pg",
  dbCredentials: {
    host: process.env.DATABASE_HOST!,
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    port: 5432,
    database: process.env.DATABASE_DB_NAME!,
  },
};

export default config;