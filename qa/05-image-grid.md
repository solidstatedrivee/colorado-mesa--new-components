# QA · 05 Image Grid

**Pages:**
- `components/05-image-grid/all-variations.html`

| Date | Browsers / devices | Result |
|---|---|---|
| 2026-11-17 | Chromium + WebKit, headless | In progress |

## Checklist

### Shared checks
- [ ] **Design:** matches `client-provided/mockup.jpg`; every row checked, including empty/optional-field rows
- [ ] **Responsive:** 576 / 768 / 992 / 1200px, plus a real phone
- [ ] **Browsers:** Chrome, Safari, Firefox, Edge, iOS Safari
- [x] **Console:** no errors, no 404s (Network tab)
- [ ] **Keyboard:** everything reachable with Tab, visible focus, Enter/Space activate, Esc closes pop-ups
- [x] **Screen reader / structure:** heading order (`h1` banner → `h2` → `h3`), alt text on content images, decorative images `alt=""`
- [x] **Reduced motion:** with `prefers-reduced-motion` on, nothing animates unexpectedly
- [x] **Automated:** axe or Lighthouse accessibility pass, no new issues
- [x] **Multiple instances:** IDs unique per row; each row works on its own
- [x] **Code rules (AGENTS.md):** `cmu-` prefixed and scoped CSS, no edits to captured files, no new dependencies, Bootstrap 4 syntax
- [ ] **Hosted:** works on our server, not only localhost (paths, YouTube embeds)

### Image Grid checks
- [x] Grid: 5 across from 992px, 3 from 576px, 1 column (4:3) below; incomplete last row lines up from the left
- [x] Hover overlay only with a mouse; no stuck overlay after a tap on touch devices
- [x] Clicking a thumbnail opens the full-screen viewer at that item
- [x] Prev/next buttons, arrow keys and swipe all work and wrap around
- [x] Counter and caption show by default; the "hidden" rows hide them (still announced to screen readers)
- [x] Clicking a video thumbnail plays it; arriving on a video by arrows/swipe shows a Play button, no sound until pressed
- [x] Video audio stops when moving to another slide or closing the viewer
- [ ] Tab stays inside the viewer; Esc closes; focus returns to the thumbnail
- [x] Large images load as reached (not all up front); long captions shrink the photo, never cover it

### Notes

**Automated pass, 2026-11-17 (Claude):** headless Chromium at 375 / 576 / 768 / 992 / 1200 / 1440px, plus WebKit (Safari's engine) at 375 / 1200px. Firefox couldn't launch in that environment.
Still needs a person: **Design** (side-by-side check of every row against the mockup), a **real phone**, real **Safari / Firefox / Edge / iOS Safari**, and the **Hosted** check.
- All 9 grids: open at the clicked item, arrow keys and prev/next buttons wrap, Tab stays inside, Esc closes and focus returns to the thumbnail (photo items).
- Swipe was tested with touch events in Chromium mobile emulation; still try it on a real phone.
- Only the current slide and its neighbours load full images (e.g. 3 of 10 on open).
- Keyboard and Tab-loop items are unticked because of issue 1.
- axe `landmark-unique` (moderate) only fires because rows on the test page repeat the same heading; `full-page.html` is clean.

## Issues

Severity: **blocker** (broken / unusable), **major** (wrong vs spec or mockup, a11y failure), **minor** (polish).
Status: **open** → **fixed** (by the developer, with commit) → **verified** (by the tester).

| # | Row / variation | Breakpoint / browser | Issue | Severity | Status | Fix commit |
|---|---|---|---|---|---|---|
| 1 | rows 7 & 9 (any row where a video opens from the keyboard) | Chromium 1200 | When a video opens from the keyboard, focus goes into the YouTube player (by design). From there Esc doesn't close the viewer and arrow keys don't change slides, because the cross-origin iframe swallows the keys; Shift+Tab is needed first. Confirm by hand in a real browser, then decide whether to keep focus on the viewer or document it | major (confirm) | open |  |
|   |   |   |   |   |   |   |
