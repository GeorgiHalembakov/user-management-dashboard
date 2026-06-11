Read CLAUDE.md first.

Task: build the application shell and the UsersTab data states. Scope strictly limited to:

1. App.tsx — full-page layout with a header (app title "User Management", right-aligned placeholder avatar) and the shadcn Tabs component with these tabs: All Users, Roles & Permissions, Security, Activity Logs, Invitations, Teams, Workplace Policies, Who's In. Tabs must scroll horizontally on overflow (no clipping). Only "All Users" has content; every other tab renders the shared PlaceholderTab.

2. components/PlaceholderTab.tsx — centered empty-state: icon, tab name, one line "This section is out of scope for this prototype."

3. features/users/UsersTab.tsx — owns all users state:
   - useReducer with actions: LOAD_START, LOAD_SUCCESS, LOAD_ERROR (mutation actions will come later, design the reducer so they're easy to add)
   - on mount, call fetchUsers() from @/lib/mock-users
   - loading state: render 10 skeleton rows shaped like the future table
   - error state: message + Retry button that re-fetches (test it by temporarily calling fetchUsers({ fail: true }), then revert)
   - success state: for now, render a plain <pre> count of loaded users — the real table is the next task, do NOT build it yet

Definition of done: tsc --noEmit passes, npm run dev renders all three states correctly, no console warnings. Commit as: feat: add tabbed layout and users data states