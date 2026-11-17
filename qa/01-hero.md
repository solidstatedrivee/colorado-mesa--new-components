# QA · 01 Hero

**Pages:**
- `components/01-hero/image--none.html`
- `components/01-hero/image--video-modal.html`
- `components/01-hero/image--link.html`
- `components/01-hero/image-popup-video--none.html`
- `components/01-hero/image-popup-video--video-modal.html`
- `components/01-hero/image-popup-video--link.html`
- `components/01-hero/video-background--none.html`
- `components/01-hero/video-background--video-modal.html`
- `components/01-hero/video-background--link.html`

| Date | Browsers / devices | Result |
|---|---|---|
| 2026-11-17 | Chromium + WebKit, headless | In progress |

## Checklist

### Shared checks
- [ ] **Design:** matches `client-provided/mockup.jpg`; every row checked, including empty/optional-field rows
- [ ] **Responsive:** 576 / 768 / 992 / 1200px, plus a real phone
- [ ] **Browsers:** Chrome, Safari, Firefox, Edge, iOS Safari
- [x] **Console:** no errors, no 404s (Network tab)
- [x] **Keyboard:** everything reachable with Tab, visible focus, Enter/Space activate, Esc closes pop-ups
- [x] **Screen reader / structure:** heading order (`h1` banner → `h2` → `h3`), alt text on content images, decorative images `alt=""`
- [x] **Reduced motion:** with `prefers-reduced-motion` on, nothing animates unexpectedly
- [x] **Automated:** axe or Lighthouse accessibility pass, no new issues
- [x] **Multiple instances:** IDs unique per row; each row works on its own
- [x] **Code rules (AGENTS.md):** `cmu-` prefixed and scoped CSS, no edits to captured files, no new dependencies, Bootstrap 4 syntax
- [ ] **Hosted:** works on our server, not only localhost (paths, YouTube embeds)

### Hero checks
- [x] Banner matches the existing custom-page banner in all 3 layouts (image, image + popup video, video background); no asset 404s
- [x] Banner options still work: logo, title, subtitle, intro, CTA, Custom HTML Block
- [x] "Watch Video" opens `#VideoModal`; video stops when the modal closes
- [ ] Background video pauses while any video modal is open and resumes on close
- [x] Below-hero overlaps the bottom of the banner; "Picture yourself" badge shows on desktop (≥992px) only
- [x] Below-hero **video** option: play icon over the image, opens `#VideoModal`
- [x] Below-hero **link** option: no play icon, caption + arrow bottom-left; external links open in a new tab
- [x] `--none` pages: no below-hero, no gap left behind
- [x] Below-hero copy fits the fixed-height area (no overflow) at every breakpoint

### Notes

**Automated pass, 2026-11-17 (Claude):** headless Chromium at 375 / 576 / 768 / 992 / 1200 / 1440px, plus WebKit (Safari's engine) at 375 / 1200px. Firefox couldn't launch in that environment.
Still needs a person: **Design** (side-by-side check of every row against the mockup), a **real phone**, real **Safari / Firefox / Edge / iOS Safari**, and the **Hosted** check.
- Video modals don't clear the iframe on close. The site's own `scripts.js` resets it to the URL without `autoplay`, which stops playback. Same behaviour as the live homepage.
- With reduced motion on, the site's `.button-link` hover transition and the badge's transition still run. Both come from captured site CSS, not component code.
- axe flags `landmark-unique` (moderate) on pages that repeat the same heading in several rows. This only happens on the test pages; `full-page.html` is clean.
- The tubular script loaded on the video-background pages is the captured site's own, not a new dependency.

## Issues

Severity: **blocker** (broken / unusable), **major** (wrong vs spec or mockup, a11y failure), **minor** (polish).
Status: **open** → **fixed** (by the developer, with commit) → **verified** (by the tester).

| # | Row / variation | Breakpoint / browser | Issue | Severity | Status | Fix commit |
|---|---|---|---|---|---|---|
| 1 | `image-popup-video--link`, `video-background--link` | all | Below-hero link goes to `../02-icon-cards/3-cards.html`, which no longer exists (404). Point it at `../02-icon-cards/all-variations.html` | major | open |  |
| 2 | `video-background--video-modal` | Chromium 1200 | Background video pauses when the video modal opens and resumes when it's closed with X or a click outside, but **not** with Esc (stays paused). Resume is tied to the `.tubular-play` click, not `hidden.bs.modal` | minor | open |  |
|   |   |   |   |   |   |   |
