# Strip Wax Boutique — website rebuild

A rebuild of [stripwaxboutique.co](https://www.stripwaxboutique.co/) as a clean, fast,
hand-written static site. **UI and navigation only** — there is no backend, no CMS and no
booking engine; the booking CTAs link out to the salon's existing scheduling system.

## Running it

There is no build step. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

Deploy by uploading the folder as-is to any static host (Netlify, Cloudflare Pages,
GitHub Pages, S3 — anything that serves files).

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — positioning, why Strip, treatment categories, first-visit steps |
| `waxing-menu.html` | Full price list with category filtering |
| `brazilian-wax-information.html` | Hot vs strip wax, pricing tiers, FAQ accordion |
| `location-and-about-us.html` | About the studio, address, and step-by-step directions |
| `testimonials.html` | Client quotes |
| `book-now.html` | Booking CTA, contact alternatives, pre-appointment notes |

Page filenames mirror the original site's URLs so existing links and search results keep working.

## Structure

```
assets/css/site.css   single stylesheet — tokens, base, layout, components
assets/js/site.js     progressive enhancement only (~90 lines, no dependencies)
assets/img/favicon.svg
```

- **No framework, no bundler, no dependencies.** Two external requests: the stylesheet and
  Google Fonts (Fraunces + Inter), both with system-font fallbacks.
- **JavaScript is optional.** The mobile menu, price filters, scroll reveals and footer year
  are enhancements; every page is fully readable and navigable with JS disabled.
- **Accessibility:** skip link, landmark elements, visible focus rings, `aria-current` on the
  active nav item, `aria-expanded`/`aria-controls` on the menu toggle, Escape closes the menu,
  and `prefers-reduced-motion` disables animation.
- **Responsive** from 320px up; verified at 390px and 1440px with no horizontal overflow.

### Design tokens

Colours, type scale and spacing are CSS custom properties on `:root` in `site.css`. Rebrand by
editing that one block — `--plum`, `--rose`, `--cream` and `--sand` drive the whole palette.

## Content accuracy

The live site could not be fetched from the build environment, so copy was reconstructed from
public search-index snippets of the original pages and business listings.

**Verified against the original site or public listings:** the address and directions, phone
number, positioning copy ("we only do waxing", senior waxing experts, 15–30 minute treatments,
hygiene), the two Brazilian wax options and their new-client prices ($70 mix / $79 full hot,
with the student rates), the 10% NZ student discount, underarm pricing ($18 strip / $23 hot),
the $35 full back, and the testimonial quotes.

**Reconstructed and needs confirming before going live:**

- Individual prices marked "from" on `waxing-menu.html` (legs, arms, face, most men's services)
- The middle rows of the Brazilian tier table in `brazilian-wax-information.html` — only the
  within-28-days ($44 / $39 student) and new-client tiers are confirmed
- Opening hours (the site deliberately says "by appointment" rather than inventing hours)
- The `bookings@` email address and the Instagram URL in the footer
- The booking link, which currently points at the Timely scheduling page

Search for `from $` in `waxing-menu.html` to find every unconfirmed price in one pass.
