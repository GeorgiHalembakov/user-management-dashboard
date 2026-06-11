Task: Add/Edit user dialog with validated form, wired to real mutations. Scope:

1. Reducer: add ADD_USER, UPDATE_USER cases (DELETE comes later). ADD generates id via crypto.randomUUID() and createdAt = today.

2. features/users/UserFormDialog.tsx — ONE component for both modes:
   - props: open, onOpenChange, user?: User (present = edit mode, absent = add mode)
   - title: "Add user" / "Edit {firstName} {lastName}"
   - react-hook-form + zodResolver(userFormSchema) from @/lib/user-schema; mode: "onTouched"
   - fields: First name, Last name (side by side, stacking on small widths), Email, Phone, Teams (same Popover+Command multi-select pattern as the toolbar — selected teams shown as removable badges under the trigger), Role (Select), Status (Select), Photo URL (optional, with helper text "Leave empty to use initials")
   - every field: <Label htmlFor>, error message rendered as text below the field, aria-invalid and aria-describedby pointing at the error id. Red border AND text message — never color alone.
   - footer: Cancel (ghost) + Save changes/Add user (primary). Primary disabled while submitting.
   - on valid submit: dispatch, close, toast "User added"/"Changes saved" (add shadcn sonner for toasts)
   - dialog content: max-h with internal scroll so it can never clip off-screen; no data loss on accidental backdrop click — if the form is dirty, backdrop/Esc triggers a lightweight "Discard changes?" AlertDialog instead of silently closing
   - edit mode pre-fills via form reset(user) when the dialog opens; add mode resets to emptyUserFormValues

3. Wire-up in UsersTab: Add User button opens add mode; row action Edit opens edit mode with that user. New users should appear in the table immediately (they will, via the reducer — verify sorting puts them first given createdAt desc).

Definition of done: tsc + build pass. Browser checks: (1) submitting an empty add form shows text error messages on every required field and focuses the first invalid field; (2) typing an invalid email shows the zod message with aria-describedby correctly linked; (3) editing u03 pre-fills all fields including 5+ teams; (4) saving an edit updates the row in place; (5) adding a user lands them at the top of the default sort with a toast; (6) dirty form + Esc → discard confirmation, clean form + Esc → closes immediately; (7) focus is trapped in the dialog and returns to the triggering button on close. Zero console warnings.

Commit as: feat: add user form dialog with validation
Do NOT build: delete flow, responsive table, bulk actions.