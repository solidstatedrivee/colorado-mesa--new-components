# QA

Internal developer QA for the components. Client feedback is tracked separately in the PM tool, not here.

This folder holds **notes only**. Test and fix the real pages in `components/`; never copy pages in here.

## Process

1. **Swap components:** whoever didn't build a component tests it. Fill in the table at the top of its file.
2. **Check:** go through the shared checks and the component checks on every row of the page. Tick what passes.
3. **Log:** add each problem to the file's Issues table with a number, severity and status `open`.
4. **Fix:** the builder fixes it in the component's own files and references the issue in the commit message, e.g. `Image Grid: fix focus return (QA #3)`. Set status `fixed` and add the commit hash.
5. **Verify:** the tester re-checks and sets `verified`.
6. **Sign off:** when there are no open **blocker** or **major** issues, set Result to `Passed` and change the component's status in the root README table from `QA` to `Done`. Minor issues can stay open with a note.
7. **Full page last:** run `full-page.md` after all five components pass, then deploy to the server for the client.

## Status

| Component | File | Result |
|---|---|---|
| 01 Hero | [01-hero.md](01-hero.md) | In progress: 2 issues |
| 02 Icon Cards | [02-icon-cards.md](02-icon-cards.md) | In progress: no issues |
| 03 Modal Cards | [03-modal-cards.md](03-modal-cards.md) | In progress: no issues |
| 04 Two Column | [04-two-column.md](04-two-column.md) | In progress: no issues |
| 05 Image Grid | [05-image-grid.md](05-image-grid.md) | In progress: 1 issue |
| Full page | [full-page.md](full-page.md) | In progress: no issues |

New component? Start its file from [_checklist.md](_checklist.md).
