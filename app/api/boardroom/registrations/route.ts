import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ═══════════════════════════════════════════════════════════════════════════
// ADMIN: LIST/MANAGE BOARDROOM REGISTRATIONS
// ═══════════════════════════════════════════════════════════════════════════

const ADMIN_SECRET = process.env.BOARDROOM_ADMIN_SECRET || "";

function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !ADMIN_SECRET) return false;
  
  const token = authHeader.replace("Bearer ", "");
  return token === ADMIN_SECRET;
}

// GET: List all registrations for a boardroom
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const roomName = searchParams.get("roomName");
  const status = searchParams.get("status");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  let query = supabase
    .from("boardroom_registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (roomName) {
    query = query.eq("room_name", roomName);
  }

  if (status) {
    query = query.eq("status", status);
  }

  const { data: registrations, error } = await query;

  if (error) {
    console.error("Fetch registrations error:", error);
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 });
  }

  // Get summary stats
  const stats = {
    total: registrations?.length || 0,
    registered: registrations?.filter(r => r.status === "registered").length || 0,
    admitted: registrations?.filter(r => r.status === "admitted").length || 0,
    joined: registrations?.filter(r => r.status === "joined").length || 0,
    rejected: registrations?.filter(r => r.status === "rejected").length || 0,
    cancelled: registrations?.filter(r => r.status === "cancelled").length || 0,
  };

  return NextResponse.json({
    success: true,
    registrations,
    stats,
  });
}

// PATCH: Update registration status (admit/reject)
export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { registrationId, status, reason } = body;

    if (!registrationId || !status) {
      return NextResponse.json(
        { error: "Registration ID and status are required" },
        { status: 400 }
      );
    }

    const validStatuses = ["registered", "admitted", "joined", "rejected", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const updateData: Record<string, any> = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (reason) {
      updateData.admin_notes = reason;
    }

    if (status === "admitted") {
      updateData.admitted_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from("boardroom_registrations")
      .update(updateData)
      .eq("id", registrationId)
      .select()
      .single();

    if (error) {
      console.error("Update registration error:", error);
      return NextResponse.json({ error: "Failed to update registration" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      registration: data,
    });
  } catch (err) {
    console.error("Update registration error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE: Remove a registration
export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const registrationId = searchParams.get("id");

  if (!registrationId) {
    return NextResponse.json({ error: "Registration ID is required" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error } = await supabase
    .from("boardroom_registrations")
    .delete()
    .eq("id", registrationId);

  if (error) {
    console.error("Delete registration error:", error);
    return NextResponse.json({ error: "Failed to delete registration" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
