# Vueme home page v3 (phone-first)

Rebuilt after feedback that v2 was long and confusing on phones (80% of visitors). One product is shown at a time, and motion graphics do the explaining.

- `index.html`: the page (uses `assets/`). `standalone/index.html`: same page in one file. `elementor/vueme-home.json`: Elementor template.
- Rebuild after edits: `node tools/build-standalone.mjs` and `python3 tools/build-elementor.py`.

## Structure
1. Hero (simplified): one headline, one line, one calm floating picture (printed card + phone), two big buttons (Digital card · ₹249.50 with 50% off, Printed cards · from ₹625). The Diwali offer lives in the top strip only.
2. A sticky Digital | Printed switch. Only the chosen product's content shows.
3. Digital: tap-through 4-step story (pick template, add details, pay, link and QR), "3 ways to share" animated infographic (Link, QR, NFC), template carousel with Diwali prices, price check (Analytics/NFC toggles, animated total).
4. Printed: material picker with live card (tap to flip, 90 x 53 mm size lines, gloss shine), sides and quantity price table, "design to doorstep" timeline that fills as you scroll.
5. 7 FAQs, short footer with WhatsApp, sticky bottom bar that follows the chosen product.

Phone length: about 5 screens (digital) / 4 (printed), down from 12 in v2. Animations run only on screen and stop for reduced-motion users.

## Links
Template buttons: Bento opens its product page; the others open the digital card category (edit `TPL_LINK` in the page script). Printed buttons open the matching vueme.in product page. Facts and prices come from `.claude/skills/vueme-product`.
