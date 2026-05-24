import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_bSrPTYDe31La@ep-falling-butterfly-ap87uv6e-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

if (!databaseUrl) {
  console.warn("DATABASE_URL is not set. Please configure it in your environment variables.");
}

const sql = neon(databaseUrl);

export async function query(queryString: string, params: any[] = []) {
  try {
    // Replace placeholders from $1, $2 to actual values or pass them to sql
    // The neon driver allows tagged templates or direct parameterized queries depending on usage.
    // The sql function is called as: sql('SELECT * FROM table WHERE id = $1', [id])
    return await (sql as any)(queryString, params);
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function initDb() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS royal_horse_inquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) DEFAULT 'New',
        notes TEXT DEFAULT ''
      );
    `);
    console.log("Database initialized successfully: royal_horse_inquiries table is ready.");
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
}
