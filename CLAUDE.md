# User Management Dashboard — Take-home Assignment

## Context
Take-home for a senior frontend role. Goal: fix a deliberately flawed AI-generated
wireframe and build a polished mock prototype. The README (UX audit + AI process)
is weighted higher than feature completeness. Hard time budget: ~4 hours total.

## Stack (fixed — do not substitute)
- Vite + React 18 + TypeScript (strict)
- Tailwind CSS + shadcn/ui (Radix primitives)
- react-hook-form + zod (@hookform/resolvers)
- No backend, no Redux. Local state only (useState/useReducer + props).
- No router needed — single page with Tabs.

## Existing files (do not regenerate, import them)
- `src/types/user.ts` — User type, Team union, ALL_TEAMS
- `src/lib/user-schema.ts` — zod schema + emptyUserFormValues
- `src/lib/mock-users.ts` — MOCK_USERS (45 users) + fetchUsers() with 600ms latency

## Architecture
- `App.tsx` → Tabs layout. Only "All Users" is functional; other tabs render a
  shared `PlaceholderTab` component ("Section out of scope for this prototype").
- `features/users/UsersTab.tsx` → owns users state (useReducer), loading/error,
  filters, pagination. Single source of truth.
- `features/users/UserTable.tsx` → presentational table.
- `features/users/UserToolbar.tsx` → search input (debounced 250ms), team
  multi-select, status select, "Add User" primary button.
- `features/users/UserFormDialog.tsx` → ONE dialog for Add and Edit (mode prop).
- `features/users/DeleteUserDialog.tsx` → Radix AlertDialog, names the user.
- `components/InitialsAvatar.tsx`, `components/TeamBadges.tsx` (show 2 + "+N"
  with tooltip), `components/StatusBadge.tsx`.

## Non-negotiable UX requirements (these fix the wireframe's flaws)
1. ONE consistent actions pattern per row: a "⋯" dropdown with Edit /
   Activate-Deactivate / Delete. Never mixed buttons.
2. Form errors: inline text messages below fields + red border + aria-invalid +
   aria-describedby. Never color-only.
3. Delete requires confirmation dialog that names the user; destructive button
   styling; focus lands on Cancel.
4. Loading skeleton rows, empty state (with "Clear filters" action), error state
   (with Retry) — all three must exist.
5. Client-side pagination, 10/page, with result count ("Showing 1–10 of 45").
6. Long text: truncate with ellipsis + title/tooltip. Test with user u03.
7. Initials avatar fallback when photo is null.
8. Keyboard: dialogs trap focus (Radix handles), Esc closes, table actions
   reachable by Tab. Visible focus rings.
9. Responsive: below `md`, table collapses to stacked cards (or hides low-priority
   columns: Phone, Teams → behind expand). Pick one, implement simply.
10. English only — no mixed-language strings.

## Conventions
- Atomic conventional commits: `feat:`, `fix:`, `docs:`, `chore:`. Commit after
  each working unit.
- Components < ~150 lines; extract when bigger.
- No `any`. No unused exports. Run `tsc --noEmit` before claiming done.

## Out of scope (do not build)
Auth, routing, backend/API, other tabs' content, i18n, dark mode, tests
(unless time remains), Storybook, drag-and-drop, photo upload (URL field only).
