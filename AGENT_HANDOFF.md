# Waschbar Website Agent Handoff

This document is for the next agent continuing the Waschbar homepage work.

## Project And Access

- Project root: `/Users/halyl.atageldiyev/Documents/Waschbar`
- Obsidian vault context used: `/Users/halyl.atageldiyev/Local Vaults/Halyl OS/null brain`
- Relevant client folder in vault: `04 Clients/Waschbar`
- Main vault file read earlier: `02-Website.md`
- Tech stack: Next.js App Router, TypeScript, Tailwind/CSS in `src/app/globals.css`
- Important repo instruction: `AGENTS.md` says this Next.js version may differ from expected conventions, so read relevant docs in `node_modules/next/dist/docs/` before major code changes.

## SEO / Strategy Context From Vault

The homepage should support local SEO and AI crawler/GEO visibility. The vault direction was:

- Homepage sequence: Hero -> trust / service proof -> locations -> offers / benefits -> reviews -> FAQ -> footer NAP.
- Keep pages statically renderable where possible. The homepage currently uses:
  - `export const dynamic = "force-static";`
  - `export const revalidate = 86400;`
- AI/search crawlers should see real HTML text, not image-only text.
- `/robots.txt` and `/llms.txt` are part of the GEO/AI-crawler plan.
- Waschbar is self-service only. Do not imply wash-and-fold, pickup, delivery, or staff washing clothes.
- Locations:
  - Heidelberg: Rohrbacher Str. 83-85, 69115 Heidelberg
  - Ludwigshafen: exact street not confirmed in local notes; user provided official Google Business Profile URL.

## Current Main Files

- Homepage: `src/app/page.tsx`
- Global styles: `src/app/globals.css`
- Live opening badge: `src/app/components/OpeningStatus.tsx`
- Lottie wrapper: `src/app/components/LottieIcon.tsx`
- Layout/meta: `src/app/layout.tsx`
- Robots: `src/app/robots.ts`
- AI crawler page: `public/llms.txt`

## Major Work Completed

### Homepage Structure

The homepage has been built as a static Next.js page with sections for:

- Header / nav
- Full-screen hero
- Location cards
- Pet Station / Cleaning Station feature band
- Kundenkarte section
- Prices section with animated icons
- Use-case scene with point-out callouts
- Offers / extras section
- SEO support copy
- Google review cards
- FAQ
- Google Maps embeds near the bottom
- Footer

### Hero

Hero was changed to a full-screen background-image style, inspired by the user’s Onkel Abwassertechnik example.

Current headline:

```text
Wäsche waschen,
ohne zu warten.
```

Hero image:

- `public/images/waschbar-hero-logo.png`

Hero CSS lives around `.hero`, `.hero-copy`, `.hero-media`, `.hero-base-image` in `src/app/globals.css`.

### Locations

Location cards were redesigned into premium split cards using AI-generated assets based on real Waschbar interior photos.

Generated assets:

- `public/images/waschbar-location-heidelberg-premium.png`
- `public/images/waschbar-location-ludwigshafen-premium.png`

Location data is at the top of `src/app/page.tsx` in `const locations`.

Google Maps URLs:

- Heidelberg GBP:
  `https://www.google.com/maps/place/Waschbar+Heidelberg+GmbH/@49.4007793,8.6885928,769m/data=!3m2!1e3!4b1!4m6!3m5!1s0x4797c1b59771ab9d:0xbdd656ab9faf321e!8m2!3d49.4007793!4d8.6911677!16s%2Fg%2F11zgwxfcvc`

- Ludwigshafen GBP from user:
  `https://www.google.com/maps/place/Waschbar+Ludwigshafen+GmbH/@49.49045,8.4350976,767m/data=!3m2!1e3!4b1!4m6!3m5!1s0x4797cd859c2fece1:0x9942ef2d5e00add5!8m2!3d49.49045!4d8.4376725!16s%2Fg%2F11zh1wgnqd?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D`

Note: Ludwigshafen map embed was recently changed from a loose search query to a more exact `/maps/place/...output=embed` URL. The user complained the old embed showed the wrong regional cluster. If it still behaves incorrectly, try a stricter embed query using the exact place id or coordinates.

