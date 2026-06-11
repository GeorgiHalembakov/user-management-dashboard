import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { CircleAlert, SearchX } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { fetchUsers } from "@/lib/mock-users";
import type { UserFormValues } from "@/lib/user-schema";
import type { Status, User } from "@/types/user";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { UserCardList } from "./UserCardList";
import { UserFormDialog } from "./UserFormDialog";
import { UserTable } from "./UserTable";
import { UserToolbar } from "./UserToolbar";
import { UsersPagination } from "./UsersPagination";
import { UsersSkeleton } from "./UsersSkeleton";
import { initialUsersState, usersReducer } from "./users-reducer";
import {
  EMPTY_FILTERS,
  filterUsers,
  sortUsers,
  type NameSortDirection,
  type UserFilters,
} from "./user-filters";

const PAGE_SIZE = 10;

export function UsersTab() {
  const [state, dispatch] = useReducer(usersReducer, initialUsersState);
  const [filters, setFilters] = useState<UserFilters>(EMPTY_FILTERS);
  const [nameSort, setNameSort] = useState<NameSortDirection | null>(null);
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const load = useCallback(async () => {
    dispatch({ type: "LOAD_START" });
    try {
      const users = await fetchUsers();
      dispatch({ type: "LOAD_SUCCESS", users });
    } catch (err) {
      dispatch({
        type: "LOAD_ERROR",
        error: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const handleFiltersChange = useCallback((next: UserFilters) => {
    setFilters(next);
    setPage(1);
  }, []);

  const handleToggleSort = useCallback(() => {
    setNameSort((d) => (d === "asc" ? "desc" : "asc"));
  }, []);

  const handleAddUser = useCallback(() => {
    setEditingUser(undefined);
    setDialogOpen(true);
  }, []);

  const handleEdit = useCallback((user: User) => {
    setEditingUser(user);
    setDialogOpen(true);
  }, []);

  const handleFormSubmit = useCallback(
    (values: UserFormValues) => {
      if (editingUser) {
        dispatch({ type: "UPDATE_USER", user: { ...editingUser, ...values } });
        toast("Changes saved");
      } else {
        dispatch({
          type: "ADD_USER",
          user: {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString().slice(0, 10),
            ...values,
          },
        });
        toast("User added");
      }
    },
    [editingUser]
  );

  const handleToggleStatus = useCallback((user: User) => {
    const status: Status = user.status === "Active" ? "Inactive" : "Active";
    dispatch({ type: "UPDATE_USER", user: { ...user, status } });
    toast(status === "Active" ? "User activated" : "User deactivated");
  }, []);

  const handleDelete = useCallback((user: User) => setDeletingUser(user), []);

  const handleConfirmDelete = useCallback((user: User) => {
    dispatch({ type: "DELETE_USER", id: user.id });
    setDeletingUser(null);
    toast("User deleted", {
      duration: 10_000,
      action: {
        // Re-adds the original object, so id and createdAt are preserved.
        label: "Undo",
        onClick: () => dispatch({ type: "ADD_USER", user }),
      },
    });
  }, []);

  const visibleUsers = useMemo(
    () => sortUsers(filterUsers(state.users, filters), nameSort),
    [state.users, filters, nameSort]
  );

  const pageCount = Math.max(1, Math.ceil(visibleUsers.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageUsers = visibleUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  if (state.status === "loading") return <UsersSkeleton />;

  if (state.status === "error") {
    return (
      <div
        role="alert"
        className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-16 text-center"
      >
        <CircleAlert className="size-8 text-destructive" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">{state.error}</p>
        <Button variant="outline" onClick={() => void load()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <UserToolbar
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onAddUser={handleAddUser}
      />
      {visibleUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-16 text-center">
          <SearchX className="size-8 text-muted-foreground" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">No users match your filters</p>
          <Button variant="outline" onClick={() => handleFiltersChange(EMPTY_FILTERS)}>
            Clear filters
          </Button>
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border">
            <div className="hidden md:block">
              <UserTable
                users={pageUsers}
                nameSort={nameSort}
                onToggleSort={handleToggleSort}
                onEdit={handleEdit}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDelete}
              />
            </div>
            <div className="md:hidden">
              <UserCardList
                users={pageUsers}
                onEdit={handleEdit}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDelete}
              />
            </div>
          </div>
          <UsersPagination
            page={currentPage}
            pageCount={pageCount}
            totalCount={visibleUsers.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </>
      )}
      <UserFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        user={editingUser}
        onSubmit={handleFormSubmit}
      />
      <DeleteUserDialog
        user={deletingUser}
        onOpenChange={(open) => {
          if (!open) setDeletingUser(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
