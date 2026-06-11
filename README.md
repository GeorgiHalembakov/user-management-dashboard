# User Management Dashboard

Admin prototype rebuilt from a deliberately flawed AI-generated wireframe: audit the flaws, fix them, ship a polished accessible mock — with heavy AI leverage, documented.

**Live demo:** https://YOUR-APP.vercel.app

**Stack:** Vite · React 18 · TypeScript (strict) · Tailwind v4 · shadcn/ui (Radix, Nova preset) · react-hook-form + zod · sonner

45 mock users behind a fake API with 600 ms latency (so loading states are real). All fetching, filtering, and mutations are client-side via a single `useReducer` — no backend, no global state library.

---

## UX Audit

### Data integrity
- **Corrupted enum values** (Status "Nlow"/"Stow"; roles that don't match the Admin/User spec). Fixed with strict TS unions and zod enums — invalid values are unrepresentable in both the data model and the form.
- **Duplicate "John Doe" rows with no identity model.** All records carry a stable `id`; keys, mutations, and focus restoration are id-based. The mock data includes two distinct John Does to prove it.
- **Mixed EN/DE button labels.** Single locale; the language menu is an honest placeholder rather than fake i18n.

### Interaction consistency
- **Three different action patterns in one column.** Replaced with a single "⋯" menu (`aria-label="Actions for {name}"`): Edit / Activate–Deactivate / Delete — shared between desktop table and mobile cards.
- **No Add User button — the screen's primary action was missing.** Added as the toolbar's primary button.
- **No Delete, no safety pattern.** Delete = confirmation dialog naming the user + 10 s Undo toast restoring the exact record (same id, same sort position). Confirmation prevents slips; undo forgives late regrets. Deactivate intentionally has *no* confirmation — it's self-reversible, and blanket friction is its own flaw.

### The edit modal
- **Wrong data in fields** ("John Doe" in First Name, placeholder-as-value). Edit pre-fills from the record via `reset(user)`.
- **Color-only error indication** (red border, no message — WCAG 1.4.1 fail). Every field renders a text error linked via `aria-describedby` + `aria-invalid`; first invalid field gets focus on submit.
- **Modal clipped mid-form, no footer, no close affordance.** Internal scroll with `max-h`; explicit Cancel/Save; Esc/backdrop close — but a dirty form raises "Discard changes?" instead of silently dropping input.
- **Dead photo placeholder.** Optional Photo URL with initials-avatar fallback (also covers broken image URLs via `onError`).

### Table scalability & states
- **No search, sort, or pagination.** Debounced search (name/email), sortable User column with `aria-sort`, teams/status/role filters, 10-per-page pagination with result count. Filters reset to page 1; deleting the last row of a page snaps back instead of stranding the user.
- **No loading / empty / error states.** All three exist: skeleton rows, error panel with working Retry, and a filter-empty state with its own "Clear filters" — intentionally duplicated from the toolbar so recovery is at the point of failure.
- **Unhandled overflow.** Name/email truncate with full-value tooltips (stress-tested with a 95-char email); teams show 2 badges + focusable "+N" with tooltip (stress-tested with a 5-team user).
- **Meaningless ☒ photo boxes.** Photos where available; deterministic initials avatars otherwise.

### Navigation, layout, responsiveness
- **Two competing navigation systems** (sidebar "Users" vs tab bar, no hierarchy). Resolved: sidebar = product areas, tabs = sections within Users; out-of-scope areas are explicitly marked "soon" instead of silently dead.
- **Tab bar clipped at the viewport edge.** Tabs scroll horizontally with Radix roving keyboard focus; verified at 375 px.
- **No responsive strategy.** Below `md` the table becomes stacked cards via a pure CSS switch (`hidden md:block` / `md:hidden`) — no resize listeners, hydration-safe, and a11y-safe because `display:none` removes the hidden duplicate from the accessibility tree and tab order. Touch targets padded to 44 px hit areas (WCAG 2.5.8).

### Accessibility (cross-cutting)
Dialogs trap focus and return it to their trigger — including controlled dialogs with no Radix trigger, and the responsive case where each user has two action buttons in the DOM (visible one resolved via `offsetParent`). Status never relies on color alone. Labels, menus, and sort headers carry correct ARIA. Verified keyboard-only at desktop and mobile widths.

---

## Design decisions

- **shadcn/Radix over custom styling or a traditional library:** the prototype is dialog/menu-heavy, and Radix supplies audited focus and ARIA behavior that would cost days to hand-roll — while the component code stays in-repo and editable. Within a 4-hour, accessibility-graded brief, that's correctness per hour.
- **Radix over Base UI:** shadcn supports both; Base UI has momentum, Radix has maturity and far deeper AI-training-data coverage — fewer hallucinated APIs when generating under time pressure. I'd re-evaluate Base UI for greenfield production work.
- **Nova preset** for information density appropriate to an admin table.
- **Derived state:** filtering/sorting/pagination are pure functions in `useMemo`; the reducer stores only the source list, so mutations can't desync a stored filtered copy.
- **Accepted at prototype scale:** single ~500 kB chunk (production: lazy-load dialogs/tabs), no virtualization (production: server-side pagination first), copied shadcn components don't auto-receive upstream fixes.

---

## AI Process

Built end-to-end with **Claude Code**, with chat Claude as planner. Two mechanisms kept it controlled:

1. **`CLAUDE.md` in the repo root** — architecture, ten non-negotiable UX requirements (each mapping to a wireframe flaw), conventions, and an explicit out-of-scope list. Every session started constrained.
2. **Phase-scoped prompts** — each with a definition of done and a "do NOT build" list, producing atomic commits: data states → table/toolbar → form dialog → delete flow → responsive pass → app shell. The git history mirrors the phases. Prompts are in [`docs/ai-process/`](docs/ai-process/).

The agent verified its own work in a headless browser (Playwright against the dev server) instead of trusting `tsc` and the build — and caught real bugs in its own first implementations:

- the dirty-form guard silently failing (react-hook-form's `formState` is a tracking proxy; `isDirty` must be read during render to subscribe),
- focus not returning to the trigger on dialog close (controlled dialog + macOS Chrome click-focus quirk),
- the mobile drawer autofocusing a tooltip-bearing item, so the first Esc dismissed the tooltip instead of the drawer.

It also caught a zod v3→v4 API mismatch in human-written schema code and committed the fix separately to keep feature commits clean.

---

## Running locally

```bash
npm install
npm run dev   # http://localhost:5173
```

No env vars, no backend.
