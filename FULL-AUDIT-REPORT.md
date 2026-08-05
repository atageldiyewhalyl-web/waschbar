# SEO Audit Report — waschbar.eu

**Date:** 2026-08-05
**Business type:** Local service — self-service laundromat (Waschsalon), two locations (Heidelberg, Ludwigshafen am Rhein), Germany
**Site:** Next.js 16 app on Vercel
**Overall SEO Health Score: 66 / 100**

---

## Executive Summary

### Top 5 Critical Issues

1. **Fabricated-looking testimonials next to a real rating claim.** Every page's "Bewertungen" section is subtitled "Beispielstimmen aus dem Waschsalon" ("*example* voices") but is styled exactly like real reviews (named personas, neighborhoods, 5-star ratings) and sits directly beside a genuine "5.0 · Basierend auf Google Bewertungen" badge. Independently flagged as Critical by the Content, Schema, and Local SEO agents — this is a trust/E-E-A-T problem and a potential German UWG (unfair competition) exposure. **Not auto-fixed — needs a business decision.**
2. ~~Sitemap "Couldn't fetch" in Google Search Console~~ — **Already fixed** prior to this audit (commit `aafc336`) and reconfirmed live (HTTP 200, valid `application/xml`, no BOM). GSC just needs a resubmit/recrawl.
3. **`noindex` voucher landing page (`/angebote/kundenkarte-guthaben`) had its canonical silently inherited to the homepage** instead of itself, and was listed in the sitemap at high priority despite being `noindex`. **Fixed this session.**
4. **LocalBusiness schema used the non-canonical `waschbar.eu` domain** (308-redirects to `www.waschbar.eu`) and a relative image URL — both invalidate parts of the structured data for entity resolution. **Fixed this session.**
5. **No `AggregateRating`/`Review` schema despite displaying a "5.0" rating claim on every page.** Blocked by issue #1 — don't add rating schema until the review content itself is genuine and attributable.

### Top 5 Quick Wins

1. Resubmit `sitemap.xml` in Google Search Console — the underlying fetch issue is already resolved.
2. Add `BreadcrumbList` schema to all 4 pages (cheap, no content risk).
3. Link the `Organization` and per-location `LocalBusiness` schema nodes together via `@id`/`branchOf` (cheap, strengthens entity graph).
4. Claim/verify listings on 11880.com and Gelbe Seiten — no confirmed presence found for either location on either directory.
5. Add IndexNow support — the site has only 4-7 URLs, this is a near-zero-effort way to get instant Bing/Yandex recrawl on content changes.

---

## Fixes Already Applied This Session

| Fix | File(s) |
|---|---|
| Removed leftover empty `src/app/sitemap.xml/` directory (stale from a prior route-handler approach) | `src/app/sitemap.xml/` |
| Corrected `public/sitemap.xml` to include only indexable, canonical pages (`/`, `/heidelberg`, `/ludwigshafen`, `/rabattkarte`) — removed the `noindex` voucher page that was previously listed, and did not add `/impressum`/`/datenschutz` (also `noindex`), per Google's sitemap guidance | `public/sitemap.xml` |
| Fixed canonical URL on `/angebote/kundenkarte-guthaben` — was silently inheriting the homepage's canonical from the root layout, now self-referencing | `src/app/angebote/kundenkarte-guthaben/page.tsx` |
| Fixed `LocalBusiness` schema to use canonical `www.waschbar.eu` domain instead of the redirecting `waschbar.eu` | `src/app/data/site-data.ts` |
| Fixed `LocalBusiness` schema `image` field to use an absolute URL instead of a relative path | `src/app/data/site-data.ts` |

These are uncommitted local changes — see the end of this report for next steps.

---

## 1. Technical SEO (weight: 22%) — Score: 80/100

**Agent verdict:** Strong technical foundation (fast TTFB ~96ms, proper prerendering, clean redirects, mobile-friendly, no JS-dependent nav) undermined by one critical index/canonical contradiction (fixed this session) and a structured-data domain mismatch (fixed this session).

**Remaining findings:**
- **Medium:** No `Content-Security-Policy` header (HSTS, X-Frame-Options, etc. are all present and correct).
- **Medium:** HSTS header missing `includeSubDomains; preload`.
- **Medium:** Homepage canonical (`https://www.waschbar.eu`, no trailing slash) vs. sitemap entry (`.../`, with trailing slash) — inconsistent though not a hard bug (both resolve 200, no redirect between them).
- **Low:** `lastmod` values in the static sitemap are hardcoded to deploy date and won't auto-update going forward (this is a tradeoff of the static-file fix for the GSC fetch issue — acceptable, but remember to update manually on real content changes).
- **Low:** Two `<h1>` elements on home/location pages (desktop hero + mobile-static-hero-panel duplicate).
- **Low:** Redundant `Googlebot`-specific block in `robots.txt` (identical to the wildcard rule — harmless but unnecessary).
- **Not implemented:** IndexNow protocol (cheap win given the small URL count).

