---
name: vueme-product
description: Facts about Vueme (vueme.in), an Indian brand selling digital business cards (link + QR + optional NFC) and printed visiting cards. Use whenever writing copy, prices, flows, FAQs or any page, ad, post or UI for Vueme, so every claim, price and rule matches the real product. Load before vueme-homepage or vueme-design-system work.
---

# Vueme product facts

Source of truth for anything that states what Vueme sells, costs or does. Facts were read from vueme.in product and FAQ pages on 6 Nov 2026; the owner confirmed the flow rules. If a fact you need is not here, ask the owner or read vueme.in; never invent it.

## The two products

**1. Digital business card.** A mobile-friendly web page with the customer's photo, contact details and social links. It gets its own link and QR code **instantly after payment**. Anyone opens it on their phone without an app. Unlimited edits from My Account; the link and QR code never change.
- Includes: photo, bio, phone, email, socials, Save Contact button.
- Add-ons (chosen before paying): **Analytics +₹199**: views, QR scans, link taps, call taps and saved contacts, in a private dashboard only the owner sees; switches on automatically after payment. **NFC card +₹399**: physical tap-to-open card, sent by India Post in 3–5 working days, delivery included, no tracking.
- Renewal: **₹299 per year**, starting 1 year after purchase; Vueme emails before it is due. Not renewed means the card goes inactive until renewed.
- Refunds: digital cards and Analytics cannot be refunded once live.

**2. Printed visiting cards.** 90 × 53 mm, full colour. For people without a design: pick a ready-made design and edit it online, or upload their own file. Print guides show the cut line and safe area. Save draft: start now, finish later.

## The flow rule (owner-confirmed)

Neither editor can be opened directly.
- Digital: the customer **chooses a template first**, then designs, pays, and gets the link and QR instantly.
- Print: the customer **chooses material, printing (single or front & back) and quantity first**, then designs online or uploads, then orders.

So a home page may **preview** the editors (demo, video, animation, labelled "Preview") but every button must lead to the selection step, never straight into an editor.

## Prices

Digital templates (full list on vueme.in; these are the ones used in the redesign): see `references/prices.json`. Aria ₹499, Bento ₹799, Spotlight ₹799, Bauhaus ₹999.

Printed cards, sale price / regular price:

| Material | Printing | 500 cards | 1000 cards |
| --- | --- | --- | --- |
| Matte (300 GSM, matte lamination) | Single side | ₹675 / ₹849 | ₹899 / ₹999 |
| Matte | Front & back | ₹849 / ₹999 | ₹1,049 / ₹1,199 |
| Gloss (300 GSM, gloss lamination) | Single side | ₹625 / ₹799 | ₹850 / ₹949 |
| Gloss | Front & back | ₹788 / ₹899 | ₹999 / ₹1,149 |
| Synthetic (180 micron sheet) | Single side | ₹800 / ₹999 | ₹1,029 / ₹1,199 |
| Synthetic | Front & back | not offered | ₹1,249 / ₹1,349 |

Rules: synthetic front & back is **1000 only**. **Rounded corners +₹100** on matte and gloss only. Files: JPG or PNG, ideally 300 DPI; low resolution may print blurry and is not a defect. Cancel within 2 hours while Processing for a full refund. Shipping: India Post Speed Post with tracking, India only. Damaged or misprinted: email within 48 hours of delivery with order number, photos and a continuous unboxing video; **if approved**, reprint or replace free. Bulk orders: quote on WhatsApp.

Wording Vueme uses: matte "soft, low-glare"; gloss "shiny"; synthetic "resists water and tearing better than paper cards".

## Current offer

**Diwali: 50% off the digital card price** (Aria ₹249.50, Bento/Spotlight ₹399.50, Bauhaus ₹499.50). Assumed, pending owner confirmation: add-ons and renewal stay full price; no end date or coupon code yet; exact half prices (not rounded). In code it is the `OFFER` object in `redesigns/vueme-v2/assets/vueme.js`. Check whether it is still active before using it.

## Audience and channel

About **80% of visitors are on phones**; leads come mainly from mobile. WhatsApp is the main contact path. Customers include clinics, architects, institutes, consultants, freelancers, designers and growing teams across India.

## Contact and links

support@vueme.in · +91 90420 18017 · WhatsApp wa.me/919042018017 · Mon–Sat, 10 AM–6 PM · replies usually within 1 working day. Payments through PayU: UPI, cards, net banking, wallets; no cash on delivery. Page URLs: `references/prices.json` → `urls`.

## Brand voice

Warm, plain, specific. Tagline (keep exactly): "Your business card, reimagined. Get a digital card with your own link and QR code, or order premium printed cards — all designed online with Vueme." Headline used on the digital card: "One link. Your whole profile." Printed: "Business cards that feel as good as they look." Site credit: "Designed by brandme".

Never claim: "forever" for links (renewal applies), anonymity or privacy rules beyond "private dashboard only you can see", delivery times other than those above, "no software, no designer"-style slogans, made-up stats or testimonials.
