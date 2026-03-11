# Technical SEO — Events First Group Website

## Overview

This document outlines the technical SEO implementation for eventsfirstgroup.com.

---

## ✅ Completed

### 1. Crawling & Indexing

| Item | Status | Location |
|------|--------|----------|
| robots.txt | ✅ | `/public/robots.txt` |
| XML Sitemap | ✅ | `/app/sitemap.ts` → `/sitemap.xml` |
| Canonical URLs | ✅ | Event pages have `alternates.canonical` |

**robots.txt blocks:**
- `/api/` — API endpoints
- `/login`, `/signup`, `/portal`, `/profile` — Auth pages
- `/_next/` — Next.js internals

**Sitemap includes:**
- All static pages (home, about, contact, etc.)
- All event series and individual events
- Dynamic: insights, speakers, sponsors (from Supabase)

---

### 2. Metadata Architecture

| Page Type | Title | Description | Keywords | OG | Twitter | JSON-LD |
|-----------|-------|-------------|----------|----|---------|---------| 
| Root Layout | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Events Hub | ✅ | ✅ | ✅ | ✅ | ✅ | Organization |
| Series Pages | ✅ | ✅ | ✅ | ✅ | ✅ | EventSeries |
| Event Pages | ✅ | ✅ | ✅ | ✅ | ✅ | Event |
| Other Pages | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |

---

### 3. Structured Data (JSON-LD)

**Implemented schemas:**

```
/events                    → Organization (with event array)
/events/cyber-first        → EventSeries
/events/data-ai-first      → EventSeries
/events/opex-first         → EventSeries
/events/ot-security-first  → EventSeries
/events/cyber-first/kuwait-2026    → Event
/events/cyber-first/india-2026     → Event
/events/cyber-first/kenya-2026     → Event
/events/data-ai-first/kuwait-2026  → Event
```

**Event schema includes:**
- name, description, startDate, endDate
- location (Place with PostalAddress)
- organizer (Organization)
- offers (registration availability)
- eventStatus, eventAttendanceMode

---

### 4. Performance & Core Web Vitals

| Feature | Implementation |
|---------|---------------|
| Image Optimization | Next.js `<Image>` with lazy loading |
| Font Loading | `display: swap` prevents FOIT |
| Static Generation | 35 pages pre-rendered at build |
| Code Splitting | Automatic per-route chunking |

---

## ⚠️ Missing / Needs Attention

### High Priority

1. **Favicon & App Icons**
   - No `favicon.ico` in `/public`
   - No `apple-touch-icon.png`
   - No `icon.tsx` or `apple-icon.tsx` in `/app`
   
   **Fix:** Add icons to `/app` directory:
   ```
   app/
     icon.tsx          → Dynamic favicon
     apple-icon.tsx    → Apple touch icon
   ```
   Or static files in `/public`:
   ```
   public/
     favicon.ico
     apple-touch-icon.png
     icon-192.png
     icon-512.png
   ```

2. **Homepage OG/Twitter metadata**
   - Root layout only has basic title/description
   - Missing OG image, full social cards
   
   **Fix:** Create `/app/(home)/layout.tsx` or add to root

3. **About/Contact/Other pages**
   - Missing dedicated metadata
   - No OG images
   
   **Fix:** Add layout.tsx files with metadata

---

### Medium Priority

4. **Canonical URLs**
   - Only event pages have `alternates.canonical`
   - Homepage, about, contact, insights, speakers, sponsors missing

5. **Breadcrumb Schema**
   - No BreadcrumbList JSON-LD
   - Helps Google understand site hierarchy

6. **Article Schema for Insights**
   - Blog posts should have Article/BlogPosting schema
   - Include author, datePublished, dateModified

---

### Low Priority

7. **Web App Manifest**
   - No `/public/manifest.json`
   - Useful for PWA features and app installation

8. **Hreflang Tags**
   - Not needed unless multi-language planned

---

## Recommendations

### Immediate Actions

1. **Add favicon** — Creates brand recognition in browser tabs
2. **Homepage OG image** — Most shared page, needs rich preview
3. **Verify in Google Search Console** — Submit sitemap

### Next Sprint

4. Add metadata to remaining pages (about, contact, insights hub)
5. Implement Article schema for blog posts
6. Add breadcrumb schema site-wide

### Performance Audit

Run Lighthouse after deployment:
```bash
npx lighthouse https://eventsfirstgroup.com --view
```

---

## File Locations

```
app/
├── sitemap.ts              # Dynamic sitemap generator
├── layout.tsx              # Root metadata
├── events/
│   ├── layout.tsx          # Events hub metadata + Organization schema
│   ├── cyber-first/
│   │   ├── layout.tsx      # Series metadata + EventSeries schema
│   │   ├── kuwait-2026/layout.tsx   # Event metadata + Event schema
│   │   ├── india-2026/layout.tsx    # Event metadata + Event schema
│   │   └── kenya-2026/layout.tsx    # Event metadata + Event schema
│   ├── data-ai-first/
│   │   ├── layout.tsx      # Series metadata + EventSeries schema
│   │   └── kuwait-2026/layout.tsx   # Event metadata + Event schema
│   ├── opex-first/layout.tsx        # Series metadata + EventSeries schema
│   └── ot-security-first/layout.tsx # Series metadata + EventSeries schema

public/
├── robots.txt              # Crawler directives
└── (missing: favicon.ico, icons)
```

---

## Testing Checklist

- [ ] Google Rich Results Test: https://search.google.com/test/rich-results
- [ ] Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- [ ] Twitter Card Validator: https://cards-dev.twitter.com/validator
- [ ] LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
- [ ] Lighthouse SEO audit score > 90

---

*Last updated: 2026-03-11*
