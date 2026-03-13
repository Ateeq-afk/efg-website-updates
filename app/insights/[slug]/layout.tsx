import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://eventsfirstgroup.com";
const DEFAULT_OG_IMAGE = "https://efg-final.s3.eu-north-1.amazonaws.com/Good/4N8A0290.JPG";

// Create Supabase client for server-side metadata generation
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const supabase = getSupabaseClient();
  
  if (!supabase) {
    return {
      title: "Insight | Events First Group",
      description: "Expert analysis on cybersecurity, data & AI, and operational excellence.",
    };
  }

  try {
    const { data: post } = await supabase
      .from("posts")
      .select("title, excerpt, subtitle, cover_image_url, published_at, authors(name)")
      .eq("slug", params.slug)
      .single();

    if (!post) {
      return {
        title: "Article Not Found | Events First Group",
        description: "The requested article could not be found.",
      };
    }

    const title = `${post.title} | Events First Group`;
    const description = post.excerpt || post.subtitle || "Expert analysis from Events First Group.";
    const ogImage = post.cover_image_url || DEFAULT_OG_IMAGE;
    const authorName = post.authors && typeof post.authors === 'object' && 'name' in post.authors
      ? (post.authors as { name: string }).name
      : null;

    return {
      title,
      description,
      authors: authorName ? [{ name: authorName }] : undefined,
      alternates: {
        canonical: `${BASE_URL}/insights/${params.slug}`,
      },
      openGraph: {
        title: post.title,
        description,
        url: `${BASE_URL}/insights/${params.slug}`,
        siteName: "Events First Group",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        locale: "en_US",
        type: "article",
        publishedTime: post.published_at,
        authors: authorName ? [authorName] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description,
        images: [ogImage],
      },
    };
  } catch (error) {
    console.error("Error generating metadata for insight:", error);
    return {
      title: "Insight | Events First Group",
      description: "Expert analysis on cybersecurity, data & AI, and operational excellence.",
    };
  }
}

export default function InsightDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
