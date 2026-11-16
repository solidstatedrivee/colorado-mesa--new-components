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
| 1 + 2 | **Hero** (banner + optional below-hero) — root `.cmu-hero` | `components/01-hero/` | `section.banner` from `banner-*.html`; homepage `div.intro` (`.digital-promo`, `.scroll-down`), `.video-popup`, `#VideoModal` | QA |
| 3 | **Icon Cards** — root `.cmu-icon-cards` | `components/02-icon-cards/` | homepage `section.activities` + `.bodymovin` (Lottie) | QA |
| 4 | **Modal Cards** — root `.cmu-modal-cards` | `components/03-modal-cards/` | homepage `section.cmunow` background treatment; `#VideoModal` | QA |
| 5 | **Two Column** — root `.cmu-two-col` | `components/04-two-column/` | homepage `section.testimonials` (yellow) and `.intro` (maroon, same as Hero below-hero) backgrounds | QA |
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
├── index.html                      # dev index linking every component page
├── client-provided/                # client spec + mockup (read-only)
├── assets/
│   ├── css/
│   │   └── components.css          # ONE combined stylesheet for all new components
│   └── js/
│       ├── hero.js                 # one JS file per component, only if it needs JS
│       ├── modal-cards.js
│       └── image-grid.js
├── components/
│   ├── _template.html              # page shell to copy for component pages
│   ├── 01-hero/                    # one page per variation (Hero is fixed at the top, once per page)
│   ├── 02-icon-cards/
│   ├── 03-modal-cards/
│   ├── 04-two-column/
│   ├── 05-image-grid/
│   └── full-page.html              # all components assembled, matching the mockup
├── www.coloradomesa.edu/ …         # captured site (read-only)
└── <cdn domains>/ …                # captured third-party assets (read-only)
```

> All folders, `components.css`, and the JS files are scaffolded. Components not yet built may still have placeholder pages with a `<section class="cmu-…">` stub.

### Variation pages

**Each component folder has one page, `all-variations.html`, with every variation as its own labelled row.** A variation is a meaningful configuration an editor can produce in Cascade (layout option, card count, modal type, empty optional fields, etc.). Putting several instances on one page also checks that IDs stay unique. A variation gets its own page only when it can't share a page with the others — e.g. the Hero, which is fixed at the top and appears once per page; those pages are named lowercase-kebab by configuration (`image--video-modal.html`). Variations are listed per component below.

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

To add a variation, add a labelled row to the component's `all-variations.html`. If the shell itself needs to change, update `_template.html` **and** every component page.

---

## Running locally

Serve the **repo root** over HTTP (Lottie JSON and some fonts won't load from `file://`):

```bash
python3 -m http.server 8000
# http://localhost:8000/                       ← index of every component page
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

**Banner** — the `section.banner` block from each `banner-*.html` page is used **as-is**, including every existing CMS option (logo, title, subtitle, intro, CTA, Watch Video button, **Custom HTML Block**, tubular init, inline modal scripts). Only asset paths are rewritten. The mockup's dual-styled title / image-under-text treatment is **not** used — the banner keeps its current layout. Three layouts:
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

Markup (base: homepage `div.intro`, so `home-styles-cmu.css` styles it under `body.home`):
```html
<div class="cmu-hero cmu-hero--with-below">         <!-- no --with-below when below-hero is omitted -->
  <section class="banner …">…</section>             <!-- as-is from banner-*.html -->
  <div class="intro cmu-hero__below" id="cmu-hero-below">
    <div class="digital-promo cmu-hero__media" style="background-image:url(…)">
      <a class="cmu-hero__media-link cmu-hero__media-link--video video-popup tubular-pause" data-src="…/embed/ID" data-target="#VideoModal" data-toggle="modal" href="#" role="button">
        <img class="cmu-hero__play-icon" alt="" …>     <!-- icon image -->
        <span class="cmu-hero__media-title">…</span>   <!-- optional header -->
      </a>
      <!-- link mode (no icon image; caption + arrow bottom-left):
      <a class="cmu-hero__media-link cmu-hero__media-link--link" href="…">  (+ target="_blank" rel="noopener" if external)
        <span class="cmu-hero__media-title">…</span>
        <span aria-hidden="true" class="cmu-hero__link-arrow"><svg class="icon"><use xlink:href="#icon-arrow-right-white"></use></svg></span>
      </a> -->
      <div class="scroll-down d-none d-lg-block"><a class="scrolly" href="#cmu-hero-below"><img alt="Picture yourself here" …></a></div>
    </div>
    <div class="cmu-hero__text">
      <p class="small">…</p> <h2>…</h2> <div class="cmu-hero__wysiwyg">…</div>
    </div>
  </div>
