import { useState } from "react";

import { cn } from "@/lib/utils";
import type { User } from "@/types/user";

const AVATAR_TINTS = [
  "bg-chart-1/20",
  "bg-chart-2/20",
  "bg-chart-3/20",
  "bg-chart-4/20",
  "bg-chart-5/20",
];

function tintForId(id: string): string {
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) % 997;
  return AVATAR_TINTS[hash % AVATAR_TINTS.length];
}

interface InitialsAvatarProps {
  user: Pick<User, "id" | "firstName" | "lastName" | "photo">;
  className?: string;
}

export function InitialsAvatar({ user, className }: InitialsAvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const fullName = `${user.firstName} ${user.lastName}`;

  if (user.photo && !imageFailed) {
    return (
      <img
        src={user.photo}
        alt={fullName}
        onError={() => setImageFailed(true)}
        className={cn("size-9 shrink-0 rounded-full object-cover", className)}
      />
    );
  }

  const initials = `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase();

  return (
    <span
      role="img"
      aria-label={fullName}
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-foreground",
        tintForId(user.id),
        className
      )}
    >
      {initials}
    </span>
  );
}
