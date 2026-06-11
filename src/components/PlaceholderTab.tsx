import { Inbox } from "lucide-react";

interface PlaceholderTabProps {
  name: string;
}

export function PlaceholderTab({ name }: PlaceholderTabProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-24 text-center">
      <Inbox className="size-10 text-muted-foreground" aria-hidden="true" />
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-sm text-muted-foreground">
        This section is out of scope for this prototype.
      </p>
    </div>
  );
}
