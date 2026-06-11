import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Status } from "@/types/user";

export function StatusBadge({ status }: { status: Status }) {
  const active = status === "Active";

  return (
    <Badge
      variant="secondary"
      className={cn(active ? "bg-primary/10 text-primary" : "text-muted-foreground")}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" aria-hidden="true" />
      {status}
    </Badge>
  );
}
