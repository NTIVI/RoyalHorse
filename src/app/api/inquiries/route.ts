import { NextResponse } from "next/server";
import { query, initDb } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "royal-horse-secret-key-2026";

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

// GET: Fetch all inquiries (admin only)
export async function GET(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Ensure table exists
    await initDb();
    
    // Fetch inquiries sorted by created_at descending
    const result = await query(
      "SELECT id, name, phone, email, created_at, status, notes FROM royal_horse_inquiries ORDER BY created_at DESC"
    );
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("Fetch inquiries error:", error);
    return NextResponse.json(
      { error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}

// POST: Submit a new inquiry (public)
export async function POST(request: Request) {
  try {
    const { name, phone, email } = await request.json();

    // Basic validation
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Name, phone, and email are required fields" },
        { status: 400 }
      );
    }

    // Phone and Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Minimal phone validation (digits, spaces, plus, dashes, parentheses)
    const phoneRegex = /^[\d\s+\-()]{6,20}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 });
    }

    // Ensure database is initialized
    await initDb();

    // Insert into DB
    const result = await query(
      "INSERT INTO royal_horse_inquiries (name, phone, email, status) VALUES ($1, $2, $3, $4) RETURNING id",
      [name.trim(), phone.trim(), email.trim(), "New"]
    );

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully",
      id: result[0]?.id,
    });
  } catch (error) {
    console.error("Submit inquiry error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
