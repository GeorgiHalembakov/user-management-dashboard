import { Skeleton } from "@/components/ui/skeleton";

export function UsersSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading users"
      className="overflow-hidden rounded-xl border"
    >
      {Array.from({ length: 10 }, (_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 border-b px-4 py-3 last:border-b-0"
        >
          <Skeleton className="size-9 shrink-0 rounded-full" />
          <Skeleton className="h-4 w-36" />
          <Skeleton className="hidden h-4 w-52 sm:block" />
          <Skeleton className="hidden h-4 w-28 md:block" />
          <Skeleton className="hidden h-5 w-24 rounded-full lg:block" />
          <Skeleton className="ml-auto size-8 shrink-0" />
        </div>
      ))}
    </div>
  );
}