---

## 2. Content Quality & E-E-A-T (weight: 23%) — Score: 58/100

**Agent verdict:** Operationally accurate content (correct prices, hours, capacities) but low on genuine trust/experience signals, and undermined by one critical issue.

**Findings:**
- **Critical:** Testimonials labeled "Beispielstimmen" (example voices) styled as real reviews next to a genuine "Basierend auf Google Bewertungen" claim — see Executive Summary #1.
- **High:** `/heidelberg` and `/ludwigshafen` are ~90% templated — only the intro paragraph, "Anfahrt" line, and city-name substitutions differ; everything else (pricing, features, FAQ structure) is identical.
- **High:** No About/Team page — the founder (Mahmut Cevik) is named only in the legally-mandated Impressum, nowhere in actual site content.
- **High:** Testimonial carousel content is duplicated 8-10x in the raw server-rendered DOM (far more than needed for a scroll-loop illusion), inflating page weight and diluting content signal for crawlers/LLMs.
- **Medium:** `/rabattkarte` and `/angebote/kundenkarte-guthaben` titles/descriptions reference "Heidelberg" only, even though the offer serves both locations — under-targets Ludwigshafen searchers.
- **Medium:** `/rabattkarte` has no FAQ (contract length, cancellation, rollover of unused washes) despite selling a recurring subscription.
- **Low:** No visible pricing freshness date ("Preise Stand...").

---

## 3. Schema & Structured Data (weight: 10%) — Score: ~65/100 (post-fix)

**Agent verdict:** Correct schema types used (`SelfServiceLaundry`/`LocalBusiness`, JSON-LD only, no microdata) but incomplete entity graph and two critical bugs — both fixed this session.

**Fixed this session:** non-www `@id`/`url` domain mismatch, relative `image` URL.

**Remaining findings:**
- **High:** `Organization` (homepage) and the two `LocalBusiness` entities (location pages) don't reference each other by `@id` — no `branchOf`/`department` linkage.
- **High:** No `BreadcrumbList` anywhere on the site.
- **High:** Zero schema at all on `/rabattkarte` and `/angebote/kundenkarte-guthaben`, despite both being priced-offer pages (29,99 €/month clearly stated) — recommend `Product`/`Offer` schema once content is finalized.
- **Medium:** Organization `logo` is a wide 951×304 wordmark, not square — risk of awkward cropping in Knowledge Panel contexts.
- **Info:** `FAQPage` schema present but Google restricts FAQ rich results to gov/health sites since Aug 2023 — no rich-result value for this business, though still useful for AI/LLM citation (GEO).
- **Critical caution (not a fix — a warning):** Do **not** add `Review`/`AggregateRating` schema from the current "Beispielstimmen" content — it isn't genuine, attributable review data, and marking it up as such risks a manual spam action.
- **Low:** `closes: "24:00"` in `openingHoursSpecification` — some strict parsers prefer `23:59`.
- **Low:** Ludwigshafen Google Maps `sameAs` URL carries tracking query params.

---

## 4. GEO / AI Search Readiness (weight: 10%) — Score: 59/100

**Agent verdict:** Unusually strong technical foundation for a small local business — full SSR (no JS required for AI crawlers to see content), well-formed `llms.txt`, and unrestricted robots.txt for all major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot all allowed via wildcard). The gap is entirely in **answer depth** and **off-site authority**.

**Findings:**
- **High:** FAQ answers average ~20 words vs. the ~134-167 word sweet spot for LLM citation — correct but too thin to be the *preferred* citation over a fuller competitor passage.
- **High:** No off-site brand corroboration — zero `sameAs` links to YouTube, Reddit, Instagram, Facebook, or LinkedIn (only Google Maps). YouTube presence in particular correlates strongly (~0.74) with AI citation likelihood.
- **Medium:** No `AggregateRating`/`Review` schema (same root cause as above).
- **Medium:** No video or downloadable multi-modal content anywhere on the site.
- **Low:** Duplicate `<h1>` on location pages dilutes topical clarity for entity extraction.
- **Low:** No named AI crawler entries in `robots.txt` (relies entirely on the wildcard rule — works today but undocumented).
- **Info:** No RSL 1.0 licensing file (`/.well-known/rsl.xml`) if formal AI-usage terms are desired.

**Platform estimates:** Google AI Overviews 65/100, Bing Copilot 60/100, ChatGPT/OAI-SearchBot 55/100, Perplexity 50/100.

---

## 5. Local SEO (weight: 10%) — Score: 59/100

