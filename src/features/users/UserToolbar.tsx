import { useEffect, useState } from "react";
import { ChevronDown, Plus, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ALL_TEAMS, type Role, type Status, type Team } from "@/types/user";
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

  const toggleTeam = (team: Team) => {
    const teams = filters.teams.includes(team)
      ? filters.teams.filter((t) => t !== team)
      : [...filters.teams, team];
    onFiltersChange({ ...filters, teams });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <InputGroup className="w-full max-w-64">
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

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {filters.teams.length > 0 ? `Teams (${filters.teams.length})` : "Teams"}
            <ChevronDown className="text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-0" align="start">
          <Command>
            <CommandList>
              <CommandGroup>
                {ALL_TEAMS.map((team) => (
                  <CommandItem key={team} onSelect={() => toggleTeam(team)}>
                    <Checkbox
                      checked={filters.teams.includes(team)}
                      tabIndex={-1}
                      className="pointer-events-none"
                    />
                    {team}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

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

      <Button onClick={onAddUser} className="ml-auto">
        <Plus />
        Add User
      </Button>
    </div>
  );
}
