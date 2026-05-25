import { NextResponse } from "next/server";
import { query } from "@/lib/db";
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

// PATCH: Update content post (admin only)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { category, title_bg, title_en, desc_bg, desc_en, image_url, extra_info } = await request.json();

    // Check if item exists
    const checkItem = await query("SELECT id FROM royal_horse_content WHERE id = $1", [id]);
    if (checkItem.length === 0) {
      return NextResponse.json({ error: "Content item not found" }, { status: 404 });
    }

    await query(
      `UPDATE royal_horse_content 
       SET category = COALESCE($1, category),
           title_bg = COALESCE($2, title_bg),
           title_en = COALESCE($3, title_en),
           desc_bg = COALESCE($4, desc_bg),
           desc_en = COALESCE($5, desc_en),
           image_url = COALESCE($6, image_url),
           extra_info = COALESCE($7, extra_info)
       WHERE id = $8`,
      [category, title_bg, title_en, desc_bg, desc_en, image_url, extra_info, id]
    );

    return NextResponse.json({ success: true, message: "Content item updated successfully" });
  } catch (error) {
    console.error("Update content item error:", error);
    return NextResponse.json({ error: "Failed to update content item" }, { status: 500 });
  }
}

// DELETE: Remove content post (admin only)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    // Check if item exists
    const checkItem = await query("SELECT id FROM royal_horse_content WHERE id = $1", [id]);
    if (checkItem.length === 0) {
      return NextResponse.json({ error: "Content item not found" }, { status: 404 });
    }

    await query("DELETE FROM royal_horse_content WHERE id = $1", [id]);

    return NextResponse.json({ success: true, message: "Content item deleted successfully" });
  } catch (error) {
    console.error("Delete content item error:", error);
    return NextResponse.json({ error: "Failed to delete content item" }, { status: 500 });
  }
}
