import { supabase, getSupabaseAdmin } from "@/lib/supabase";
import type {
  Speaker,
  SpeakerInsert,
  SpeakerUpdate,
  SpeakerWithSeries,
  SpeakerSeriesInsert,
  SeriesSlug,
  SpeakerRole,
} from "@/lib/supabase/types";

// =============================================================================
// PUBLIC DATA FETCHING (for website)
// =============================================================================

export interface GetSpeakersOptions {
  featured?: boolean;
  limit?: number;
  editionCity?: string;
  editionYear?: number;
}

export async function getSpeakersBySeries(
  seriesSlug: SeriesSlug,
  options?: GetSpeakersOptions
): Promise<SpeakerWithSeries[]> {
  let query = supabase
    .from("speakers")
    .select(
      `
      *,
      speaker_series!inner (
        id,
        series_slug,
        role,
        edition_city,
        edition_year,
        created_at
      )
    `
    )
    .eq("speaker_series.series_slug", seriesSlug)
    .eq("status", "active")
    .order("sort_order", { ascending: true });

  if (options?.featured) {
    query = query.eq("is_featured", true);
  }

  if (options?.editionCity) {
    query = query.eq("speaker_series.edition_city", options.editionCity);
  }

  if (options?.editionYear) {
    query = query.eq("speaker_series.edition_year", options.editionYear);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching speakers:", error);
    throw error;
  }

  return (data as SpeakerWithSeries[]) || [];
}

export async function getAllSpeakers(): Promise<SpeakerWithSeries[]> {
  const { data, error } = await supabase
    .from("speakers")
    .select(
      `
      *,
      speaker_series (
        id,
        series_slug,
        role,
        edition_city,
        edition_year,
        created_at
      )
    `
    )
    .eq("status", "active")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching all speakers:", error);
    throw error;
  }

  return (data as SpeakerWithSeries[]) || [];
}

export async function getSpeakerById(id: string): Promise<SpeakerWithSeries | null> {
  const { data, error } = await supabase
    .from("speakers")
    .select(
      `
      *,
      speaker_series (
        id,
        series_slug,
        role,
        edition_city,
        edition_year,
        created_at
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // Not found
    console.error("Error fetching speaker:", error);
    throw error;
  }

  return data as SpeakerWithSeries;
}

// =============================================================================
// ADMIN FUNCTIONS (server-side only)
// =============================================================================

export async function getAllSpeakersAdmin(): Promise<SpeakerWithSeries[]> {
  const supabaseAdmin = getSupabaseAdmin();

  const { data, error } = await supabaseAdmin
    .from("speakers")
    .select(
      `
      *,
      speaker_series (
        id,
        series_slug,
        role,
        edition_city,
        edition_year,
        created_at
      )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching speakers (admin):", error);
    throw error;
  }

  return (data as SpeakerWithSeries[]) || [];
}

export async function getSpeakerByIdAdmin(id: string): Promise<SpeakerWithSeries | null> {
  const supabaseAdmin = getSupabaseAdmin();

  const { data, error } = await supabaseAdmin
    .from("speakers")
    .select(
      `
      *,
      speaker_series (
        id,
        series_slug,
        role,
        edition_city,
        edition_year,
        created_at
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    console.error("Error fetching speaker (admin):", error);
    throw error;
  }

  return data as SpeakerWithSeries;
}

export async function createSpeaker(speaker: SpeakerInsert): Promise<Speaker> {
  const supabaseAdmin = getSupabaseAdmin();

  const { data, error } = await supabaseAdmin
    .from("speakers")
    .insert(speaker)
    .select()
    .single();

  if (error) {
    console.error("Error creating speaker:", error);
    throw error;
  }

  return data;
}

export async function updateSpeaker(id: string, updates: SpeakerUpdate): Promise<Speaker> {
  const supabaseAdmin = getSupabaseAdmin();

  const { data, error } = await supabaseAdmin
    .from("speakers")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating speaker:", error);
    throw error;
  }

  return data;
}

export async function deleteSpeaker(id: string): Promise<void> {
  const supabaseAdmin = getSupabaseAdmin();

  const { error } = await supabaseAdmin.from("speakers").delete().eq("id", id);

  if (error) {
    console.error("Error deleting speaker:", error);
    throw error;
  }
}

// Speaker Series assignments
export async function addSpeakerToSeries(
  speakerId: string,
  seriesSlug: SeriesSlug,
  role: SpeakerRole = "speaker",
  editionCity?: string,
  editionYear?: number
): Promise<void> {
  const supabaseAdmin = getSupabaseAdmin();

  const assignment: SpeakerSeriesInsert = {
    speaker_id: speakerId,
    series_slug: seriesSlug,
    role,
    edition_city: editionCity || null,
    edition_year: editionYear || null,
  };

  const { error } = await supabaseAdmin.from("speaker_series").insert(assignment);

  if (error) {
    console.error("Error adding speaker to series:", error);
    throw error;
  }
}

export async function removeSpeakerFromSeries(assignmentId: string): Promise<void> {
  const supabaseAdmin = getSupabaseAdmin();

  const { error } = await supabaseAdmin
    .from("speaker_series")
    .delete()
    .eq("id", assignmentId);

  if (error) {
    console.error("Error removing speaker from series:", error);
    throw error;
  }
}
