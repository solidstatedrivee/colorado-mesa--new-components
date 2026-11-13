# Colorado Mesa University — New Content Type Components

Front-end prototypes for a new Cascade CMS content type for Colorado Mesa University (CMU). The content type is **based on the CMU homepage template**, uses the **custom-page banner** at the top, and adds a set of new, reorderable row components.

This repo holds the static HTML/CSS/JS prototypes for each component. **Cascade implementation (data definitions, Velocity formats, regions) is handled separately by the team and is out of scope here.**

---

## Source material

| File | What it is |
|---|---|
| `client-provided/Colorado Mesa - New Content Type Notes.md` | **The spec.** Client's field-by-field requirements for every section. Read this first. |
| `client-provided/mockup.jpg` | Visual design (sample content: "Formation District"). Sections are numbered 1–7 on the right edge. |
| `client-provided/doc.md` | Short index pointing to the reference pages and mockup. |
| `www.coloradomesa.edu/reference-pages/homepage.html` | Captured live homepage — **the base template** for this content type. |
| `www.coloradomesa.edu/reference-pages/banner-*.html` | Captured custom-page banner variants — **the source markup for the hero**. |

Client references we cannot access without credentials (ask the project lead if needed):
- Cascade homepage and custom page assets (linked in the spec)
- Figma design kit: `CMU_Website_Prototype_9.2.25`

### About the captured site

Everything under the domain-named folders (`www.coloradomesa.edu/`, `maxcdn.bootstrapcdn.com/`, `use.typekit.net/`, etc.) is a static snapshot of the live site taken with `site-snap` on 2026-11-13 (see `.site-snap/manifest.json`). It is the **rendered output** of Cascade, not Cascade source. These files are read-only reference — **never edit them**; the prototypes link to them so components render with the real site styles.

---

## Mockup → component map

| Mockup § | Component | Folder | Builds on (existing code) | Status |
|---|---|---|---|---|
| 1 + 2 | **Hero** (banner + optional below-hero) — root `.cmu-hero` | `components/01-hero/` | `section.banner` from `banner-*.html`; homepage `#cmu-branded-hero`, `.scroll-down .scrolly`, `.video-popup`, `#VideoModal` | Scaffolded |
| 3 | **Icon Cards** — root `.cmu-icon-cards` | `components/02-icon-cards/` | homepage `section.activities` + `.bodymovin` (Lottie) | Scaffolded |
| 4 | **Modal Cards** — root `.cmu-modal-cards` | `components/03-modal-cards/` | homepage `section.cmunow` background treatment; `#VideoModal` | Scaffolded |
| 5 | **Two Column** — root `.cmu-two-col` | `components/04-two-column/` | new (maroon gradient shared with Hero) | Scaffolded |
| 6 | **Image Grid** — root `.cmu-image-grid` | `components/05-image-grid/` | new; Bootstrap 4 modal + carousel | Scaffolded |
| 7 | Footer | — | existing footer region, no work | n/a |

Owners: _TBD — components will be divided between developers._

Page order in the content type:

```
[Hero]        banner + optional below-hero   (fixed, one per page)
[Rows]        Icon Cards / Modal Cards / Two Column / Image Grid
              (repeatable, any order, any count)
[Footer]      existing footer region
```

---

## Repo layout

```
.
├── README.md
├── AGENTS.md                       # rules for AI agents / contributors
├── index.html                      # dev index linking every variation page
├── client-provided/                # client spec + mockup (read-only)
├── assets/
│   ├── css/
│   │   └── components.css          # ONE combined stylesheet for all new components
│   └── js/
│       ├── hero.js                 # one JS file per component, only if it needs JS
│       ├── modal-cards.js
│       └── image-grid.js
├── components/
│   ├── _template.html              # page shell to copy for new variation pages
│   ├── 01-hero/                    # every variation as its own page
│   ├── 02-icon-cards/
│   ├── 03-modal-cards/
│   ├── 04-two-column/
│   ├── 05-image-grid/
│   └── full-page.html              # all components assembled, matching the mockup
├── www.coloradomesa.edu/ …         # captured site (read-only)
└── <cdn domains>/ …                # captured third-party assets (read-only)
```

> All folders, variation pages, `components.css`, and the JS files are scaffolded. Variation pages currently contain a placeholder `<section class="cmu-…">` stub — replace it with real markup.

### Variation pages

**Each component folder contains every variation as a separate page.** A variation is a meaningful configuration an editor can produce in Cascade (layout option, card count, modal type, etc.). File names are lowercase-kebab and describe the configuration, e.g. `3-cards.html`, `maroon-text-right.html`, `image--video-modal.html`. Planned variations are listed per component below.

### Page shell

Variation pages are built on the **homepage** shell so they load the same CSS/JS as the real content type: `body.home`, header, `<main id="content">`, footer, the `#VideoModal` markup, and the homepage script stack. Strip the homepage's own content out of `<main>` and drop in the component.

