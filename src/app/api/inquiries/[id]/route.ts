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

// PATCH: Update status or notes of a specific inquiry
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const { status, notes } = await request.json();

    // Dynamically build the update query
    const fieldsToUpdate: string[] = [];
    const values: any[] = [];
    let paramCounter = 1;

    if (status !== undefined) {
      // Validate status
      const validStatuses = ["New", "In Progress", "Completed"];
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
      }
      fieldsToUpdate.push(`status = $${paramCounter}`);
      values.push(status);
      paramCounter++;
    }

    if (notes !== undefined) {
      fieldsToUpdate.push(`notes = $${paramCounter}`);
      values.push(notes);
      paramCounter++;
    }

    if (fieldsToUpdate.length === 0) {
      return NextResponse.json({ error: "No fields provided to update" }, { status: 400 });
    }

    values.push(numericId);
    const queryStr = `UPDATE royal_horse_inquiries SET ${fieldsToUpdate.join(", ")} WHERE id = $${paramCounter} RETURNING id`;
    
    const result = await query(queryStr, values);

    if (result.length === 0) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Inquiry updated successfully" });
  } catch (error) {
    console.error("Update inquiry error:", error);
    return NextResponse.json(
      { error: "Failed to update inquiry" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a specific inquiry
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const result = await query("DELETE FROM royal_horse_inquiries WHERE id = $1 RETURNING id", [numericId]);

    if (result.length === 0) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Inquiry deleted successfully" });
  } catch (error) {
    console.error("Delete inquiry error:", error);
    return NextResponse.json(
      { error: "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}
