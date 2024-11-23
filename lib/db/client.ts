import { DATABASE_URL } from "@/constant";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

neonConfig.fetchConnectionCache = true;

const sql = neon(DATABASE_URL);
export const db = drizzle({ client: sql });
