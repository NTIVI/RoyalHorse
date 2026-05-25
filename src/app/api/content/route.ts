import { NextResponse } from "next/server";
import { query, initDb } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "royal-horse-secret-key-2026-auth";

function checkAuth(request: Request): boolean {
  try {
    const token = request.headers.get("cookie")
      ?.split(";")
      .find((c) => c.trim().startsWith("royal_horse_admin_token="))
      ?.split("=")[1];

    if (!token) return false;
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

// GET: Fetch content (public, optional filter by category)
export async function GET(request: Request) {
  try {
    await initDb();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let result;
    if (category) {
      result = await query(
        "SELECT id, category, title_bg, title_en, desc_bg, desc_en, image_url, extra_info, created_at FROM royal_horse_content WHERE category = $1 ORDER BY id ASC",
        [category]
      );
    } else {
      result = await query(
        "SELECT id, category, title_bg, title_en, desc_bg, desc_en, image_url, extra_info, created_at FROM royal_horse_content ORDER BY category ASC, id ASC"
      );
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("Fetch content error:", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

// POST: Add new content (admin only)
export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { category, title_bg, title_en, desc_bg, desc_en, image_url, extra_info } = await request.json();

    if (!category) {
      return NextResponse.json({ error: "Category is required" }, { status: 400 });
    }

    await initDb();

    const result = await query(
      `INSERT INTO royal_horse_content (category, title_bg, title_en, desc_bg, desc_en, image_url, extra_info) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [
        category,
        title_bg || "",
        title_en || "",
        desc_bg || "",
        desc_en || "",
        image_url || "",
        extra_info || ""
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Content post added successfully",
      id: result[0]?.id
    });
  } catch (error) {
    console.error("Add content error:", error);
    return NextResponse.json({ error: "Failed to add content" }, { status: 500 });
  }
}
