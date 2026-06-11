Task: build the real users table and toolbar, replacing the <pre> count in the success state. Scope:

1. components/InitialsAvatar.tsx — img when photo is set (with onError fallback to initials), otherwise a colored circle with first+last initials. Deterministic background color derived from user id. alt = full name.

2. components/StatusBadge.tsx — Active/Inactive badge using semantic tokens (no raw colors). Must not rely on color alone: include the text label.

3. components/TeamBadges.tsx — renders up to 2 team badges; if more, a "+N" badge whose tooltip lists the remaining teams. Test against user u07 (5 teams).

4. features/users/UserToolbar.tsx:
   - search input filtering by first name, last name, or email; debounced 250ms; with a clear (×) affordance
   - team multi-select using Popover + Command + Checkbox, button label shows "Teams" or "Teams (2)"
   - status Select: All / Active / Inactive
   - role Select: All / Admin / User
   - primary "Add User" button on the right — for now it only calls a prop onAddUser (no dialog yet)
   - "Clear filters" button visible only when any filter is active

5. features/users/UserTable.tsx — columns: User (avatar + full name stacked over email), Phone, Teams, Role, Status, Actions. Rules:
   - filtering is derived state (useMemo) in UsersTab, not stored in the reducer
   - name/email cells: truncate with ellipsis + tooltip showing the full value; max column widths so user u03 cannot break the layout
   - Actions: one DropdownMenu (⋯ icon button, aria-label "Actions for {name}") with items Edit, Activate/Deactivate (label depends on current status), Delete (destructive styling). All three just call props for now — no dialogs, no mutations.
   - default sort: createdAt desc. Clickable sort on the User column header (asc/desc) with aria-sort.

6. Pagination: client-side, 10/page, "Showing X–Y of Z" count, Prev/Next + page numbers. Filtering resets to page 1.

7. Empty state: when filters match nothing — icon, "No users match your filters", and a Clear filters action. Distinct from the (already built) loading and error states.

Definition of done: tsc --noEmit and npm run build pass; verify in the browser that (a) u03's long name/email truncate with tooltip, (b) u07 shows 2 badges + "+3", (c) searching "doe" shows both John Does as distinct rows, (d) combining team+status filters works and resets pagination, (e) empty state appears for a garbage search and Clear filters recovers. Zero console warnings.

Commit as: feat: add users table with search, filters, and pagination
Do NOT build: dialogs, forms, delete confirmation, responsive card layout, bulk selection. Those are separate tasks.