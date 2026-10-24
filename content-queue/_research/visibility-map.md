# Waschbar — Visibility Map

_Last updated: 2026-10-24_

## 1. What Waschbar offers

- Self-service laundromat (SB-Waschsalon), 2 locations: Heidelberg (Rohrbacher
  Str. 83-85) and Ludwigshafen am Rhein (Prinzregentenstraße 60).
- Machines: 7kg (4,50 €/Waschgang), 15kg XXL (9,00 €/Waschgang), Trockner
  (2,00 €/10 Min).
- SB-Wasch-Abo / Mitgliedskarte: 29,99 €/Monat, 10 Waschgänge + 10
  Trocknergänge (20 Min each), valid at both locations, >60% saving vs.
  single-use prices.
- Pet Station (Heidelberg + Ludwigshafen) — pet bedding/blankets.
  Cleaning Station — mops, cleaning cloths.
- Daily 06:00–24:00, no appointment/reservation needed.
- Site pages (indexable, 4 total): `/`, `/heidelberg`, `/ludwigshafen`,
  `/rabattkarte` (+ `/angebote/kundenkarte-guthaben`, canonical fixed per
  ACTION-PLAN.md). No blog exists yet.

## 2. Where they currently show up

No GSC/DataForSEO connection available for this run — organic-only signal
from live SERP inspection (WebSearch), no volume numbers or local-pack
confirmation. `local pack: unknown (needs DataForSEO/seo-maps)`.

- "Waschsalon Heidelberg" — SERP dominated by directory aggregators
  (waschsalons-deutschland.de, waschmal.de, 11880-style listings) and named
  competitors: **Waschfreunde Heidelberg** (Bergheimerstr. 131, 21 Maschinen),
  **Lavender Waschsalon** (Rohrbacher Str. 10 — same street as Waschbar
  Heidelberg), **Etzold's Waschsalon** (full-service, not self-service — weak
  competitor for SB intent), **"Voller Waschsack"**. waschbar.eu did not
  surface in the organic result set pulled — visibility gap confirmed on the
  organic side; local pack unverified.
- "Waschsalon Ludwigshafen" — dominated by **Eco Express Waschsalon**
  (Leuschnerstrasse 5), which appears to be the strongest named incumbent
  (multiple directory listings, real pricing published: 4,50–5,00 €/Waschgang,
  12,00 € XXL, 3,00 €/15 Min Trockner). waschbar.eu not visible in the pulled
  result set here either.
- Generic "SB Waschsalon in der Nähe" / cost queries — surfaced multi-city
  chains (Wash&Go Stuttgart/Karlsruhe, Wilma Waschen Leipzig) that rank with
  dedicated pricing/location pages and their own discount-card offers (Wash&Go
  Rabattkarte, up to 25% — directly analogous to Waschbar's SB-Wasch-Abo but
  Waschbar's card is undermarketed outside `/rabattkarte`).

## 3. Who takes the traffic they should have

- **Eco Express Waschsalon (Ludwigshafen)** — the clearest direct competitor;
  published pricing and multiple directory citations. No evidence of a blog
  from a quick check, so informational-content is a winnable gap even in
  their home market.
- **Waschfreunde Heidelberg / Lavender Waschsalon** — closer to Waschbar
  Heidelberg geographically (same street as Lavender). Compete on price
  transparency and machine-size specifics.
- **Archie's Waschsalon** (archies-waschsalon.de) — not local to Rhein-Neckar,
  but ranks nationally for "Bettdecken waschen" with a dedicated Ratgeber
  post. Proves the content model: a laundromat operator publishing practical
  laundry-care guides can rank and win topical authority. Direct model to
  emulate, adapted with Waschbar's own local angle (large-drum machines on
  site solve the exact problem the article describes).
- **Persil (persil.de/waschwiki), Utopia.de, myHOMEBOOK, BAUR** — dominate
  generic informational queries ("bei welcher Temperatur waschen", "Bettdecke
  waschen wie oft"). Not beatable head-on for the broad national keyword, but
  these SERPs are what customers read before/instead of visiting a laundromat
  — Waschbar's angle is the same information PLUS the "if your machine at
  home can't do it, here's where" local CTA. Realistic play: rank on
  long-tail + local modifiers ("Bettdecke waschen Waschsalon Heidelberg"),
  not the head term.

## 4. What customers search before buying

- **Local/commercial**: "waschsalon heidelberg", "waschsalon ludwigshafen",
  "sb waschsalon in der nähe", "waschsalon [stadtteil]", "waschsalon kosten".
- **Commercial investigation**: "waschsalon vs eigene waschmaschine kosten",
  "lohnt sich ein waschsalon", discount-card/subscription comparisons (direct
  competitor precedent: Wash&Go Rabattkarte, Wilma Waschen off-peak pricing).
- **Informational** (proven demand via major publisher SERPs + Archie's
  Waschsalon precedent): Bettdecke/Kissen waschen, Waschtemperatur
  30/40/60 Grad, Fleckenentfernung vor dem Waschgang, WG-Wäsche-Organisation,
  Hundedecke/Tierdecke waschen (ties to Pet Station), Arbeitskleidung waschen
  (ties to Monteur audience already named in `site-data.ts`).
- **Seasonal/freshness**: back-to-school/semester start (WG move-in,
  September/October) for the WG-Wäsche angle; no strong seasonal hook for
  the rest — laundry demand is steady year-round.

## Gaps confirmed

1. Zero blog/informational content — competitors (Archie's) and major
   publishers own this SERP territory entirely; Waschbar has nothing to
   internally link to or cite.
2. Location pages are ~90% templated between cities (per `ACTION-PLAN.md`) —
   blog content is a chance to add genuine local specificity the audit flagged
   as missing.
3. SB-Wasch-Abo (the highest-margin, most differentiated offer) is only on
   `/rabattkarte` — no content funnel drives cost-comparison searchers there.


## Update 2026-10-24
- Ratgeber now has 30 posts (9 from Aug/Sep + 21 on 2026-10-24); all in sitemap.xml and llms.txt.
- Rankings/impressions for the first 9 posts are still unmeasured (no GSC/DataForSEO connected). Rule from the playbook:
  after 10+ posts, check positions before writing much more. Next step = connect Search Console and review queries.
- Clusters now covered: Standort/Preis (Heidelberg, Ludwigshafen, Kosten, erster Besuch, Checkliste, kaputte Maschine),
  Große Teile (Bettdecke, Daunenjacke, Schlafsack, Gardinen, Kuscheldecke, Hundedecke), Textilpflege (Temperatur, Flecken,
  Handtücher, Bettwäsche, Weiß, Wolle, Funktionskleidung, Arbeitskleidung, Baby, Kuscheltiere, Wischmopp), Trocknen
  (Trockner-Regeln, Winter ohne Schimmel), Alltag (Sonntag, WG, Wasserhärte, Sortieren, Trommelgrößen).
- Local facts verified 2026-10-24: Stadtwerke Heidelberg: 4 Trinkwasserzonen, weich ca. 3 °dH bis hart 21 °dH;
  Neuenheim/Handschuhsheim seit 26.06.2026 härteres Wasser (SWH-Seite). TWL: Wasserwerke Parkinsel und Maudach/Oggersheim,
  Härte mittel bis knapp hart (aktuelle Analyse bei TWL).
