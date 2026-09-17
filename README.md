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

Nine pages. Five sit in the top nav plus a Book button; the rest hang off the
Brazilian Wax dropdown and the footer, which keeps the header short without
burying anything.

| File | Where it is linked | Contains |
| --- | --- | --- |
| `index.html` | Nav: Home | Positioning, treatments, why Strip, review slider, how to find us |
| `waxing-menu.html` | Nav: Waxing | Treatments, bikini styles, hot vs strip wax, Strip Club |
| `brazilian-wax-information.html` | Nav: Brazilian Wax | What a Brazilian is, which wax, pricing, Brazilian FAQ |
| `location-and-about-us.html` | Nav: About | Address, directions, the studio's story, a few reviews |
| `contact.html` | Nav: Contact | Message form, direct contact details, studio address |
| `book-now.html` | Nav: Book now | Booking CTA and the full terms and conditions |
| `faqs.html` | Nav dropdown, footer | Waxing 101: booking, preparation, aftercare, general questions |
| `vajazzle.html` | Nav dropdown, footer | Vajazzle pricing, the Wikipedia definition, the short film |
| `testimonials.html` | Footer | Press mentions and the full set of client reviews |

Hovering **Brazilian Wax** in the nav opens a submenu with Brazilian wax
information, Preparation & aftercare, Waxing 101 & FAQs, and Vajazzle. It runs on
`:hover` and `:focus-within` alone, so it needs no JavaScript, opens on keyboard
focus, and collapses to an indented list on mobile.

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
* **Less chrome.** The original had eight nav items. This has five plus a Book button. No
  breadcrumbs, no filter chips, no scroll animations, no in-page jump bars.
* **Tiles over links.** The treatment groups on the home page are whole clickable tiles with a
  hover border and a moving arrow, rather than a paragraph with a link underneath.
* **Why Strip** sits in its own accent band: a pink wash, an ornament, filigree in the corner
  and cards topped with a pink rule and a large numeral.
* **Mobile.** The original's Phone / Email / Facebook strip becomes a fixed bottom bar (Call,
  Email, Book) in thumb reach, and the promo bar no longer collides with the menu button.
* **Terms.** The booking T&Cs are a fee table plus an accordion rather than a wall of red text.
* **Reviews.** The home page carries a testimonial slider that advances on its own every six
  seconds, pauses on hover, focus and when the tab is hidden, and can be driven with the arrows
  or the dots. It is built on a scroll-snap track, so with JavaScript off it degrades to a
  swipeable row with every quote still readable. It is deliberately compact: the track is about
  146px tall rather than letting the longest review set the height.
* **Filigree.** Regenerated as SVG (`assets/img/flourish.svg`, `ornament.svg`) and applied via
  CSS masks, so one file takes any colour at any size.

## Copy

Written in the salon's own voice, using their wording wherever the original had it: "all we do
is waxing", "we take it OFF at Strip", "your goodies are in good hands", "no show is a no no".
Kept free of em dashes and stock marketing phrasing.

The Waxing 101 content on `faqs.html` is transcribed from the salon's own FAQ page, so the
specifics are theirs: hair at 5 to 10mm, two weeks after shaving, Lycon Pinkini Hot Wax and
SOBerrylicious Strawberry Strip Wax, Argan Oil or Honey Strip Wax on larger areas, no bikini
region for male waxing, PFB Vanish for ingrowns, and the contra-indication lists. Anywhere the
rest of the site touches those details it now matches.

## Structure

```
assets/css/site.css   one stylesheet: tokens, base, layout, components
assets/js/site.js     mobile menu, testimonial slider, contact form, footer year
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

## The contact form

There is no backend, so the form hands the message to the visitor's email app.
JavaScript builds a `mailto:` with the name, email, subject and message; without
JavaScript the form's own `action="mailto:..."` does the same job. If a real
inbox-backed form is wanted later, point the `action` at a form service (Formspree,
Netlify Forms, Basin) and delete the `data-mailto` attribute, which is what the
script keys off.

## Worth confirming before launch

* The Instagram URL in the footer is inferred, not taken from the site
* The Residents and Salient press mentions on `testimonials.html` have no link, because only
  the Top Reviews listing had a URL to work from
* Opening hours are described as "by appointment" rather than invented
* The original has studio interior and building exterior photos that are not in this repo. The
  natural slots are the `.map-frame` on the About page and the top of the Home page.

## Verified

Checked in Chromium at 390px and 1440px across all nine pages: no JavaScript errors, no failed
requests, no horizontal overflow, every internal link and in-page anchor resolves, the mobile
menu and accordions behave, and all sampled text passes WCAG AA contrast.

The slider is tested separately: arrows, dots, wrapping past either end, autoplay advancing,
hover pausing it, and the JavaScript-disabled fallback still showing all seven quotes in a
scrollable track.

So is the nav submenu (hidden at rest, opens on hover, survives the pointer crossing the gap,
opens on keyboard focus, inline on mobile) and the contact form (submit intercepted rather than
navigating, required fields still enforced, mailto fallback present on the element).
