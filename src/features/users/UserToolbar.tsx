import { useEffect, useState } from "react";
import { Plus, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Role, Status } from "@/types/user";
import { TeamMultiSelect } from "./TeamMultiSelect";
import { EMPTY_FILTERS, isAnyFilterActive, type UserFilters } from "./user-filters";

const SEARCH_DEBOUNCE_MS = 250;

interface UserToolbarProps {
  filters: UserFilters;
  onFiltersChange: (filters: UserFilters) => void;
  onAddUser: () => void;
}

export function UserToolbar({ filters, onFiltersChange, onAddUser }: UserToolbarProps) {
  const [query, setQuery] = useState(filters.search);

  // Keep the input in sync when filters change externally (e.g. Clear filters).
  useEffect(() => setQuery(filters.search), [filters.search]);

  useEffect(() => {
    if (query === filters.search) return;
    const timer = setTimeout(
      () => onFiltersChange({ ...filters, search: query }),
      SEARCH_DEBOUNCE_MS
    );
    return () => clearTimeout(timer);
  }, [query, filters, onFiltersChange]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <InputGroup className="w-full md:max-w-64">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          type="text"
          placeholder="Search by name or email"
          aria-label="Search users by name or email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query !== "" && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              aria-label="Clear search"
              onClick={() => onFiltersChange({ ...filters, search: "" })}
            >
              <X />
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>

      <TeamMultiSelect
        selected={filters.teams}
        onChange={(teams) => onFiltersChange({ ...filters, teams })}
        triggerLabel={
          filters.teams.length > 0 ? `Teams (${filters.teams.length})` : "Teams"
        }
      />

      <Select
        value={filters.status}
        onValueChange={(v) => onFiltersChange({ ...filters, status: v as Status | "All" })}
      >
        <SelectTrigger aria-label="Filter by status">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All statuses</SelectItem>
          <SelectItem value="Active">Active</SelectItem>
          <SelectItem value="Inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.role}
        onValueChange={(v) => onFiltersChange({ ...filters, role: v as Role | "All" })}
      >
        <SelectTrigger aria-label="Filter by role">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All roles</SelectItem>
          <SelectItem value="Admin">Admin</SelectItem>
          <SelectItem value="User">User</SelectItem>
        </SelectContent>
      </Select>

      {isAnyFilterActive(filters) && (
        <Button variant="ghost" onClick={() => onFiltersChange(EMPTY_FILTERS)}>
          <X />
          Clear filters
        </Button>
      )}

      <Button
        className="ml-auto"
        onClick={(e) => {
          // macOS browsers don't focus buttons on click; focus explicitly so
          // the dialog's focus trap can return focus here on close.
          e.currentTarget.focus();
          onAddUser();
        }}
      >
        <Plus />
        Add User
      </Button>
    </div>
  );
}
