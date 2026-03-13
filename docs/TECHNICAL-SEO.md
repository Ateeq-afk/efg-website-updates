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

### High Priority — ✅ COMPLETED

1. **Favicon & App Icons** ✅
   - `favicon.ico` in `/app`
   - `icon.svg` in `/app`
   - `apple-icon.svg` in `/app`

2. **Homepage OG/Twitter metadata**
   - Root layout only has basic title/description
   - Missing OG image, full social cards
   
   **Fix:** Create `/app/(home)/layout.tsx` or add to root

3. **About/Contact/Other pages** ✅
   - All pages now have dedicated metadata
   - OG images configured

---

### Medium Priority — ✅ COMPLETED

4. **Canonical URLs** ✅
   - All pages now have `alternates.canonical`:
     - `/about`
     - `/contact`
     - `/insights`
     - `/speakers`
     - `/sponsors-and-partners`
     - All event pages

5. **Breadcrumb Schema** ✅
   - BreadcrumbList JSON-LD added to all pages:
     - `/about`
     - `/contact`
     - `/insights` (hub + individual articles)
     - `/speakers` (hub + individual pages)
     - `/sponsors-and-partners` (hub + individual pages)

6. **Article Schema for Insights** ✅
   - ArticleSchema on all `/insights/[slug]` pages
   - Includes: headline, author, datePublished, dateModified, image, publisher

---

### Low Priority

7. **Web App Manifest**
   - No `/public/manifest.json`
   - Useful for PWA features and app installation

8. **Hreflang Tags**
   - Not needed unless multi-language planned

9. **Homepage OG Image**
   - Most shared page should have rich preview

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
- [ ] Google Search Console verification & sitemap submission

---

## Schema Components

All schemas are in `/lib/schemas.tsx`:

| Schema | Usage |
|--------|-------|
| `BreadcrumbSchema` | All pages (via layouts) |
| `ArticleSchema` | Insights articles |
| `PersonSchema` | Speaker detail pages |
| `OrganizationSchema` | Sponsor detail pages |
| `EventSchema` | Event pages |
| `FAQSchema` | Available for FAQ sections |
| `VideoSchema` | Available for video embeds |

---

---

## SEO Checklist — Complete

### ✅ Technical Foundation
- [x] robots.txt blocking sensitive routes
- [x] XML Sitemap (dynamic)
- [x] Canonical URLs on all pages
- [x] Favicon + Apple icons

### ✅ Structured Data (JSON-LD)
- [x] BreadcrumbList on all pages
- [x] Organization schema on /events
- [x] EventSeries schema on series pages
- [x] Event schema on individual events
- [x] Article schema on /insights/[slug]
- [x] Person schema on /speakers/[slug]
- [x] Organization schema on /sponsors/[slug]

### ✅ Metadata Optimization
- [x] Location-specific keywords (Dubai, UAE, Middle East, GCC, Saudi Arabia)
- [x] Target keywords in titles (CISO summit, cybersecurity conference, etc.)
- [x] OG images on all pages
- [x] Twitter cards configured

### 🔲 Pending (External)
- [ ] Google Search Console verification
- [ ] Submit sitemap to GSC
- [ ] Submit to event directories (10times, infosec-conferences)
- [ ] Build backlinks from industry publications

---

*Last updated: 2026-03-12*
