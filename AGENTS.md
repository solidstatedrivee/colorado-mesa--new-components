# AGENTS.md

Instructions for AI coding agents (and humans) working in this repo. Read `README.md` for the full project overview and component specs.

## Project in one paragraph

Static HTML/CSS/JS prototypes of new components for a Colorado Mesa University Cascade CMS content type. The content type uses the **homepage** as its base template, the **custom-page banner** markup at the top, and adds reorderable row components. The spec is `client-provided/Colorado Mesa - New Content Type Notes.md`; the design is `client-provided/mockup.jpg`. **Cascade implementation (data definitions, Velocity formats) is out of scope** — don't write Velocity, XSLT, or data-definition XML unless explicitly asked.

## Hard rules

1. **Never edit captured site files.** Everything under `www.coloradomesa.edu/`, the CDN-domain folders (`maxcdn.bootstrapcdn.com/`, `use.typekit.net/`, `cdnjs.cloudflare.com/`, etc.), and `.site-snap/` is a read-only snapshot. Override in new files instead.
2. **Never edit `client-provided/`.** It's the client's source material.
3. **All new CSS goes in one file:** `assets/css/components.css`, inside the section for the component you're working on. Don't create per-component CSS files.
4. **JS is per component, only if needed:** `assets/js/<component>.js` (e.g. `hero.js`, `image-grid.js`). No inline `<script>` blocks for component logic in variation pages.
5. **Every component has its own folder in `components/`, and every variation is its own page** in that folder. See README for the planned variation list per component.
6. **No new dependencies** unless the existing stack (Bootstrap 4.4.1, jQuery 3.4.1, Lottie 5.6.5, lazysizes) can't do the job. Stop and ask before adding one; never add a CDN link.
7. **Stay in your lane.** Components are split between developers. Only touch your component's folder, its JS file, and its section of `components.css`. Changes to the `Shared` CSS section, `_template.html`, or `full-page.html` should be small and called out in your summary.
8. Don't upgrade Bootstrap/jQuery or use Bootstrap 5 syntax (`data-bs-*`). This is Bootstrap 4: `data-toggle`, `data-target`, `.modal('show')`, etc.

## Components

| Folder | Mockup § | Root class | JS file |
|---|---|---|---|
| `components/01-hero/` | 1 + 2 (banner + optional below-hero, **one component**) | `.cmu-hero` | `hero.js` |
| `components/02-icon-cards/` | 3 | `.cmu-icon-cards` | — (homepage Lottie init covers it) |
| `components/03-modal-cards/` | 4 | `.cmu-modal-cards` | `modal-cards.js` |
| `components/04-two-column/` | 5 | `.cmu-two-col` | — |
| `components/05-image-grid/` | 6 | `.cmu-image-grid` | `image-grid.js` |

`components/full-page.html` assembles all of them in mockup order (it sits one level up, so its paths use `../` not `../../`). `index.html` at the repo root links every variation page.

## Building a variation page

- Planned variation pages already exist (scaffolded with a placeholder `<section class="cmu-…">` stub). Replace the stub inside `<main id="content">` with real markup; don't touch the rest of the shell.
- New variation: copy an existing page in the same folder (or `components/_template.html` — homepage shell: `body.home`, header, `<main id="content">`, footer, `#VideoModal`, homepage scripts) and add a link to it in the root `index.html`.
- If the shell must change, change `_template.html` and every variation page together.
- `components.css` loads **after** `style.css` and `home-styles-cmu.css`. Component JS loads **after** jQuery and Bootstrap.
- Name pages lowercase-kebab describing the configuration: `3-cards.html`, `maroon-text-only.html`, `image-popup-video--video-modal.html` (`--` separates combined options).
- Put realistic content from the mockup in pages (Formation District copy, images from the captured site), and include empty/optional-field states as their own variations.

## Reuse existing code before writing new

Look in the captured pages for existing markup before writing anything new:

