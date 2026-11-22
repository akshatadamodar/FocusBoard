# FocusBoard

A responsive, frontend-only task dashboard built for the company's Trainee Assessment. The app is a single-page React application: tasks are created, edited, deleted and re-statused locally, and every change is persisted in the browser.

## Project overview

FocusBoard reproduces the official Figma dashboard reference with working interactions rather than a static mock-up. It includes a desktop sidebar, a mobile bottom navigation, dynamic overview statistics, a three-slide Focus Notes carousel, search, combined status/priority filters and a reusable create/edit form.

## Technology stack

- React 18 (function components + hooks)
- Vite 6
- JavaScript ES6+
- HTML5 + CSS3 with media queries
- Lucide React icons
- Browser `localStorage`
- Node.js v22.23.1 / npm 10.9.8 used locally (existing installation reused)

No backend, authentication, cloud database or third-party task API is used.

## Key features

- 13 meaningful sample tasks on first launch (unique id, title, description, category, status, priority, due date).
- Create task with required-field validation, whitespace trimming and immediate dashboard update.
- Edit task through the same form, preserving the original id.
- Delete task through an accessible confirmation dialog with Confirm / Cancel.
- Direct status changes (`To do`, `In progress`, `Completed`) from every task row.
- Case-insensitive, partial title search.
- Status tabs and priority filter that compose with search; reset control and empty state.
- Four derived statistics: total, in progress, completed and completion percentage (zero-task safe).
- Three-slide Focus Notes carousel with previous/next, circular navigation and direct indicators.
- Persistence of the complete task dataset under the `focusboard_tasks` key.
- Responsive layouts at 1440px, 768px and 390px, plus intermediate widths.
- Sidebar drawer that opens/closes from the header toggle, close button, backdrop or any navigation choice; header toggle becomes an X and moves clear of the drawer on mobile.
- All four navigation items and the workspace profile respond visibly: Overview/My tasks scroll to their sections; Calendar/Settings and the profile show an accessible notice explaining the assessment scope.
- Semantic landmarks, labelled fields, visible focus styles, keyboard-operable dialogs and carousel controls.

## Folder structure

```
focusboard/
  public/
    favicon.svg
  screenshots/
    desktop-dashboard.png
    mobile-dashboard.png
  src/
    assets/
    components/
      App.css            # legacy placeholder (styles live in index.css)
      ConfirmDialog.jsx
      FilterTabs.jsx
      FocusNotes.jsx
      Header.jsx
      MobileNav.jsx
      NoticeDialog.jsx
      SearchBar.jsx
      Sidebar.jsx
      StatCard.jsx
      TaskCard.jsx
      TaskForm.jsx
      TaskList.jsx
    data/
      focusNotes.js      # exact Figma slide copy
      sampleTasks.js     # first-run task data
    hooks/
      useLocalStorage.js
    utils/
      taskHelpers.js
    App.jsx
    index.css
    main.jsx
  CHECKLISTS.md
  AI_USAGE.md
  index.html
  package.json
  package-lock.json
  vite.config.js
```

## Installation and local execution

Dependencies were already present in the provided project, so no reinstall was necessary. For a fresh machine:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally <http://localhost:5173/>. During verification the server ran at <http://127.0.0.1:5173/>.

## Build and preview

```bash
npm run build
npm run preview
```

The production output is written to `dist/` (build verified successfully).

## State management

`App.jsx` owns a single `tasks` state value through the custom `useLocalStorage` hook; this is the single source of truth. All mutations are immutable:

- add → prepend a new object with a generated id (`crypto.randomUUID` with numeric fallback);
- edit → `map` and replace only the matching id;
- delete → `filter` out the matching id;
- status → `map` and change only the `status` field.

Derived values are never stored separately: `calculateStats` and `getVisibleTasks` are memoised with `useMemo` and recompute from `tasks`, `search`, `status` and `priority`. Carousel state is local `useState` inside `FocusNotes`. UI state (modals, drawer, active navigation) is kept in `App.jsx` with `useState`.

## CRUD implementation

The create and edit flows share `TaskForm.jsx`. It validates title, status, priority and due date, rejects empty or whitespace-only titles, trims text, and shows inline error messages. Save closes the form and immediately updates the list and statistics. Delete uses `ConfirmDialog.jsx`; cancelling leaves the task untouched.

## Search and filtering

`getVisibleTasks` applies all three conditions together: lowercased partial title match, selected status tab and selected priority. The status tabs show a live count, the priority filter is a labelled select, and a Reset control clears search, status and priority at once. A helpful empty state appears when nothing matches.

## localStorage

`useLocalStorage('focusboard_tasks', sampleTasks, isValidTaskArray)` reads once on mount and writes on every change. Invalid JSON, invalid shapes and unavailable storage are handled safely. An empty saved array is respected rather than replaced by samples, so sample data is only used on a genuine first run. Filters are never persisted — only the full task dataset is saved.

## Design reference

The live Figma file was the visual source of truth. Frame data was obtained from Figma's public file metadata and rendered frame thumbnails; exact slide/UI copy and approximate element positions were extracted from those renders with OCR. The resulting copy, colour tokens and layout are recorded in `CHECKLISTS.md`. If you have direct visual access to Figma, do a final side-by-side comparison before submitting — small typography and spacing details are the most likely area for refinement.

## Testing performed

A real headless Chrome session was driven against the running Vite server:

- 29 functional checks passed (first launch, create, validation, cancel, edit, delete confirm/cancel, all status transitions, search, combined filters, reset, empty state, carousel next/indicators, refresh persistence, responsive widths 390/768/1440, no console errors).
- 14 edge-case checks passed (invalid JSON, invalid shape, empty dataset, zero stats, long titles, Escape key, previous carousel button, priority-only filter, widths 1024/600/360).
- 15 navigation checks passed at 390px (drawer open/toggle/close, backdrop close, all four nav items, profile, mobile bottom nav).
- `npm run build` completed with no errors.
- Screenshots were captured with Chrome at the exact requested viewport sizes.

## Deployment

Vercel / Netlify settings:

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

Add the live HTTPS URL here after deploying: `https://YOUR-DEPLOYMENT-URL`
Add the public GitHub repository URL here after publishing: `https://github.com/YOUR-USERNAME/focusboard`

## Known limitations

- Calendar and Settings are navigation placeholders: they show an accessible notice because those screens are not part of this assessment. Overview and My tasks scroll to the corresponding dashboard sections. The profile is a demo placeholder, not a real account screen.
- Data is local to one browser; there is no cloud sync, authentication or multi-user support.
- Exact font files from Figma were not available; the app uses DM Sans / Manrope as close, freely available substitutes.
- Focus Notes slide copy is exact, but decorative details were reconstructed from frame renders rather than a direct visual Figma inspection.
- GitHub publication and deployment are intentionally left for the user to approve and perform.