**Agent verdict:** Solid NAP consistency and correct `SelfServiceLaundry` schema typing, but review trust issues (same root cause as Content #1) and unverified directory presence pull the score down.

**Findings:**
- **Critical:** Same fabricated-testimonial issue (Executive Summary #1) — flagged independently a third time.
- **Critical:** No `AggregateRating`/`reviewCount` in schema despite the on-page "5.0" claim.
- **Critical (unverifiable from site alone):** Cannot confirm each Google Business Profile's Primary Category is set to "Self-service laundry" — the single biggest local-pack ranking factor, must be checked directly in the GBP dashboard.
- **High:** Legal entity name in Impressum ("Waschbar Unternehmensgruppe GmbH", Mannheim) differs from the GBP-listing names referenced in schema ("Waschbar Heidelberg GmbH" / "Waschbar Ludwigshafen GmbH") — worth confirming this is an intentional holding-company structure and that GBP verification isn't at risk.
- **High:** No confirmed review-generation cadence assessable (18-day review-recency rule) — recommend a post-visit QR/SMS review-request flow per location.
- **Medium:** Shallow internal cross-linking between the two location pages (nav dropdown only, no contextual in-body links).
- **Low:** Shared mobile phone number across both locations could risk directories treating the two GBP listings as duplicates.

---

## 6. Search Experience (SXO) (weight: 5%) — Score: 73/100

**Agent verdict:** Page-type alignment is good — `/heidelberg` and `/ludwigshafen` are correctly built as Local Pages matching what Google/SERPs reward for "Waschsalon [Stadt]" queries. This is a refinement job, not a rebuild. Real gaps are in conversion-hook sequencing and the same trust-signal issue as above.

**Findings:**
- **High:** Primary above-the-fold CTA ("Route planen") sends undecided visitors off-site to Google Maps *before* they've seen pricing or reviews — fine for bottom-funnel visitors, costly for comparison-shoppers arriving from "Top 10 Waschsalon" list-style SERP results.
- **High:** Same review-authenticity issue undermines the Skeptical Trust-Verifier persona specifically (scored 48/100 vs. 71-74/100 for other personas).
- **Medium:** Subscription/voucher CTA (the actual monetization driver) doesn't appear in the hero — introduced mid-page.
- **Medium:** "Wäscherei in der Nähe" is a keyword/business-model mismatch — that query's SERP is dominated by pickup/delivery services and directories, not self-service laundromats. Recommend deprioritizing it as an on-page target rather than trying to win it head-on, or adding a one-line self-service clarifier to intercept and convert confused traffic.
- **Low:** No explicit machine-capacity numbers (competitors state "21 washing machines"; Waschbar doesn't).

---

## 7. Sitemap (weight: 10%) — Score: ~85/100 (post-fix)

**Agent verdict:** The static-file fix for the GSC "Couldn't fetch" error is solid — valid XML, no BOM, correct `application/xml` content-type, served via Vercel's static/CDN layer. **Agent's explicit conclusion: the GSC error should resolve on re-fetch/resubmit; nothing left in sitemap delivery itself should cause a failure.**

**Findings (both addressed this session):**
- ~~High: `/impressum` and `/datenschutz` missing from sitemap~~ — investigated further; both are `noindex` pages, so per Google's own sitemap guidance they should **not** be in the sitemap. No change needed beyond what's there.
- ~~High (from Technical agent): `noindex` voucher page listed in sitemap~~ — removed.
- **Low:** `lastmod` values are hardcoded deploy-date placeholders rather than real per-page content-modification dates (acceptable tradeoff, see Technical section).
- **Info:** `priority`/`changefreq` tags present but ignored by Google — harmless, could be removed to simplify the file.

---

## 8. Backlinks (weight: 10%) — Score: Insufficient data (treated as 50/100 neutral for weighting)

**Agent verdict:** No paid backlink-index tooling (Moz/DataForSEO) was available in this environment, and Common Crawl returned **zero captures** for `waschbar.eu` — either the domain has genuinely minimal external link equity, or Common Crawl's coverage gap for small regional sites is responsible. This needs a real backlink-index tool (Moz free trial or DataForSEO) to confirm.

**Findings:**
- **High:** No confirmed listing found on 11880.com or Gelbe Seiten for either location — searched directly on both directories' own site search, found only unrelated same-named businesses.
- **Medium:** A direct name-collision competitor, **"Waschbar 60 Grad,"** appears in Gelbe Seiten's Ludwigshafen results — worth monitoring for brand confusion in local search.
- **Medium:** No Yelp.de presence for either location (lower priority in DACH local search, but relevant given Heidelberg's large student/expat population).
- **Recommendation:** Local link-building targets specific to this business — Heidelberg/Ludwigshafen neighborhood association pages, Studierendenwerk (student housing) resource lists, and partnerships with nearby hostels/dorms as a recommended amenity.

---

## SEO Health Score Calculation

| Category | Weight | Score |
|---|---|---|
| Technical SEO | 22% | 80 |
| Content Quality / E-E-A-T | 23% | 58 |
| Schema & Structured Data | 10% | 65 |
| GEO / AI Search Readiness | 10% | 59 |
| Local SEO | 10% | 59 |
| SXO | 5% | 73 |
| Sitemap | 10% | 85 |
| Backlinks | 10% | 50 (insufficient data) |
| **Weighted Total** | | **66 / 100** |
