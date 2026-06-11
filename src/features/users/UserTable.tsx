import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { InitialsAvatar } from "@/components/InitialsAvatar";
import { StatusBadge } from "@/components/StatusBadge";
import { TeamBadges } from "@/components/TeamBadges";
import { Button } from "@/components/ui/button";
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
import { UserActionsMenu } from "./UserActionsMenu";
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
    // Fixed layout: column widths come from the header row, so they stay
    // identical across pages regardless of cell content.
    <Table className="min-w-2xl table-fixed">
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
            className="w-44"
          >
            <Button variant="ghost" size="sm" className="-ml-2.5" onClick={onToggleSort}>
              User
              <SortIcon className={cn(nameSort === null && "text-muted-foreground")} />
            </Button>
          </TableHead>
          <TableHead className="w-36">Phone</TableHead>
          <TableHead className="w-44">Teams</TableHead>
          <TableHead className="w-16">Role</TableHead>
          <TableHead className="w-24">Status</TableHead>
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
                  <div className="min-w-0 flex-1">
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
                <UserActionsMenu
                  user={user}
                  onEdit={onEdit}
                  onToggleStatus={onToggleStatus}
                  onDelete={onDelete}
                />
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
