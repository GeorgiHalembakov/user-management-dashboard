import { InitialsAvatar } from "@/components/InitialsAvatar";
import { StatusBadge } from "@/components/StatusBadge";
import { TeamBadges } from "@/components/TeamBadges";
import type { User } from "@/types/user";
import { UserActionsMenu } from "./UserActionsMenu";

interface UserCardListProps {
  users: User[];
  onEdit: (user: User) => void;
  onToggleStatus: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserCardList({
  users,
  onEdit,
  onToggleStatus,
  onDelete,
}: UserCardListProps) {
  return (
    <ul className="flex flex-col divide-y">
      {users.map((user) => (
        <li key={user.id} className="flex flex-col gap-2 p-3">
          <div className="flex items-start gap-3">
            <InitialsAvatar user={user} />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">
                {user.firstName} {user.lastName}
              </p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>
            <StatusBadge status={user.status} />
            <UserActionsMenu
              user={user}
              onEdit={onEdit}
              onToggleStatus={onToggleStatus}
              onDelete={onDelete}
            />
          </div>
          <TeamBadges teams={user.teams} />
          <p className="text-sm text-muted-foreground">
            {user.role} · {user.phone}
          </p>
        </li>
      ))}
    </ul>
  );
}