### Google Maps / Reviews

The Google Maps embeds are at the bottom of the page near the footer. User wanted them placed there, not higher on the page.

Review cards have Google styling and click through to a user-provided Google review/contribution URL:

`https://www.google.com/maps/contrib/110022120870400563338/place/ChIJnatxl7XBl0cRHjKvn6tW1r0/@5.7561232,76.7684624,19252984m/data=!3m1!1e3!4m6!1m5!8m4!1e1!2s110022120870400563338!3m1!1e1?hl=en&entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D`

We did not implement a Google Reviews API integration. The current approach is static review cards with Google badge + outbound links. This avoids needing API keys and still provides a user path to Google.

### Opening Status

The location cards used to hardcode `Geöffnet`. I added:

- `src/app/components/OpeningStatus.tsx`

It checks `Europe/Berlin` time in the browser:

- `06:00` through `21:59` -> `Geöffnet`
- `22:00` through `05:59` -> `Geschlossen`

The visible hours text `06:00 - 22:00 Uhr` remains static HTML for SEO/SSG.

### Kundenkarte

The user wanted a design like their reference mockup: left side card/benefits, right side “In 3 Schritten sparen.”

Current implementation:

- Section id: `kundenkarte`
- Uses `public/images/waschbar-kundenkarte-real-product.png`
- Real card source user supplied:
  `/Users/halyl.atageldiyev/Downloads/WhatsApp Image 2026-07-16 at 23.14.31.jpeg`

AI-generated product shot was created from the real card and saved as:

- `public/images/waschbar-kundenkarte-real-product.png`

Related older assets:

- `public/images/waschbar-kundenkarte.jpeg`
- `public/images/waschbar-kundenkarte-generated.png`
- `public/images/waschbar-kundenkarte-scene.png`

Important: The user strongly wants the card visual to show the real Kundenkarte, not a generic fake card.

### Pricing

Prices were updated from a user screenshot of the terminal:

- Waschmaschine 15 kg: `ab 9,00 €`
- Waschmaschine 7 kg: `ab 4,50 €`
- Trockner: `2,00 € / 10 Min.`
- Kundenkarte: `10% Rabatt`

Animated Lottie icons are used via `LottieIcon`.

Animation assets:

- `public/animations/washing-machine.json`
- `public/animations/laundry.json`
- `public/animations/laundry-2.json`
- `public/animations/credit-card.json`
- `public/animations/money-laundry.json`

### Use-Case Section

User liked the “immersive laundromat scene with point-outs.”

Asset:

- `public/images/waschbar-use-cases-scene.png`

Section copy:

- Bettdecken & große Textilien
- WG- und Studentenwäsche
- Sport- und Arbeitskleidung
- Haustiertextilien

The current design has cards pinned over the image with numbered point-outs. The user specifically wanted numbers kept and icons removed.

### Offers / Extras Section

This replaced the old “So einfach geht’s” strip.

Current title:

```text
Angebote und Extras bei Waschbar
```

It has three split cards:

- Kundenkarte
- Pet Station
- Große Trommeln

Assets:

- Kundenkarte image: `public/images/waschbar-kundenkarte-real-product.png`
- Pet image: `public/images/waschbar-pet-station-offer.png`
- Machine image: `public/images/waschbar-location-ludwigshafen-premium.png`

Animated icons were added from user downloads:

- `public/animations/credit-card-2.json`
- `public/animations/pet-love.json`
- `public/animations/offer-laundry.json`

Important current issue: The user complained the animated icons in this section are not visible enough because they sit on blue circles. A fix was started but interrupted. See “Known Loose Ends.”

### Logo

The user attached the real Waschbar logo and asked for a transparent background version to use in the navbar and other logo places.

Source:

- `/var/folders/fj/4w2hdqpx5wz7lyq35fh40mb80000gn/T/codex-clipboard-15ac120f-ccdb-4065-87c3-18a55cf38069.png`

Generated/processed transparent logo:

- `public/images/waschbar-logo-transparent.png`

The `Logo` component in `src/app/page.tsx` was changed to use this image.

Important current issue: Cleanup was interrupted. There are still old CSS selectors for `.logo-word` and `.logo-sub` in responsive blocks. See “Known Loose Ends.”

