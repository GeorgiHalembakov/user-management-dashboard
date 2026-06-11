import { Ellipsis, Pencil, Trash2, UserCheck, UserX } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/types/user";

interface UserActionsMenuProps {
  user: User;
  onEdit: (user: User) => void;
  onToggleStatus: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserActionsMenu({
  user,
  onEdit,
  onToggleStatus,
  onDelete,
}: UserActionsMenuProps) {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`Actions for ${fullName}`}
          data-actions-for={user.id}
          // The ::after overlay pads the touch target to ≥44px below md
          // without changing the visual size.
          className="relative max-md:after:absolute max-md:after:-inset-2"
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
  );
}
