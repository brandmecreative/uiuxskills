---
name: design-md
description: Library of 84 DESIGN.md design systems analysed from well-known websites (Stripe, Linear, Vercel, Apple, Airbnb, Notion, Figma, Spotify, Tesla, Nike and more), each with colour tokens, typography, spacing, components and layout rules. Use when the user asks for a UI, page or component "like", "in the style of" or "inspired by" a named site or brand, wants a ready-made visual direction to start from, or asks to add a DESIGN.md to their project.
---

# DESIGN.md library

84 plain-markdown design systems from [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) (MIT). Each file in `systems/<name>/DESIGN.md` starts with YAML tokens (colours, typography, radii, spacing) followed by prose rules for layout, components and imagery.

## How to use

1. Find the system: read `INDEX.md` in this folder (one line per system), or list `systems/`. Names are lowercase site names, e.g. `stripe`, `linear.app`, `vercel`, `apple`, `airbnb`, `x.ai`.
2. Read only the one or two `systems/<name>/DESIGN.md` files you need. They are long, so don't load them all.
3. Build from its tokens and rules: turn the YAML into CSS variables or theme config, and follow its type scale, spacing, component and layout guidance.
4. If the user wants it in their project, copy that file to `DESIGN.md` at the project root so later work stays consistent.

## Rules

- These describe the *visual language* of real companies. Borrow the style (palette logic, type scale, spacing, component feel), never their identity: don't use their logos, brand names, product names, trademarked fonts or copy on the user's page, and don't build anything that could pass as that company's site.
- Proprietary fonts named in a file (e.g. Söhne, SF Pro) are usually not free to use. Swap in the closest Google Font and say so.
- Mixing is fine. For example, use one system's colours with another's layout, but keep a single coherent token set in the output.
- If no listed system fits, say so rather than forcing one.
