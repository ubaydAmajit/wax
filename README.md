# Strip Wax Boutique

A rebuild of [stripwaxboutique.co](https://www.stripwaxboutique.co/) as a small, fast static
site. UI and navigation only. There is no backend, no CMS and no booking engine: booking links
out to the salon's existing Timely system, which is also where live pricing lives.

## Running it

No build step and no dependencies. Open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000   # http://localhost:8000
```

Deploy by uploading the folder as-is to any static host (Netlify, Cloudflare Pages, GitHub
Pages, S3).

## Pages

Eight pages. Four sit in the top nav plus a Book button; the rest are linked
from the footer, which keeps the header short without losing anything.

| File | Where it is linked | Contains |
| --- | --- | --- |
| `index.html` | Nav: Home | Positioning, treatments, why Strip, review slider, how to find us |
| `waxing-menu.html` | Nav: Waxing | Treatments, bikini styles, hot vs strip wax, Strip Club |
| `brazilian-wax-information.html` | Nav: Brazilian Wax | What a Brazilian is, which wax, pricing, Brazilian FAQ |
| `location-and-about-us.html` | Nav: About | Address, directions, the studio's story, a few reviews |
| `book-now.html` | Nav: Book now | Booking CTA and the full terms and conditions |
| `faqs.html` | Footer | When not to wax, before and after care, general questions |
| `vajazzle.html` | Footer | Vajazzle pricing, the Wikipedia definition, the short film |
| `testimonials.html` | Footer | Press mentions and the full set of client reviews |

Filenames match the original site's URLs so existing links and search results keep working.

## Design

Black, hot magenta and white filigree, same as the original. What changed is the execution:

* **Contrast.** The original set body copy in red and magenta on black, well below legible.
  Body text is near-white now, with magenta as an accent. Every text and background pair on
  every page is checked against WCAG AA.
* **Type.** Three families, each doing one job: Playfair Display for headings, Lora for body
  prose (a serif, like the original, rather than a neutral sans), and Inter for UI chrome such
  as nav, buttons and labels. `--muted` is reserved for captions and small print so body copy
  never sits dim against the background.
* **Hierarchy.** A real type scale, instead of headings at body size with huge line-height.
* **Less chrome.** The original had eight nav items. This has four. No breadcrumbs, no filter
  chips, no scroll animations, no in-page jump bars.
* **Mobile.** The original's Phone / Email / Facebook strip becomes a fixed bottom bar (Call,
  Email, Book) in thumb reach, and the promo bar no longer collides with the menu button.
* **Terms.** The booking T&Cs are a fee table plus an accordion rather than a wall of red text.
* **Reviews.** The home page carries a testimonial slider that advances on its own every six
  seconds, pauses on hover, focus and when the tab is hidden, and can be driven with the arrows
  or the dots. It is built on a scroll-snap track, so with JavaScript off it degrades to a
  swipeable row with every quote still readable.
* **Filigree.** Regenerated as SVG (`assets/img/flourish.svg`, `ornament.svg`) and applied via
  CSS masks, so one file takes any colour at any size.

## Copy

Written in the salon's own voice, using their wording wherever the original had it: "all we do
is waxing", "we take it OFF at Strip", "your goodies are in good hands", "no show is a no no".
Kept free of em dashes and stock marketing phrasing.

## Structure

```
assets/css/site.css   one stylesheet: tokens, base, layout, components
assets/js/site.js     mobile menu, testimonial slider, footer year
assets/img/           filigree, ornament, favicon
```

No framework, no bundler. Two external requests: the stylesheet and Google Fonts (Playfair
Display, Inter), both with system fallbacks.

JavaScript is optional. The mobile menu, the slider's arrows and dots, and the footer year are
the only things that use it, and every page reads and navigates fine without it.

Accessibility: skip link, landmarks, visible focus rings, `aria-current` on the active nav
item, `aria-expanded` and `aria-controls` on the menu button, Escape closes the menu, and
`prefers-reduced-motion` disables transitions.

Theming: colours, type scale and spacing are custom properties on `:root` at the top of
`site.css`. Rebrand by editing that one block.

## Why there are no prices

The live site says "please see our booking system for the up to date current pricing", and
Brazilian prices move with each client's own visit history through Strip Club membership. So
the menu lists treatments and descriptions, with one clear line pointing at the booking system,
rather than numbers that would go stale. The only prices stated are the two the salon
publishes itself: vajazzles at $5 to $30, and 10% off with a student ID.

To add prices later, put them in the `<span>` inside each `.treatments` item.

## Worth confirming before launch

* The Instagram URL in the footer is inferred, not taken from the site
* The Residents and Salient press mentions on `testimonials.html` have no link, because only
  the Top Reviews listing had a URL to work from
* The FAQ body copy on `faqs.html` follows the original's headings (when not to wax, before,
  after, questions), but the original's own wording under those headings was not legible in the
  screenshots, so it is standard waxing guidance rather than a transcription
* Opening hours are described as "by appointment" rather than invented
* The original has studio interior and building exterior photos that are not in this repo. The
  natural slots are the `.map-frame` on the About page and the top of the Home page.

## Verified

Checked in Chromium at 390px and 1440px across all eight pages: no JavaScript errors, no failed
requests, no horizontal overflow, every internal link and in-page anchor resolves, the mobile
menu and accordions behave, and all sampled text passes WCAG AA contrast.

The slider is tested separately: arrows, dots, wrapping past either end, autoplay advancing,
hover pausing it, and the JavaScript-disabled fallback still showing all seven quotes in a
scrollable track.