`components/_template.html` is built from `homepage.html` (homepage-only inline `#hero` styles removed), with paths written relative to `components/<folder>/` — so it won't render in place; copy it into a component folder. Key lines:

```html
<link href="../../use.typekit.net/lgv0boo.css" rel="stylesheet">
<link href="../../www.coloradomesa.edu/css/style.css" rel="stylesheet">
<link href="../../www.coloradomesa.edu/css/home/home-styles-cmu.css" rel="stylesheet">
<link href="../../assets/css/components.css" rel="stylesheet">   <!-- always last -->
…
<script src="../../assets/js/<component>.js"></script>             <!-- after jQuery/Bootstrap -->
```

All planned variation pages already exist as copies of the shell. To add a new variation, copy any existing page in that folder (or `_template.html`). If the shell itself needs to change, update `_template.html` **and** every variation page.

---

## Running locally

Serve the **repo root** over HTTP (Lottie JSON and some fonts won't load from `file://`):

```bash
python3 -m http.server 8000
# http://localhost:8000/                       ← index of every variation
# http://localhost:8000/components/01-hero/image--none.html
# http://localhost:8000/www.coloradomesa.edu/reference-pages/homepage.html
```

No build step. YouTube embeds and a few captured third-party scripts (e.g. the emergency-notice RSS feed) need a network connection.

---

## Tech stack (inherited from the live site — do not upgrade)

- Bootstrap **4.4.1** (grid, modal, carousel) + Popper 1.16
- jQuery **3.4.1**
- Lottie / bodymovin **5.6.5** — `.bodymovin.hover` / `.bodymovin.auto` with `data-icon="path.json"` (init script is inline at the bottom of `homepage.html`)
- Rellax (parallax), lazysizes. (AOS is referenced but **commented out** on the homepage — don't rely on it.)
- `jquery.tubular` — YouTube background video in the banner

**Design tokens** (from `style.css`):

| Token | Value |
|---|---|
| Maroon | `#860037` |
| Yellow | `#FFD200` |
| Charcoal | `#262e2f` |
| Gradient (cmunow) | `linear-gradient(to right, #860037, #3F0444, #071944)` |
| Heading font | `pf-grand-gothik-variable` (Typekit) |
| Body font | `"Nunito Sans", sans-serif` |

**Dependency policy:** no new libraries unless the existing stack genuinely can't do the job. If one is needed, raise it with the project lead first, prefer MIT-licensed, and vendor it into `assets/` (no new CDN links).

---

## Component specs

Field lists come from the client spec; implementation notes are ours. Fields are listed so the markup accounts for every option (including empty/optional states) — the Cascade build will map onto this markup.

### 01 · Hero (mockup §1 + §2)

One component: the custom-page banner on top, plus an **optional** below-hero section that overlaps the bottom of the banner.

**Banner** — reuse markup from `banner-*.html` unchanged where possible (`section.banner.tall-banner`, `.banner-bg-vid`, `.video-popup` button, tubular init). Three layouts:
- `image` — background image
- `image-popup-video` — background image + "Watch Video" popup button
- `video-background` — YouTube background via tubular (or uploaded `<video id="banner-upload-video">`)

**Below-hero** (optional; fixed maroon gradient background; left/right **not** swappable):

| Left side | Right side |
|---|---|
| "Picture yourself" graphic — circular badge overlapping the banner (upload) | Above-header text (eyebrow) |
| Background / placeholder image (upload) | Header text |
| Icon image — **the play-button icon shown over the placeholder image** when the video option is used (upload) | WYSIWYG |
| Header text (optional) | |
| Action: **modal video** (YouTube ID → `#VideoModal`) **or link** (internal/external) | |

Notes:
- Homepage source for the badge: `.scroll-down .scrolly` + `images/hero/picture-yourself-here.svg`.
- Video triggers use the existing pattern: `data-src="https://www.youtube.com/embed/<ID>" data-target="#VideoModal" data-toggle="modal"`. There is one `#VideoModal` per page.
- When the banner has a background video *and* a modal is opened, the background video must pause and resume (see the `show.bs.modal` / `hidden.bs.modal` handlers in `banner-image-popup-video.html`).
- Banner CSS is scoped `#content .banner` / `#content section.banner`. The homepage uses `<main id="content">` (internal pages use `<div id="content"><main id="main">`), so it should apply — **verify first**, including any `.internal`-scoped rules the banner relies on.

Variations (banner layout × below-hero option):
```
image--none.html                  image--video-modal.html                  image--link.html
image-popup-video--none.html      image-popup-video--video-modal.html      image-popup-video--link.html
video-background--none.html       video-background--video-modal.html       video-background--link.html
```
Plus edge cases as needed (e.g. below-hero with no left header text).

### 02 · Icon Cards (mockup §3)

White background. Base: homepage `section.activities`.

- Above-header text, Header text, Intro copy (text/WYSIWYG)
- Cards: **2–4** → `col-lg-6` / `col-lg-4` / `col-lg-3`
  - Icon — single file field: `.json` → Lottie (`<div class="bodymovin hover" data-icon="…">`); anything else → `<img>`
  - Heading (text), Copy (text)
- Show buttons: **one toggle for the whole row** — all cards have a button or none do
  - Button text, Button link (per card)

Variations: `2-cards.html`, `3-cards.html`, `4-cards.html`, `with-buttons.html`, `lottie-icons.html`, `static-icons.html`.

### 03 · Modal Cards (mockup §4)

Background has three layers: value-icon circles, gradient, and a black-and-white photo. **Only the photo is editable.** Base: homepage `section.cmunow` (`patterns/dignity.png`, `patterns/resilence.png`, gradient, blend modes).

- Header text, Intro copy (text/WYSIWYG)
- Background image
- Cards: **2+** → 2 cards = `col-6`; 3+ = `col-4`. Center an incomplete last row.
  - Image, Title
  - Modal type:
    - **Video** — YouTube ID → reuse `#VideoModal`
    - **Content** — optional image, heading, WYSIWYG, optional button (proposed; confirm with client)
    - **Custom block** — block chooser, escape hatch for custom HTML (mirrors the custom banner)
- Content/block modals need their own modal markup with **unique IDs per row + card** (e.g. `modal-r2-c3`) so multiple Modal Cards rows on one page don't collide.

Variations: `2-cards.html`, `3-cards.html`, `5-cards.html`, `modal-video.html`, `modal-content.html`, `modal-block.html`, `two-rows-on-page.html` (ID collision check).

### 04 · Two Column (mockup §5)

Full width. The mockup shows yellow + text-left + map image; the component has more options.

- Background: **yellow** or **maroon** (maroon = same gradient as Hero below-hero → share the class)
- Content position: **text left**, **text right**, **text only** (text-only = centered, narrower column)
- Content: Above-header text, Header text, WYSIWYG
- Image: Image, Alt text (hidden when text-only)

Variations: `{yellow,maroon}-text-{left,right,only}.html` (6 pages).

### 05 · Image Grid (mockup §6)

Reference behaviour: <https://www.thehotelmaverick.com/photos>. Grid of rounded thumbnails (5 across on desktop); clicking opens a full-screen viewer with prev/next through all items.

- Above-header text, Header text
- Items: **5 minimum**
  - Type: image or video
  - Image upload **or** YouTube ID (video items still need a thumbnail — use the YouTube poster `https://img.youtube.com/vi/<ID>/hqdefault.jpg` or an uploaded image)
  - Alt text

Implementation: **Bootstrap 4 modal + carousel** (no new dependency). Open at the clicked index; keyboard arrows; Esc to close; swipe on touch; lazy-create YouTube iframes on slide and destroy/stop on slide-away and close. Only add a lightbox library if this proves inadequate (see dependency policy).

Variations: `images-only.html`, `images-and-video.html`, `5-items.html`, `many-items.html`.

---

## CSS & JS conventions

- **One combined stylesheet:** `assets/css/components.css`. Each component owns a clearly delimited section in a fixed order (Shared → Hero → Icon Cards → Modal Cards → Two Column → Image Grid). Only edit your component's section; coordinate changes to Shared.
- **JS per component**, only if needed: `assets/js/<component>.js`. jQuery + Bootstrap 4 APIs are available. Wrap in an IIFE, initialise every instance on the page (`$('.cmu-image-grid').each(...)`), no globals.
- **Prefix new classes** with `cmu-` (e.g. `.cmu-hero__below`, `.cmu-image-grid__item`) so they can't collide with the 545 KB `style.css`. Reuse existing site classes (`button-link`, `secondary-button`, `small`, Bootstrap grid) where they already match the design.
- Don't override global site rules; scope everything to your component root.
- Mobile-first, check at Bootstrap breakpoints (576 / 768 / 992 / 1200).

## Accessibility checklist

- Sections use `<section aria-label…>` or `aria-labelledby` like existing homepage sections.
- Heading order: banner `h1`; component headers `h2`; card titles `h3`.
- Modals: focus moves in on open, returns to the trigger on close, Esc closes, close button labelled.
- Clickable cards/thumbnails are `<button>` or `<a>` — not bare `div`s.
- All images have alt text (decorative backgrounds via CSS or `alt=""`).
- Video play overlays include screen-reader text.
- Respect `prefers-reduced-motion` for Lottie autoplay / transitions.

---

## Workflow

1. Pick up your assigned component; create its folder and variation pages from `_template.html`.
2. Add styles to your section of `components.css`; add `assets/js/<component>.js` if needed.
3. Check every variation at all breakpoints and with keyboard only.
4. Add the component to `components/full-page.html` and compare against `client-provided/mockup.jpg`.
5. Update the status column in the component map above.
6. Hand off to the Cascade implementation.
