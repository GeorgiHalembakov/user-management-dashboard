import type { Role, Status, Team, User } from "@/types/user";

export type NameSortDirection = "asc" | "desc";

export interface UserFilters {
  search: string;
  teams: Team[];
  status: Status | "All";
  role: Role | "All";
}

export const EMPTY_FILTERS: UserFilters = {
  search: "",
  teams: [],
  status: "All",
  role: "All",
};

export function isAnyFilterActive(filters: UserFilters): boolean {
  return (
    filters.search !== "" ||
    filters.teams.length > 0 ||
    filters.status !== "All" ||
    filters.role !== "All"
  );
}

export function filterUsers(users: User[], filters: UserFilters): User[] {
  const query = filters.search.trim().toLowerCase();

  return users.filter((user) => {
    if (query) {
      const haystack =
        `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    if (
      filters.teams.length > 0 &&
      !user.teams.some((team) => filters.teams.includes(team))
    ) {
      return false;
    }
    if (filters.status !== "All" && user.status !== filters.status) return false;
    if (filters.role !== "All" && user.role !== filters.role) return false;
    return true;
  });
}

export function sortUsers(
  users: User[],
  nameSort: NameSortDirection | null
): User[] {
  const sorted = [...users];
  if (nameSort === null) {
    // Default: newest first; id tiebreak keeps equal dates stable.
    sorted.sort(
      (a, b) =>
        b.createdAt.localeCompare(a.createdAt) || a.id.localeCompare(b.id)
    );
  } else {
    const direction = nameSort === "asc" ? 1 : -1;
    sorted.sort(
      (a, b) =>
        direction *
        `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`
        )
    );
  }
  return sorted;
}