</div>
```

Notes:
- **Icon image is video-mode only.** Link mode drops it and uses a bottom-left caption + arrow so it doesn't look like a video.
- No custom JS: `scripts.js` handles `.video-popup` → `#VideoModal`; `tubular-pause`/`tubular-play` pause the YouTube banner background; the banner's inline script pauses uploaded video.
- The homepage `.intro` is a fixed 500px tall on desktop — keep below-hero WYSIWYG copy short or it will overflow.
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
- ~~Show buttons~~ — **no buttons** (dropped from the client spec's optional per-row button toggle; matches the mockup)

Markup (homepage `section.activities` as-is, minus the buttons and `link-box`):
```html
<section aria-labelledby="cmu-icon-cards-r1-heading" class="activities cmu-icon-cards">
  <div class="container">
    <div class="small">…</div>                                         <!-- above-header text; omit if empty -->
    <h2 id="cmu-icon-cards-r1-heading">…</h2>
    <div class="cmu-icon-cards__intro">…</div>                          <!-- intro copy; omit if empty -->
    <div class="row justify-content-center">
      <div class="col-lg-4">                                            <!-- 2 cards: col-lg-6, 4 cards: col-lg-3 -->
        <div class="bodymovin hover cmu-icon-cards__card" data-icon="…/icon.json">   <!-- .json icon -->
          <h3>…</h3>
          <p>…</p>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="cmu-icon-cards__card cmu-icon-cards__card--static">            <!-- any other icon file -->
          <img class="cmu-icon-cards__icon" src="…" alt="" height="110">
          <h3>…</h3>
          <p>…</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

Notes:
- `home-styles-cmu.css` styles it under `body.home` (card layout, icon position, maroon uppercase `h3`). The 02 section of `components.css` only removes the 90px button space and the link-style hover (grey background + pointer), since the cards aren't links. Lottie icons still animate on hover.
- Static image icons get the same size and position as Lottie icons. Icons are decorative (`alt=""`); the heading carries the meaning.
- No new JS: the homepage's inline Lottie init (`.bodymovin.hover`) loads the icons.

Variations: all on **one page**, `all-variations.html`, each as its own labelled row: mockup (3 cards, Lottie), 2 cards, 4 cards (Lottie + static mixed), static image icons, intro copy with no above-header text.

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

Markup (one row; `r1` = the row's position on the page, `c1` = the card's position in the row):
```html
<section class="cmu-modal-cards" aria-labelledby="cmu-modal-cards-r1-heading">
  <div class="cmu-modal-cards__bg" aria-hidden="true">
    <img class="cmu-modal-cards__photo" src="…" alt="" loading="lazy" decoding="async">   <!-- background image; omit if empty -->
  </div>
  <div class="container">
    <div class="cmu-modal-cards__header">
      <h2 class="cmu-modal-cards__heading" id="cmu-modal-cards-r1-heading">…</h2>
      <div class="cmu-modal-cards__intro">…</div>                                   <!-- intro copy; omit if empty -->
    </div>
    <ul class="row justify-content-center cmu-modal-cards__grid">
      <li class="col-12 col-sm-6 col-lg-4 cmu-modal-cards__item">                  <!-- 2 cards: col-12 col-md-6 -->
        <div class="cmu-modal-cards__card">
          <img class="cmu-modal-cards__img" src="…" alt="" loading="lazy" decoding="async">
          <h3 class="cmu-modal-cards__title"><button type="button" class="cmu-modal-cards__trigger stretched-link" data-toggle="modal" data-target="#modal-r1-c1" aria-haspopup="dialog"><span class="cmu-modal-cards__label">Title</span></button></h3>
        </div>
      </li>
      <!-- video card: add cmu-modal-cards__card--video + play cue; trigger opens #VideoModal -->
      <li class="col-12 col-sm-6 col-lg-4 cmu-modal-cards__item">
        <div class="cmu-modal-cards__card cmu-modal-cards__card--video">
          <img class="cmu-modal-cards__img" src="…" alt="" loading="lazy" decoding="async">
          <span class="cmu-modal-cards__play" aria-hidden="true"></span>
          <h3 class="cmu-modal-cards__title"><button type="button" class="cmu-modal-cards__trigger stretched-link video-popup tubular-pause" data-toggle="modal" data-target="#VideoModal" data-src="https://www.youtube.com/embed/ID" data-video-title="Title video" aria-haspopup="dialog"><span class="cmu-modal-cards__label">Title</span><span class="sr-only">, play video</span></button></h3>
        </div>
      </li>
    </ul>
  </div>
</section>
<!-- one per content / custom-block card (video cards use #VideoModal) -->
<div class="modal fade cmu-modal-cards__modal" id="modal-r1-c1" tabindex="-1" role="dialog" aria-labelledby="modal-r1-c1-title" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">                  <!-- "Wide": modal-xl -->
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title" id="modal-r1-c1-title">Title</h2>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
        <!-- content: <img class="cmu-modal-cards__modal-img" alt="…"> + <div class="cmu-modal-cards__modal-body">WYSIWYG</div>
             + <p class="cmu-modal-cards__modal-cta"><a class="button-link" href="…">…</a></p>
             custom block: the block's XHTML as-is -->
      </div>
    </div>
  </div>
</div>
```

Notes:
- **Background:** the photo is an `<img>` (forced black and white with CSS). The cmunow gradients and value circles (`patterns/dignity.png`, `patterns/resilence.png`) are fixed layers in CSS, blended over it. No photo = plain gradient.
- **Whole card is clickable** via Bootstrap's `.stretched-link` on the `<button>`, so the title stays a real `<h3>` and the card is one keyboard stop. The yellow focus ring is drawn around the whole card.
- **Card images are decorative** (`alt=""`): the title names the button. The content modal's image has its own alt text field.
- **Modal title = card title.** Content modal fields: optional image + alt, WYSIWYG, optional button (text + internal or external link), width (standard / wide).
- **Long titles:** the title field is capped at 30 characters in the DD; CSS also stops titles at 3 lines as a safety net.
- **`modal-cards.js` moves content/block modals to `<body>` on load.** `.cd-main-content` (position + `z-index: 2` + transform, for the mega menu) otherwise traps them under the body-level backdrop and blocks clicks. Nothing to change in Cascade output.
- Video cards reuse `#VideoModal` exactly as the homepage does; `modal-cards.js` only names it after the card (e.g. "Asteria Theatre video") while open.

Variations: all on **one page**, `all-variations.html`, each as its own labelled row: mockup (6 cards, every modal type), 2 cards, 3 cards, 5 cards (centered last row), video modals, content modals, custom-block modals, and empty optional fields (no photo, no intro). Having 8 rows on one page also checks that modal IDs stay unique.

### 04 · Two Column (mockup §5)

Full width. The mockup shows yellow + text-left + map image; the component has more options.

- Background: **yellow** or **maroon** (maroon = same gradient as Hero below-hero → share the class)
- Content position: **text left**, **text right**, **text only** (text-only = centered, narrower column)
- Content: Above-header text, Header text, WYSIWYG
- Image: Image, Alt text (hidden when text-only)

Variations: all on **one page**, `all-variations.html`, each as its own labelled row: yellow and maroon × text left / text right / text only, plus empty optional field (no above-header text).

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

1. Pick up your assigned component; build its `all-variations.html` from `_template.html`.
2. Add styles to your section of `components.css`; add `assets/js/<component>.js` if needed.
3. Check every variation (row) at all breakpoints and with keyboard only.
4. Add the component to `components/full-page.html` and compare against `client-provided/mockup.jpg`.
5. Update the status column in the component map above.
6. Add your component's entry to **Cascade implementation notes** below.
7. Hand off to the Cascade implementation.

---

## Cascade implementation notes

High-level list of what's **new**, **changed**, or **reused as-is** for the Cascade build. Update this as each component is finished.

### Site-wide (all components)

| Asset | Status | Notes |
|---|---|---|
| `assets/css/components.css` | **New** | Upload as a site CSS file. Link it in the new content type's template **after** `style.css` and `home-styles-cmu.css`. |
| Content type template | **New** (copy of homepage) | Base it on the homepage template (`body.home`, `<main id="content">`, footer, `#VideoModal` region, homepage scripts). Leave out the homepage-only inline `#hero` `<style>` block. |
| `assets/js/*.js` | Per component | Only upload the files a component says it needs (see below). |
| `assets/images/sample/*` | **Prototype only** | Placeholder images. Don't upload; editors provide the real files. |

### 01 · Hero

| Asset | Status | Notes |
|---|---|---|
| Banner (custom page banner format/DD) | **Reused as-is** | Use the existing custom-page banner, all options included (image, popup video, background video, Custom HTML Block). Place it at the top of `<main id="content">`. |
| Below-hero | **Changed: was hard-coded in the homepage format, now needs fields** | New optional DD group plus format output that matches the markup in [01 · Hero](#01--hero-mockup-1--2). Fields: picture-yourself graphic, background image, icon image (video only), header text, action (YouTube ID **or** internal/external link), above-header text, header text, WYSIWYG. |
| Hero wrapper | **New markup** | `<div class="cmu-hero">` around the banner and below-hero. Add `cmu-hero--with-below` when below-hero is used. |
| Link-mode class | **New markup** | Output `cmu-hero__media-link--video` or `cmu-hero__media-link--link` depending on the action. Leave out the icon image in link mode; add `target="_blank" rel="noopener"` for external links. |
| `home-styles-cmu.css` (`.intro`, `.digital-promo`, `.scroll-down`) | **Reused as-is** | Gives the below-hero its base styling. No changes. |
| `#VideoModal` region, `js/scripts.js`, `jquery.tubular` | **Reused as-is** | They already handle the video modal and pausing the background video. |
| `assets/js/hero.js` | **Not needed** | Empty placeholder. Don't upload. |

### 02 · Icon Cards

| Asset | Status | Notes |
|---|---|---|
| Icon Cards row (DD group + format) | **New** | Fields: above-header text, header text, intro (WYSIWYG), cards (2–4) with icon file, heading, copy. Format outputs `bodymovin hover` + `data-icon` for `.json` icons, `<img class="cmu-icon-cards__icon">` otherwise; `col-lg-6` / `col-lg-4` / `col-lg-3` by card count. No button fields. Output must match the markup in [02 · Icon Cards](#02--icon-cards-mockup-3). |
| `home-styles-cmu.css` (`section.activities`, `.bodymovin.hover`) | **Reused as-is** | Base styling. |
| Lottie 5.6.5 + homepage inline init script | **Reused as-is** | Already in the homepage template. |
| `assets/css/components.css` (02 section) | **New** | Small overrides: no button space, no link-style hover, static icon cards. |

### 03 · Modal Cards

| Asset | Status | Notes |
|---|---|---|
| Modal Cards row (DD group + format) | **New** | Fields: background image, header text, intro (WYSIWYG), cards (2+) with image, title (max 30 characters), modal type (video / content / custom block) and the fields for that type: YouTube ID; or optional image + alt, WYSIWYG, optional button text + internal/external link; or block chooser. Width (standard / wide) for content and custom block. Output must match the markup in [03 · Modal Cards](#03--modal-cards-mockup-4). |
| Modal IDs | **New markup** | `modal-r{row}-c{card}` and `cmu-modal-cards-r{row}-heading`, from the row's position on the page, so several Modal Cards rows can share a page. |
| `assets/css/components.css` (03 section) | **New** | Pattern image paths are written relative to `assets/css/` for the prototype (`../../www.coloradomesa.edu/images/patterns/…`). Point them at the live `/images/patterns/dignity.png` and `/images/patterns/resilence.png` when uploading. |
| `assets/js/modal-cards.js` | **Needed** | Upload and load after jQuery, Bootstrap and `scripts.js`. Moves content/block modals to `<body>` (required for mouse clicks inside them), names `#VideoModal` per card, stops media when a modal closes. |
| `#VideoModal` region, `js/scripts.js` (`.video-popup`), `jquery.tubular` (`tubular-pause`) | **Reused as-is** | Video cards use the same pattern as the homepage testimonial. |
| `patterns/dignity.png`, `patterns/resilence.png` | **Reused as-is** | Same files the homepage CMUnow section uses. |
| `assets/images/sample/modal-cards-*.jpg` | **Prototype only** | Cropped from the client mockup. Don't upload. |
