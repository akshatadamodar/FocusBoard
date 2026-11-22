# FocusBoard Development & Design Checklists

Prepared after reading both official PDFs and inspecting the live Figma file (metadata, frame renders and OCR-extracted copy/positions on 2026-11-22).

## Development checklist — mandatory requirements

- [x] Existing React + Vite project inspected; dependencies reused (React 18, Vite 6, lucide-react).
- [x] Both PDFs read in full; official rubric extracted (100 marks).
- [x] Figma frames inspected through Figma public frame renders; exact copy and positions extracted.
- [x] Reusable component structure maintained/extended (no monolithic App.jsx).
- [x] At least six sample tasks with id/title/description/category/status/priority/dueDate.
- [x] Create task form with validation (title, status, priority, due date) and trimming.
- [x] Edit task through the same form; original id preserved.
- [x] Delete task with accessible custom confirmation dialog (Confirm / Cancel).
- [x] Status changes through an accessible select control for all three statuses.
- [x] Case-insensitive partial title search.
- [x] Status tabs (All / To do / In progress / Completed) and priority filter.
- [x] Search + status + priority filters compose together; reset control and empty state.
- [x] Four statistics derived from task state; zero-task safe.
- [x] Three-slide Focus Notes carousel with prev/next, indicators and direct navigation.
- [x] localStorage under `focusboard_tasks`, invalid JSON handled, sample data only on first run.
- [x] Responsive layouts at 1440px, 768px and 390px; no horizontal overflow.
- [x] Semantic markup, labels, focus indicators, keyboard-operable dialog and carousel.
- [x] Responsive sidebar drawer with working header toggle/backdrop/nav close and responsive profile.
- [x] Every navigation item and the profile give visible feedback (scroll or notice).
- [x] Documentation: README.md and AI_USAGE.md.
- [x] Desktop and mobile screenshots captured.
- [x] `npm run build` passes and local dev server verified.
- [ ] GitHub publication and Vercel deployment (user approval required).

## Design checklist — extracted from the official Figma frames

### Desktop frame (1440 x 1000)
- White sidebar (~240px) with FocusBoard brand, nav: Overview, My tasks (active), Calendar, Settings.
- White topbar with `Workspace` breadcrumb and a purple `New task` button at the right.
- Main background `#f6f7fb`; page heading `Your work, in focus.` with subtitle
  `Plan your day. Stay organized, and celebrate small wins.`
- Purple gradient Focus Notes card (`#5b4ee4` → `#6458ef`) with `FOCUS NOTES 01 | 03`,
  large slide title, supporting line and a small task preview on the right.
- Four white statistic cards: Total tasks, In progress, Completed, Completion rate.
- `My tasks` section with `View all tasks` action, search field, status tabs and priority filter.
- White task rows/cards with checkbox, title, description, category, priority badge,
  status control, due date and edit/delete actions.

### Mobile frame (390 x 1128)
- Compact top bar with FocusBoard brand.
- Heading `Your work, in focus.`; subtitle `Stay organized and keep moving forward.`
- Purple greeting card: `GOOD AFTERNOON`, `Make today count`, `3 tasks waiting for your attention.`
- `Overview` heading, three compact statistic cards.
- `My tasks` / `Your priorities for this week`, `Search tasks...` field, status tabs.
- Stacked task cards with title, subtitle, category/priority badges and due date.
- Fixed bottom navigation: Overview, My tasks, Calendar, Settings.

### Create-task form frame (760 x 822)
- White modal on `#ededf7` backdrop, close icon top right.
- `Create new task` + `Add your task details to stay on top of your work.`
- Task title (placeholder `e.g. Update pricing page`), Description
  (`Add notes about this task...`), Status (`To do`), Due date, Priority (`Medium`).
- `* Required field` note; `Cancel` and purple `Create task` buttons.

### Focus Notes slides (1106 x 152 each)
1. `FOCUS NOTES 01 | 03` — `Make today count.` — `A little focus goes a long way.` — preview: `Design landing page`.
2. `FOCUS NOTES 02 | 03` — `Small steps, big progress.` — `Keep your priorities in view.` — preview: `PROGRESS` / `Fix navigation`.
3. `FOCUS NOTES 03 | 03` — `Celebrate the wins.` — `Every completed task moves you forward.` — preview: `Onboarding copy` / `100%`.

### Visual tokens
- Background `#f6f7fb`, surfaces `#ffffff`, primary purple `#6156ed`,
  gradient `#5b4ee4` → `#6458ef`, soft lavender `#f0eeff`, borders `#ececf5`,
  muted text `#8a8a9e`, dark text `#202033`, 12–16px radii, subtle shadows.
