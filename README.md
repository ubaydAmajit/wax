# Strip Wax Boutique — website rebuild

A rebuild of [stripwaxboutique.co](https://www.stripwaxboutique.co/) as a fast, accessible,
hand-written static site. **UI and navigation only** — no backend, no CMS, no booking engine.
Booking links out to the salon's existing Timely system, which is also where live pricing lives.

## Running it

No build step. Open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000   # http://localhost:8000
```

Deploy by uploading the folder as-is to any static host (Netlify, Cloudflare Pages, GitHub
Pages, S3 — anything that serves files).

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — positioning, treatments, why Strip, how to find us |
| `location-and-about-us.html` | Address, step-by-step directions, the studio's story |
| `waxing-menu.html` | Treatments, bikini styles, hot vs strip wax, Strip Club membership |
| `brazilian-wax-information.html` | What a Brazilian involves, which wax, pricing, first-timer FAQ |
| `vajazzle.html` | Vajazzle add-on and the short film Strip sponsored |
| `faqs.html` | Waxing 101 — contraindications, before, after, common questions |
| `testimonials.html` | Press mentions and client quotes |
| `book-now.html` | Booking CTA plus the full terms and conditions |

Filenames mirror the original site's URLs so existing links and search results keep working.

## Design

The original's brand is black, hot magenta and white filigree scrollwork. That's kept — what
changed is the execution:

- **Contrast.** The original set body copy in red and magenta on black, well below legible.
  Body text is now near-white; magenta is an accent. Every text/background pair on every page
  is verified against WCAG AA (see *Verification*).
- **Hierarchy.** A real type scale replaces same-size headings and body text at huge
  line-height, so pages can be skimmed instead of read start to finish.
- **Wayfinding.** Long pages (`waxing-menu`, `brazilian-wax-information`, `faqs`, `book-now`)
  get a sticky in-page jump bar. The booking T&Cs became a fee table plus an accordion rather
  than a wall of red text.
- **Mobile.** The original's Phone / Email / Facebook strip moves to a fixed bottom action bar
  (Call / Email / Book) within thumb reach, and the promo bar no longer collides with the menu
  button.
- **Filigree.** The brand's scrollwork is regenerated as SVG (`assets/img/flourish.svg`,
  `ornament.svg`) and applied through CSS masks, so one file takes any colour and any size.

## Structure

```
assets/css/site.css   single stylesheet — tokens, base, layout, components
assets/js/site.js     progressive enhancement only (~90 lines, no dependencies)
assets/img/           filigree, ornament, favicon
```

- **No framework, no bundler, no dependencies.** Two external requests: the stylesheet and
  Google Fonts (Playfair Display + Inter), both with system-font fallbacks.
- **JavaScript is optional.** The mobile menu, menu filters, scroll reveals and footer year are
  enhancements; every page is fully readable and navigable with JS disabled.
- **Accessibility:** skip link, landmarks, visible focus rings, `aria-current` on the active nav
  item, `aria-expanded`/`aria-controls` on the menu toggle, Escape closes the menu, and
  `prefers-reduced-motion` disables all animation.
- **Theming:** colours, type scale and spacing are custom properties on `:root`. Rebrand by
  editing that one block.

## Pricing is deliberately not hard-coded

The live site says *"please see our booking system for the up to date current pricing"*, and
Brazilian prices move with each client's own visit history through Strip Club membership. So
the menu doesn't invent numbers.

Each treatment row has an empty price slot:

```html
<li class="price-item">
  <span class="price-item__name">Full leg</span>
  <span class="price-item__price"></span>
</li>
```

An empty `.price-item__price` renders **"See booking"** via CSS. To show a figure, just type it
into the span — `<span class="price-item__price">$52<small>Strip wax</small></span>`. Nothing
else needs to change.

## Content accuracy

Copy was transcribed from screenshots of the live site, so the wording, addresses, terms and
the two confirmed prices (Vajazzle $5–$30, 10% student discount) are the salon's own.

Worth confirming before launch:

- The Instagram URL in the footer (`instagram.com/stripwaxboutique`) — inferred, not seen
- The press links on `testimonials.html` — only the Top Reviews listing has a real URL; The
  Residents and Salient currently link back to the quotes section
- Opening hours are stated as "by appointment" rather than invented
- Real photography: the original has studio interior and building exterior shots that aren't in
  this repo. Slots for them are the `.map-frame` on the location page and the treatment cards.

## Verification

Checked in Chromium at 390px and 1440px across all eight pages:

- No JavaScript errors, no failed requests, no horizontal overflow
- Every internal link and every in-page anchor resolves
- Menu filters, FAQ accordions, mobile menu and Escape-to-close all behave
- All sampled text passes WCAG AA contrast, measured with alpha compositing so translucent
  panels are judged as they actually render
