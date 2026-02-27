import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = supabaseUrl
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as unknown as ReturnType<typeof createClient>);

export interface Sponsor {
  id: string;
  slug: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  short_description: string | null;
  full_description: string | null;
  tier: string;
  status: string;
}

export interface SponsorEvent {
  id: string;
  sponsor_id: string;
  event_name: string;
  event_year: number;
  tier_at_event: string;
}

export interface SponsorWithEvents extends Sponsor {
  sponsor_events: SponsorEvent[];
}

export interface Speaker {
  id: string;
  slug: string;
  name: string;
  title: string | null;
  organization: string | null;
  bio: string | null;
  image_url: string | null;
  linkedin_url: string | null;
  role_type: string;
  created_at: string;
  updated_at: string;
}

export interface SpeakerEvent {
  id: string;
  speaker_id: string;
  event_name: string;
  event_year: number;
  role_at_event: string;
  created_at: string;
}

export interface SpeakerWithEvents extends Speaker {
  speaker_events: SpeakerEvent[];
}

export interface Author {
  id: string;
  slug: string;
  name: string;
  title: string | null;
  organization: string | null;
  bio: string | null;
  avatar_url: string | null;
  linkedin_url: string | null;
  created_at: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  author_id: string | null;
  category: string;
  content_type: string;
  event_tag: string | null;
  tags: string[];
  reading_time_minutes: number;
  is_featured: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface PostWithAuthor extends Post {
  authors: Author | null;
}
