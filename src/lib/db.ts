import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_bSrPTYDe31La@ep-falling-butterfly-ap87uv6e-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require";

const sql = neon(databaseUrl);

export async function query(queryString: string, params: any[] = []) {
  try {
    return await (sql as any)(queryString, params);
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function initDb() {
  try {
    // Create table with all columns
    await query(`
      CREATE TABLE IF NOT EXISTS royal_horse_inquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        message TEXT DEFAULT '',
        service VARCHAR(100) DEFAULT '',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) DEFAULT 'New',
        notes TEXT DEFAULT ''
      );
    `);

    // Migrate: add message and service columns if table already exists without them
    await query(`
      ALTER TABLE royal_horse_inquiries ADD COLUMN IF NOT EXISTS message TEXT DEFAULT '';
    `);
    await query(`
      ALTER TABLE royal_horse_inquiries ADD COLUMN IF NOT EXISTS service VARCHAR(100) DEFAULT '';
    `);

    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
}
