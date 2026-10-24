# Ratgeber audit — 2026-10-24

Scope: the /ratgeber blog layer (9 live posts at audit start, 30 after this run) plus the pipeline that feeds it.

## What was checked and passed

- All 14 URLs in the live sitemap returned 200; every post has one H1, a self-referencing canonical, valid JSON-LD (BlogPosting + FAQPage, HowTo where steps exist) and a BreadcrumbList.
- llms.txt and robots.txt list/allow the Ratgeber; AI crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) are allowed.
- Internal link graph: no broken links; every post had 2–9 internal links.
- Existing posts: 1,085–1,486 words, 6–9 FAQ questions each.

## Fixed in this run (existing posts)

| Post | Problem | Fix |
|---|---|---|
| bettdecke-kissen-waschen-grosse-waschmaschine | Title tag 62 chars (cut off in Google) | Now 53 chars |
| sb-waschsalon-erster-besuch-ablauf | Claimed the 15 kg drum is "meist auch günstiger" than two washes. 2 × 4,50 € = 9,00 € = one 15 kg wash, so it is equal, not cheaper | Rewritten: same price, but one wash + one dryer run |
| sb-waschsalon-erster-besuch-ablauf | "Waschmittel wird bei Waschbar nicht automatisch gestellt – … plane den Kauf vorher ein". The entrance photo shows a "KASSE / WASCHMITTEL" sign, so this may be wrong | Softened to "bring your usual detergent so you know the dosing" (body + FAQ + schema) |
| sb-waschsalon-erster-besuch-ablauf | Said Pet/Cleaning Station are "kostenlos" to use | Reduced to "no extra registration needed" (body + FAQ + schema) |
| 9 existing posts | No links to newer related content | Related-post grid raised to 6 cards, plus one contextual paragraph per post |

## Needs the owner's decision (not changed)

1. **Detergent:** does the "Kasse / Waschmittel" point sell detergent? If yes, say so in the posts and on the site (the first-visit guide currently still says "bring your own").
2. **Price transparency:** the terminal screenshots shown on the site (`waschbar-program-7kg/15kg-cropped.webp`) list prices that the page text does not mention: 90 °C and "mit Vorwäsche" and Wolle cost more (7 kg: 5,00 €; 15 kg: 10,00 €), Spülen/Schleudern 1,00 € / 2,00 €. New posts avoid quoting these numbers. Decide whether to add them to `site-data.ts` (`priceItems`) so text and screenshots agree.
3. **Testimonials ("Beispielstimmen")** are still unresolved; see ACTION-PLAN.md. No rating schema was added.
4. **Hero images are reused** (only 18 distinct hero images across 30 posts) and the generated PNG heroes are 1.8–2.1 MB each. Unique, compressed images (WebP) would help both CTR and speed.
5. **Author byline** is "Waschbar Team" everywhere. A named author or the owner with a short bio would strengthen E-E-A-T.
6. **Local detail:** location guides would improve with verified specifics (bus lines/stops, parking, nearby landmarks). Nothing was invented; supply the facts and a "Stadtteil" series can be written.

## Not yet measurable

No Search Console / DataForSEO connection, so rankings, impressions and CTR for the Ratgeber are unknown. Per the research playbook, check positions after 10+ posts before scaling further. Also: resubmit sitemap.xml in GSC after deploy (35 URLs).

## Notes on sources used for new posts

- Heidelberg water hardness: Stadtwerke Heidelberg trinkwasser page (4 zones, ~3–21 °dH; change for Neuenheim/Handschuhsheim from 26.06.2026).
- Ludwigshafen: TWL (two waterworks, Parkinsel and Maudach/Oggersheim); the TWL analysis PDF is linked but could not be text-extracted by the tool, so the post states ranges conservatively and points readers to the official analysis.
- Care guidance (Daune, Schlafsack, Gardinen, Funktionskleidung, Handtücher, Wolle): consistent across manufacturer and consumer-advice sources; labelled "Pflegeetikett hat Vorrang" throughout.
- Legal/health-adjacent posts (Sonntag/Ruhezeiten, kaputte Maschine/Mietrecht, Baby) are written as general orientation with explicit "keine Rechtsberatung" / "Arzt fragen" hedges. A native-speaking reviewer should still read those three before relying on them.
