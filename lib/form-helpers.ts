// ═══════════════════════════════════════════════════════════════
// Shared form submission helpers — used by all forms across the site
// ═══════════════════════════════════════════════════════════════

export type FormType =
  | "sponsor"
  | "attend"
  | "speak"
  | "contact"
  | "awards"
  | "networkfirst";

export interface FormPayload {
  type: FormType;
  full_name: string;
  email: string;
  company?: string;
  job_title?: string;
  phone?: string;
  metadata?: Record<string, string>;
  event_name?: string;
  website?: string; // honeypot — always send empty
}

export interface FormResult {
  success: boolean;
  error?: string;
}

/**
 * Derive a human-readable source category from the current URL pathname.
 */
export function getSourceCategory(): string {
  if (typeof window === "undefined") return "Server";
  const p = window.location.pathname;

  if (p === "/") return "Homepage";
  if (p === "/contact") return "Contact Page";
  if (p === "/speakers") return "Speakers Page";
  if (p === "/sponsors-and-partners") return "Sponsors & Partners Page";
  if (p === "/network-first") return "NetworkFirst Page";
  if (p === "/events" && !p.includes("/events/")) return "Events Page";

  // /events/[series]/[slug] → "Event – Cyber First Kuwait 2026"
  const eventMatch = p.match(/^\/events\/([^/]+)\/([^/]+)/);
  if (eventMatch) {
    const series = eventMatch[1]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const slug = eventMatch[2]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return `Event – ${series} ${slug}`;
  }

  // /events/[series] → "Series – Cyber First"
  const seriesMatch = p.match(/^\/events\/([^/]+)$/);
  if (seriesMatch) {
    const series = seriesMatch[1]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return `Series – ${series}`;
  }

  return p;
}

/**
 * Submit a form to the backend API.
 */
export async function submitForm(payload: FormPayload): Promise<FormResult> {
  try {
    const res = await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        website: "", // honeypot — always empty for real submissions
        source_url: typeof window !== "undefined" ? window.location.href : "",
        source_category: getSourceCategory(),
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        success: false,
        error: data.error || "Something went wrong. Please try again.",
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
}
