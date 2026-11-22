# AI Usage Disclosure

## Tools used

- **OpenCode agent (model: Big Pickle)** — implementation, refactoring, CSS, test automation and documentation during this session.
- **Windows OCR (`Windows.Media.Ocr` via Python `winsdk`)** — used to extract exact text from Figma frame renders.
- **Python `pypdf`** — used to read both supplied PDF assignments.
- The starter project already disclosed ChatGPT usage; that scaffolding was retained and then substantially revised.

## Representative prompts

1. *Master development prompt:* “Act as a Senior Frontend Engineer… complete the FocusBoard assessment in the existing project; read both PDFs, inspect Figma, implement CRUD, carousel, filters, persistence, responsive design and documentation, then run and test locally.”
2. “Extract every mandatory requirement and the evaluation rubric from the two FocusBoard PDFs and create a development checklist.”
3. “Inspect the existing FocusBoard project and preserve working functionality while refactoring App.jsx into reusable components.”
4. “Reconstruct the exact Focus Notes slide copy and layout from the Figma frames; replace the illustrative starter text.”
5. “Write and run a headless Chrome test script that verifies CRUD, search/filter composition, carousel navigation, localStorage and responsive widths.”

## AI-assisted areas

- Refactoring the starter into `TaskCard`, `ConfirmDialog`, `MobileNav`, `focusNotes.js`, `taskHelpers.js` and an improved storage hook.
- Rebuilding `index.css` around colours, copy and positions extracted from the Figma frames.
- Implementing validation, keyboard handling, focus management and accessible dialog semantics.
- Automating browser verification with Puppeteer Core installed outside the project (not a project dependency).
- Writing this disclosure, `README.md` and `CHECKLISTS.md`.

## Verified, corrected or rejected suggestions

- The starter's Focus Notes copy (“Make space for deep work”, etc.) was explicitly marked as illustrative in `AI_USAGE.md`/`README.md`. It was **rejected** and replaced with the exact Figma text: *Make today count.* / *Small steps, big progress.* / *Celebrate the wins.* and their supporting lines.
- The starter's native `window.confirm()` deletion flow was **replaced** with an accessible `ConfirmDialog` supporting keyboard cancellation and focus management.
- An initial assumption that Figma frames could be inspected visually was corrected: the model could not view images, so frame text and positions were extracted via Figma public renders plus OCR rather than claimed visual inspection.

## Candidate responsibility

Review the generated code, confirm the design against Figma directly in a browser, run `npm run dev` and `npm run build`, and add the hosted URL and GitHub URL before submitting. All AI-assisted code has been exercised by the automated checks recorded in `README.md`.
