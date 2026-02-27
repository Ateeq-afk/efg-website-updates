// Database types for Supabase

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type SeriesSlug = "cyber-first" | "ot-security-first" | "data-ai-first" | "opex-first";
export type SpeakerRole = "speaker" | "advisor" | "panelist" | "workshop_lead" | "keynote" | "moderator" | "chair";
export type SponsorTier = "platinum" | "gold" | "silver" | "bronze" | "title" | "partner" | "lead" | "associate" | "strategic" | "consulting" | "knowledge" | "community" | "media" | "supporting" | "networking" | "patronage";
export type Status = "active" | "inactive" | "pending";

export interface Database {
  public: {
    Tables: {
      speakers: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          job_title: string;
          organization: string;
          photo_url: string | null;
          bio: string | null;
          linkedin_url: string | null;
          twitter_url: string | null;
          email: string | null;
          country: string | null;
          is_featured: boolean;
          sort_order: number;
          status: Status;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          job_title: string;
          organization: string;
          photo_url?: string | null;
          bio?: string | null;
          linkedin_url?: string | null;
          twitter_url?: string | null;
          email?: string | null;
          country?: string | null;
          is_featured?: boolean;
          sort_order?: number;
          status?: Status;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          job_title?: string;
          organization?: string;
          photo_url?: string | null;
          bio?: string | null;
          linkedin_url?: string | null;
          twitter_url?: string | null;
          email?: string | null;
          country?: string | null;
          is_featured?: boolean;
          sort_order?: number;
          status?: Status;
          created_at?: string;
          updated_at?: string;
        };
      };
      speaker_series: {
        Row: {
          id: string;
          speaker_id: string;
          series_slug: SeriesSlug;
          role: SpeakerRole;
          edition_city: string | null;
          edition_year: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          speaker_id: string;
          series_slug: SeriesSlug;
          role?: SpeakerRole;
          edition_city?: string | null;
          edition_year?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          speaker_id?: string;
          series_slug?: SeriesSlug;
          role?: SpeakerRole;
          edition_city?: string | null;
          edition_year?: number | null;
          created_at?: string;
        };
      };
      sponsors: {
        Row: {
          id: string;
          name: string;
          logo_url: string | null;
          website_url: string | null;
          tier: SponsorTier;
          description: string | null;
          sort_order: number;
          status: Status;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          logo_url?: string | null;
          website_url?: string | null;
          tier: SponsorTier;
          description?: string | null;
          sort_order?: number;
          status?: Status;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          logo_url?: string | null;
          website_url?: string | null;
          tier?: SponsorTier;
          description?: string | null;
          sort_order?: number;
          status?: Status;
          created_at?: string;
          updated_at?: string;
        };
      };
      sponsor_series: {
        Row: {
          id: string;
          sponsor_id: string;
          series_slug: SeriesSlug;
          tier_override: string | null;
          edition_city: string | null;
          edition_year: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          sponsor_id: string;
          series_slug: SeriesSlug;
          tier_override?: string | null;
          edition_city?: string | null;
          edition_year?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          sponsor_id?: string;
          series_slug?: SeriesSlug;
          tier_override?: string | null;
          edition_city?: string | null;
          edition_year?: number | null;
          created_at?: string;
        };
      };
      series: {
        Row: {
          slug: string;
          name: string;
          tagline: string | null;
          color: string | null;
          description: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          slug: string;
          name: string;
          tagline?: string | null;
          color?: string | null;
          description?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          slug?: string;
          name?: string;
          tagline?: string | null;
          color?: string | null;
          description?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}

// Convenience types
export type Speaker = Database["public"]["Tables"]["speakers"]["Row"];
export type SpeakerInsert = Database["public"]["Tables"]["speakers"]["Insert"];
export type SpeakerUpdate = Database["public"]["Tables"]["speakers"]["Update"];

export type SpeakerSeries = Database["public"]["Tables"]["speaker_series"]["Row"];
export type SpeakerSeriesInsert = Database["public"]["Tables"]["speaker_series"]["Insert"];

export type Sponsor = Database["public"]["Tables"]["sponsors"]["Row"];
export type SponsorInsert = Database["public"]["Tables"]["sponsors"]["Insert"];
export type SponsorUpdate = Database["public"]["Tables"]["sponsors"]["Update"];

export type SponsorSeries = Database["public"]["Tables"]["sponsor_series"]["Row"];
export type SponsorSeriesInsert = Database["public"]["Tables"]["sponsor_series"]["Insert"];

export type Series = Database["public"]["Tables"]["series"]["Row"];

// Extended types with relations
export type SpeakerWithSeries = Speaker & {
  speaker_series: SpeakerSeries[];
};

export type SponsorWithSeries = Sponsor & {
  sponsor_series: SponsorSeries[];
};