| Need | Where it already exists |
|---|---|
| Banner (3 layouts) | `reference-pages/banner-image.html`, `banner-image-popup-video.html`, `banner-video-background.html` — `section.banner.tall-banner` |
| Video popup | `.video-popup` with `data-src` / `data-target="#VideoModal"` / `data-toggle="modal"`; `#VideoModal` at bottom of `homepage.html` |
| Pause background video when modal opens | `show.bs.modal` / `hidden.bs.modal` handlers in `banner-image-popup-video.html` |
| Circular "Picture yourself" badge | `homepage.html` `.scroll-down .scrolly` |
| Icon cards + Lottie | `homepage.html` `section.activities`, `.bodymovin.hover[data-icon]`, init script near the bottom |
| Value-circle + gradient + photo background | `css/home/home-styles-cmu.css` `#content section.cmunow` |
| Buttons | `.button-link`, `.button-link.yellow`, `.secondary-button`, `.secondary-button-dk` |
| Eyebrow text | `.small` (e.g. "Work hard, play hard") |
| SVG icons | inline sprite in each page, `<svg class="icon"><use xlink:href="#icon-…"/></svg>` |

Search tips: the captured HTML has lots of blank lines from Velocity templates. Use `grep -n` and `grep -v '^\s*$'` instead of reading whole files; `style.css` is ~545 KB, minified — split on `}` to search (`tr '}' '\n' < style.css | grep ...`).

## CSS conventions

- Prefix new classes with `cmu-` and use BEM-ish names: `.cmu-modal-cards`, `.cmu-modal-cards__card`, `.cmu-two-col--maroon`.
- Scope every rule under the component root class. Don't restyle global selectors (`h2`, `.button-link`, `#content section`).
- Use the site palette: maroon `#860037`, yellow `#FFD200`, charcoal `#262e2f`; gradient `#860037 → #3F0444 → #071944`. Heading font `pf-grand-gothik-variable`, body `"Nunito Sans"`.
- Keep `components.css` sections in this order with these headers so merges stay clean:
  ```css
  /* ==== Shared ==== */
  /* ==== 01 Hero ==== */
  /* ==== 02 Icon Cards ==== */
  /* ==== 03 Modal Cards ==== */
  /* ==== 04 Two Column ==== */
  /* ==== 05 Image Grid ==== */
  ```
- Mobile-first; verify at 576 / 768 / 992 / 1200px.

## JS conventions

- jQuery + Bootstrap 4 APIs; wrap in an IIFE; no globals. Each stub JS file already has this structure — fill in `init()`.
- Support **multiple instances per page** — iterate over every component root, never assume a single one. Generate unique IDs from the row/card index for modals and carousels.
- Only one `#VideoModal` exists per page; reuse it for YouTube popups rather than creating new video modals.
- Clean up YouTube iframes (clear `src`) on modal close / carousel slide-away so audio stops.

## Accessibility (required)

- Proper heading order (`h1` banner → `h2` component header → `h3` card titles).
- Interactive elements are `<a>` or `<button>`, keyboard-operable, with visible focus.
- Modals/lightbox: focus in on open, returned to trigger on close, Esc closes, arrow keys navigate the image grid.
- Alt text on all content images; decorative images `alt=""` or CSS backgrounds.
- Honour `prefers-reduced-motion`.

## Verifying your work

```bash
python3 -m http.server 8000   # from repo root, then open http://localhost:8000/ (variation index)
```

Before finishing, check every variation page of your component: renders without console errors, matches `mockup.jpg`, works at all breakpoints and by keyboard. In your summary, say which variations you checked and anything you couldn't verify.

## Git

- No branching: commit directly to `master`. Pull before you start and before you push — both developers share `master` and the single `components.css`.
- Keep commits scoped to your component where possible.
- Don't commit `.DS_Store` or `.site-snap/screenshots/` (already gitignored).