## AI Image Generation Process Used

AI image generation was used repeatedly for visual mockups and project assets. General workflow:

1. Read user-provided reference photos.
2. Use `image_gen` for mockups or assets.
3. Generated files land in:
   `/Users/halyl.atageldiyev/.codex/generated_images/...`
4. For project-bound assets, copy the selected output into `public/images`.
5. Reference the copied image from `src/app/page.tsx`.

Examples of generated assets:

- `waschbar-location-heidelberg-premium.png`
- `waschbar-location-ludwigshafen-premium.png`
- `waschbar-use-cases-scene.png`
- `waschbar-kundenkarte-real-product.png`
- `waschbar-pet-station-offer.png`

For the transparent logo, we did not use AI generation. We processed the attached PNG locally with `sharp`, removing near-white background pixels and trimming the image.

## Known Loose Ends / Next Work

### 1. Offers Section Icon Visibility

User’s latest complaint:

> The icons are not visible can you adjust the colors of the circles so the icons are properly visible

Current CSS:

```css
.offer-content .lottie-icon {
  width: 54px;
  height: 54px;
  margin-bottom: 22px;
  border-radius: 999px;
  background: var(--blue);
  padding: 8px;
}
```

Problem: Lottie icon strokes are dark/navy, so they disappear on the blue circle.

Suggested fix:

```css
.offer-content .lottie-icon {
  background: #fff;
  border: 1px solid #cfe0fa;
  box-shadow: 0 12px 24px rgba(47, 118, 255, 0.12);
}
```

If the Lottie itself is too dark/light, inspect whether the JSON uses hardcoded stroke colors. If needed, use CSS filter only as a last resort, or edit/replace the animation JSON.

### 2. Logo CSS Cleanup

`Logo` now uses an image, but these old selectors still exist in responsive CSS:

- `.logo-word`
- `.logo-sub`
- `.logo-sub::before`
- `.logo-sub::after`

They should be removed or replaced with `.logo-image` size rules:

```css
@media (max-width: 900px) {
  .logo-image {
    width: 190px;
  }
}

@media (max-width: 640px) {
  .logo-image {
    width: 178px;
  }
}
```

### 3. Verify Header/Footer Logo Visually

The transparent logo asset exists and the component uses it, but the user interrupted before final lint/build and visual check. Check:

- Navbar logo height
- Footer logo plate on dark background
- Mobile header layout

### 4. Kundenkarte Section Design

The user was unhappy with an earlier version’s ratios/icons. The current Kundenkarte section uses the reference split layout, but if they complain again, make it closer to the exact reference:

- Left panel image larger
- Right step icons as simple navy line icons in light square boxes
- No oversized icon circles
- More spacing between numbered steps

### 5. Google Maps Ludwigshafen Embed

If the embed still does not show the exact location, try using a stricter embed source. Current intent is exact official GBP:

- Coordinates: `49.49045, 8.4376725`
- Place id fragment: `0x4797cd859c2fece1:0x9942ef2d5e00add5`
- GBP slug: `/g/11zh1wgnqd`

## Commands Used For Verification

After most changes:

```bash
npm run lint
npm run build
```

Both were passing before the latest interrupted logo/icon cleanup. Run them again after continuing.

## Design Preferences From User

- Wants high-polish but direct local business design.
- Likes realistic photos and AI-generated assets grounded in real Waschbar photos.
- Dislikes generic gradients, badly cropped images, oversized boxes, and sections that feel “thin.”
- Likes premium split cards.
- Likes point-out/callout visuals when aligned cleanly.
- Wants Google Maps embeds near the bottom, above footer.
- Wants real logo and real customer-card visuals, not fake generic brand marks.
- Reacts strongly when a section looks misaligned; visually verify before final response.

## Current Best Continuation Plan

1. Fix offers-section Lottie icon visibility.
2. Remove old logo CSS selectors and add `.logo-image` responsive sizing.
3. Run `npm run lint`.
4. Run `npm run build`.
5. Visually inspect homepage around:
   - Header logo
   - Offers/extras section icons
   - Footer logo
   - Mobile-ish width if possible
6. Continue only with scoped edits; avoid unrelated refactors.

