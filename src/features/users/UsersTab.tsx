import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { CircleAlert, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchUsers } from "@/lib/mock-users";
import type { User } from "@/types/user";
import { UserTable } from "./UserTable";
import { UserToolbar } from "./UserToolbar";
import { UsersPagination } from "./UsersPagination";
import {
  EMPTY_FILTERS,
  filterUsers,
  sortUsers,
  type NameSortDirection,
  type UserFilters,
} from "./user-filters";

const PAGE_SIZE = 10;

interface UsersState {
  status: "loading" | "error" | "success";
  users: User[];
  error: string | null;
}

// Mutation actions (ADD_USER, UPDATE_USER, DELETE_USER, ...) will be added
// alongside the load actions; each maps to one case in the reducer.
type UsersAction =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; users: User[] }
  | { type: "LOAD_ERROR"; error: string };

const initialState: UsersState = {
  status: "loading",
  users: [],
  error: null,
};

function usersReducer(state: UsersState, action: UsersAction): UsersState {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, status: "loading", error: null };
    case "LOAD_SUCCESS":
      return { status: "success", users: action.users, error: null };
    case "LOAD_ERROR":
      return { ...state, status: "error", error: action.error };
  }
}

export function UsersTab() {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const [filters, setFilters] = useState<UserFilters>(EMPTY_FILTERS);
  const [nameSort, setNameSort] = useState<NameSortDirection | null>(null);
  const [page, setPage] = useState(1);

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

  // Add/Edit/Status/Delete dialogs are separate tasks; the wiring is in place.
  const handleAddUser = useCallback(() => {}, []);
  const handleEdit = useCallback((_user: User) => {}, []);
  const handleToggleStatus = useCallback((_user: User) => {}, []);
  const handleDelete = useCallback((_user: User) => {}, []);

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
            <UserTable
              users={pageUsers}
              nameSort={nameSort}
              onToggleSort={handleToggleSort}
              onEdit={handleEdit}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
            />
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
    </div>
  );
}

function UsersSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading users"
      className="overflow-hidden rounded-xl border"
    >
      {Array.from({ length: 10 }, (_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 border-b px-4 py-3 last:border-b-0"
        >
          <Skeleton className="size-9 shrink-0 rounded-full" />
          <Skeleton className="h-4 w-36" />
          <Skeleton className="hidden h-4 w-52 sm:block" />
          <Skeleton className="hidden h-4 w-28 md:block" />
          <Skeleton className="hidden h-5 w-24 rounded-full lg:block" />
          <Skeleton className="ml-auto size-8 shrink-0" />
        </div>
      ))}
    </div>
  );
}
