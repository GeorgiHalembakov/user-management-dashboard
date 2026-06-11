import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Ellipsis,
  Pencil,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react";

import { InitialsAvatar } from "@/components/InitialsAvatar";
import { StatusBadge } from "@/components/StatusBadge";
import { TeamBadges } from "@/components/TeamBadges";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user";
import type { NameSortDirection } from "./user-filters";

interface UserTableProps {
  users: User[];
  nameSort: NameSortDirection | null;
  onToggleSort: () => void;
  onEdit: (user: User) => void;
  onToggleStatus: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserTable({
  users,
  nameSort,
  onToggleSort,
  onEdit,
  onToggleStatus,
  onDelete,
}: UserTableProps) {
  const SortIcon =
    nameSort === "asc" ? ArrowUp : nameSort === "desc" ? ArrowDown : ArrowUpDown;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            aria-sort={
              nameSort === "asc"
                ? "ascending"
                : nameSort === "desc"
                  ? "descending"
                  : "none"
            }
          >
            <Button variant="ghost" size="sm" className="-ml-2.5" onClick={onToggleSort}>
              User
              <SortIcon className={cn(nameSort === null && "text-muted-foreground")} />
            </Button>
          </TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Teams</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-12">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          const fullName = `${user.firstName} ${user.lastName}`;
          return (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <InitialsAvatar user={user} />
                  <div className="min-w-0 max-w-56">
                    <TruncatedText text={fullName} className="font-medium" />
                    <TruncatedText
                      text={user.email}
                      className="text-xs text-muted-foreground"
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{user.phone}</TableCell>
              <TableCell>
                <TeamBadges teams={user.teams} />
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <StatusBadge status={user.status} />
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Actions for ${fullName}`}
                    >
                      <Ellipsis />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem onSelect={() => onEdit(user)}>
                      <Pencil />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onToggleStatus(user)}>
                      {user.status === "Active" ? <UserX /> : <UserCheck />}
                      {user.status === "Active" ? "Deactivate" : "Activate"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onSelect={() => onDelete(user)}>
                      <Trash2 />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function TruncatedText({ text, className }: { text: string; className?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <p className={cn("truncate", className)}>{text}</p>
      </TooltipTrigger>
      <TooltipContent className="break-all">{text}</TooltipContent>
    </Tooltip>
  );
}
