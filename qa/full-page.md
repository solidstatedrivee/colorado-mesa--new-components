# QA · Full page

**Pages:**
- `components/full-page.html`

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

### Full page checks
- [x] Components appear in mockup order and match `mockup.jpg` as a whole
- [x] Spacing between sections looks right; no doubled or missing gaps
- [x] All component scripts run together without conflicts (hero, modal cards, image grid)
- [x] Every modal type on the page uses the right modal (single `#VideoModal` for videos) and none interfere
- [x] Heading order across the whole page makes sense
- [ ] Page performance is reasonable (Lighthouse), no huge images loaded up front

### Notes

**Automated pass, 2026-11-17 (Claude):** headless Chromium at 375 / 576 / 768 / 992 / 1200 / 1440px, plus WebKit (Safari's engine) at 375 / 1200px. Firefox couldn't launch in that environment.
Still needs a person: **Design** (side-by-side check of every row against the mockup), a **real phone**, real **Safari / Firefox / Edge / iOS Safari**, and the **Hosted** check.
- Compared with `mockup.jpg` at 1200px and 375px: same section order and treatment. The banner is the existing custom-page banner, as the spec says, not the mockup's title style.
- One of each modal type was opened on this page (hero video, card video, content modal, image viewer): each opened on top and closed, with no JS errors.
- The Performance (Lighthouse) item isn't ticked because Lighthouse wasn't run.

## Issues

Severity: **blocker** (broken / unusable), **major** (wrong vs spec or mockup, a11y failure), **minor** (polish).
Status: **open** → **fixed** (by the developer, with commit) → **verified** (by the tester).

| # | Row / variation | Breakpoint / browser | Issue | Severity | Status | Fix commit |
|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |
