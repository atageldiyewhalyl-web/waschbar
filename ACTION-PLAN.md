# Action Plan — waschbar.eu

Generated: 2026-08-05
Full findings: see [FULL-AUDIT-REPORT.md](./FULL-AUDIT-REPORT.md)

## ✅ Already Fixed (this session, uncommitted)

- Removed leftover empty `src/app/sitemap.xml/` directory.
- `public/sitemap.xml`: removed `noindex` voucher page, kept only the 4 indexable canonical pages.
- `/angebote/kundenkarte-guthaben`: fixed canonical URL (was silently pointing to the homepage).
- `LocalBusiness` schema (`src/app/data/site-data.ts`): fixed non-www domain → `www.waschbar.eu`, fixed relative `image` URL → absolute.

**Next step:** commit and deploy these, then resubmit `sitemap.xml` in Google Search Console.

---

## 🔴 CRITICAL — Fix Immediately (business decision needed)

- **Testimonial authenticity.** Every page's review carousel is subtitled "Beispielstimmen aus dem Waschsalon" (example voices) but styled with named personas, neighborhoods, and 5-star ratings exactly like real reviews — directly beside a genuine "5.0 · Basierend auf Google Bewertungen" claim. Flagged independently by 3 of 8 agents (Content, Schema, Local SEO) as a trust/E-E-A-T and potential German UWG (unfair competition law) risk. **Decide:** (a) replace with real, attributable Google reviews, or (b) clearly relabel as illustrative and remove the adjacent "Basierend auf Google Bewertungen" framing so the two aren't conflated. Do not implement either without your sign-off — this is marketing copy, not a code bug.
- **Verify each Google Business Profile's Primary Category** is set exactly to "Self-service laundry" in the GBP dashboard — the single biggest local-pack ranking factor, and unverifiable from the website. (Heidelberg & Ludwigshafen)

## 🟠 HIGH — Fix Within 1 Week

- Add `AggregateRating`/`Review` schema — **only after** the testimonial issue above is resolved with genuine, sourced review data. (`src/app/data/site-data.ts`, location pages)
- Link `Organization` and per-location `LocalBusiness` schema via `@id`/`branchOf` so Google understands both locations are branches of the same brand.
- Add `BreadcrumbList` schema to all 4 indexable pages.
- Add schema (`Product`/`Offer` at minimum) to `/rabattkarte` and `/angebote/kundenkarte-guthaben` — both are priced-offer pages with zero structured data today.
- Differentiate `/heidelberg` and `/ludwigshafen` beyond swapped city names — currently ~90% templated. Add real local specifics (parking, nearby landmarks, transit).
- Reduce the testimonial carousel's server-rendered DOM duplication from ~9x down to ~2x — bloats page weight and dilutes crawl/AI-extraction signal.
- Add a real About/Team page — founder is currently named only in the legally-required Impressum, nowhere in actual marketing content.
- Move the pricing/rating summary above the fold on location pages (or add a compact strip near the hero) — the current primary CTA sends comparison-shoppers off-site to Google Maps before they see any pricing.
- Claim/verify business listings on 11880.com and Gelbe Seiten for both locations — no confirmed presence found on either directory.
- Confirm the legal entity name ("Waschbar Unternehmensgruppe GmbH") vs. GBP listing names ("Waschbar Heidelberg GmbH"/"Waschbar Ludwigshafen GmbH") is an intentional holding-company structure, not a verification risk.
- Set up a post-visit review-request flow (QR code / SMS) per location to sustain review recency (Google's 18-day-freshness weighting).

## 🟡 MEDIUM — Fix Within 1 Month

- Expand FAQ/body answers on location pages toward ~130-170 words each (self-contained) — currently ~20 words average, too thin to win AI/LLM citation over fuller competitor answers.
- Add `sameAs` links to any real social profiles (YouTube, Instagram, Facebook) — currently only Google Maps; YouTube presence correlates strongly with AI citation.
- Expand `/rabattkarte` with an FAQ (cancellation, contract length, rollover) and `FAQPage` schema — thin relative to its role selling a recurring subscription.
- Fix Heidelberg-only meta titles/descriptions on `/rabattkarte` and `/angebote/kundenkarte-guthaben` — under-targets Ludwigshafen searchers even though the offer serves both.
- Add a `Content-Security-Policy` header.
- Add `includeSubDomains; preload` to the HSTS header.
- Investigate "Waschbar 60 Grad" — a name-collision competitor appearing in Gelbe Seiten's Ludwigshafen results.
- Create a Yelp.de listing for both locations (lower DACH priority, but relevant given Heidelberg's student/expat population).
- Add contextual internal links between `/heidelberg` and `/ludwigshafen` within body copy, not just the nav dropdown.
- Consider distinct phone numbers per location — a shared number risks directories merging the two GBP listings.
- Get a real backlink-index read (Moz free trial or DataForSEO) — Common Crawl showed zero captures for the domain, inconclusive on its own.

## 🟢 LOW — Backlog

- Consolidate to a single `<h1>` per page (home, heidelberg, ludwigshafen currently render two).
- Normalize trailing-slash convention between homepage canonical and sitemap entry.
- Remove the redundant `Googlebot`-specific block in `robots.txt` (duplicates the wildcard rule).
- Add IndexNow protocol support — cheap given the small (4-URL) sitemap.
- Add explicit named AI-crawler entries (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) to `robots.txt` instead of relying solely on the wildcard.
- Add a visible "Preise Stand [Monat/Jahr]" freshness note near pricing.
- Switch `openingHoursSpecification.closes` from `"24:00"` to `"23:59"` for stricter parser compatibility.
- Remove tracking query params from the Ludwigshafen Google Maps `sameAs` URL.
- Square up the Organization `logo` (currently a wide 951×304 wordmark) to avoid cropping in Knowledge Panel contexts.
- Add explicit machine-capacity numbers to location pages (competitors state exact counts, e.g. "21 washing machines").
- Consider a one-line self-service clarifier for "Wäscherei in der Nähe" traffic, since that query's SERP is dominated by pickup/delivery services — not worth chasing head-on otherwise.
