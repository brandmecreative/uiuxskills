# Vueme redesign v2

A clickable, static prototype of a vueme.in redesign. Open `index.html` in a browser; no build step is needed.

`standalone/` holds single-file copies of each page with the CSS and JavaScript inlined, for previews that open one HTML file without its `assets/` folder. Rebuild them after any edit with `node tools/build-standalone.mjs`.

| Page | What it does |
| --- | --- |
| `index.html` | Landing page. The hero shows an auto-typing preview: sample names appear on a digital card and a printed card (no input, because on vueme.in the editor is 2-3 pages away and a typed name could not be carried there). Also has a template switcher, editor showcase, analytics preview, printed finishes, NFC card, how it works and the real FAQ. |
| `editor-digital.html` | Digital card editor: 4 templates, photo upload, contact and social fields, accent colour, Analytics/NFC add-ons, live phone preview, link copy, QR download (SVG), order total, auto-saved draft. Accepts `?name=` and `?template=`. |
| `editor-print.html` | Visiting card editor: 3 designs, front and back with flip, logo upload, QR to the digital card on the back, print guides (bleed and safe area), finish, sides and quantity, rounded corners, real prices with savings, auto-saved draft. |
| `dashboard.html` | Analytics dashboard (sample data): views figure, QR, NFC, link, call and saved KPIs, views-per-day chart with hover and keyboard tooltip plus a table view, how people opened the card, saved-contact rate, taps, top cities, recent activity, renewal. 7, 30 and 90-day ranges. |

Shared code: `assets/vueme.css` (tokens and components), `assets/cards.css` and `assets/vueme.js` (card, phone and QR renderers). GSAP 3.15.1 and qrcode-generator 1.4.4 are vendored in `assets/vendor/`.

## Facts used
Prices, add-ons (Analytics +₹199, NFC +₹399), renewal (₹299/year), specs (90 × 53 mm, 300 GSM, 500/1000), option rules (synthetic front & back is 1000 only; rounded corners +₹100 on matte and gloss only), shipping and FAQ answers all come from vueme.in product and FAQ pages, read on 6 Nov 2026. Photos load from vueme.in. Dashboard numbers and the sample person "Ananya Rao" are made up.

## Design decisions
Refero's live research server was not connected, so the research used the refero-design method with design-md's style library as the style references.

| Decision | Source | Why |
| --- | --- | --- |
| Monochrome white/ink frame broken by full-width colour blocks, one per screen | design-md `figma` (primary) | An editor product sold as a canvas. Colour blocks carry the story without shadows. |
| Blocks in Vueme purple, lilac and yellow, never two adjacent | Figma rule + Vueme brand | Keeps the brand while each block reads as deliberate |
| Yellow for promo bar, tags and NFC block only; not for buttons | design-md `miro` (borrowed) | Miro reserves its canary yellow for brand moments. Yellow buttons also fail contrast with white text. |
| Real product UI as the illustrations (live cards, mini editors, dashboard preview) | Miro "show the live product" | The product is the proof |
| Pill buttons only; purple = buy/primary, ink = navigate, white = secondary | Figma pill rule + Vueme brand colour | One shape, roles by colour |
| Plus Jakarta Sans + JetBrains Mono uppercase labels | Vueme brand + Figma mono-as-taxonomy | Mono only for eyebrows and labels, never body text |
| Hero name input that updates both cards | refero "one memorable detail" | Shows "digital + printed, one link" in one move |
| Dashboard: one hue, single axis, direct labels, tooltip + table, lilac only as meter track | dataviz skill (validator: lilac fails as a data colour) | Accessible and calm |
| Motion: GSAP expo.out reveals, off for reduced motion | ui-ux-pro-max `gsap` presets | Short, purposeful, respects user setting |

## Diwali offer and mobile
- The offer lives in one place: `OFFER` at the top of `assets/vueme.js` (`active`, `name`, `pct`, `ends`). It discounts the digital card price on the landing page and in the digital editor; add-ons and renewal stay full price. Set `ends` to show a countdown, or `active: false` to switch it off everywhere.
- Mobile: a "What do you need?" chooser in the hero, a plain "New to digital cards?" explainer, swipeable templates and gallery, and a sticky bottom bar (offer price, Start, WhatsApp) that appears after the hero.
- The "How a digital card works" flow uses a sticky animated stage on desktop. On phones it becomes four tabs (Create, Share, Save, Track) over one compact stage that plays through on its own and stops when a tab is tapped. All motion stops for reduced-motion users.
- Phone-first layer (80% of visits): templates are a swipe row of real previews with their own Choose buttons; printed finishes swipe; editor cards, facts, analytics and footer are compacted. The landing page went from about 20 phone screens to 12.
- Diwali artwork (lights, rangoli, diyas) is drawn in SVG; other images are Vueme's own creatives from vueme.in.

## Selection first
Neither editor opens on its own, matching how vueme.in works:
- Digital: choose a template first. Opening `editor-digital.html` without `?template=` shows that step.
- Print: choose material, printing and quantity first (the picker on the home page, `#print-pick`). Opening `editor-print.html` without `?finish=&sides=&qty=` shows that step. `&upload=1` opens it ready for an upload.
- The home page shows both editors as auto-playing previews labelled "Preview"; every home-page button leads to a selection step, never straight into an editor.

## Copy pass
The page copy was audited with the avoid-ai-writing skill (warm, plain voice). It removed em dashes from our own copy (Vueme's tagline is kept as written), a two-item negation chain ("No software, no designer"), unsupported claims ("Live in about five minutes", "Same QR, forever", "Visitors stay anonymous", "soft to the touch"), and a rewording that had dropped Vueme's "if approved" condition on reprints. It also corrected synthetic cards to Vueme's spec: 180 micron synthetic sheet, not 300 GSM.

## Content-skills pass
Headings and body copy were run through viral-hooks (openers), dumbify (reading level for phone readers) and anti-ai-writing (final filter). Changes: hero headline "One card for the handshake. One link for everything after." became "Your business card, saved in their phone in one tap." (clear topic, "your", a real mechanism; an earlier draft that called paper cards easy to lose was dropped because Vueme sells printed cards too). The analytics heading became "See who viewed your card and saved your number." Printed-card and NFC lines were simplified. storytelling was not used: it is for spoken reel and video scripts. Voice was not checked against Vueme's own posts (no sample available).

## Checks run
- Rendered at 1440 and 390 px with no horizontal scroll and no console errors.
- Functional script: price rules, flip, QR, live preview, email validation, date ranges, tooltip, table view.
- taste-skill consistency checker: fixed contrast on the purple block, mobile hero overlaps and dead links. Remaining flags are taste-skill house-style rules (tilted cards, marquee, scroll reveals) or intentional sample content.
