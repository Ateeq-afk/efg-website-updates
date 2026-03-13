import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ═══════════════════════════════════════════════════════════════════════════
// VERIFY BOARDROOM TOKEN
// ═══════════════════════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, roomName } = body;

    if (!token) {
      return NextResponse.json(
        { valid: false, error: "Token is required" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { valid: false, error: "Database not configured" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Find registration with this token
    let query = supabase
      .from("boardroom_registrations")
      .select("*, boardrooms!inner(*)")
      .eq("join_token", token);

    if (roomName) {
      query = query.eq("room_name", roomName);
    }

    const { data: registration, error } = await query.single();

    if (error || !registration) {
      return NextResponse.json(
        { valid: false, error: "Invalid or expired token" },
        { status: 404 }
      );
    }

    // Check if registration status allows joining
    if (registration.status === "cancelled" || registration.status === "rejected") {
      return NextResponse.json(
        { valid: false, error: "This registration has been cancelled" },
        { status: 403 }
      );
    }

    // Get boardroom details
    const boardroom = registration.boardrooms;

    return NextResponse.json({
      valid: true,
      registration: {
        id: registration.id,
        fullName: registration.full_name,
        email: registration.email,
        company: registration.company,
        jobTitle: registration.job_title,
        status: registration.status,
        roomName: registration.room_name,
      },
      boardroom: boardroom ? {
        title: boardroom.title,
        description: boardroom.description,
        scheduledTime: boardroom.scheduled_time,
        maxParticipants: boardroom.max_participants,
        sponsorName: boardroom.sponsor_name,
        sponsorLogo: boardroom.sponsor_logo,
      } : null,
    });
  } catch (err) {
    console.error("Verify token error:", err);
    return NextResponse.json(
      { valid: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const roomName = searchParams.get("roomName");

  if (!token) {
    return NextResponse.json(
      { valid: false, error: "Token is required" },
      { status: 400 }
    );
  }

  // Reuse POST logic
  const mockRequest = {
    json: async () => ({ token, roomName }),
  } as NextRequest;

  return POST(mockRequest);
}
