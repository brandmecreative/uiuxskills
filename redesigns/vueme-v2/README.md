# Vueme redesign v2

A clickable, static prototype of a vueme.in redesign. Open `index.html` in a browser; no build step is needed.

| Page | What it does |
| --- | --- |
| `index.html` | Landing page. Type a name in the hero and a digital card and a printed card update live. Also has a template switcher, editor showcase, analytics preview, printed finishes, NFC card, how it works and the real FAQ. |
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

## Checks run
- Rendered at 1440 and 390 px with no horizontal scroll and no console errors.
- Functional script: price rules, flip, QR, live preview, email validation, date ranges, tooltip, table view.
- taste-skill consistency checker: fixed contrast on the purple block, mobile hero overlaps and dead links. Remaining flags are taste-skill house-style rules (tilted cards, marquee, scroll reveals) or intentional sample content.
