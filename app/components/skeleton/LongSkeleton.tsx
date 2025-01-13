import { Skeleton } from "../ui/skeleton";

export function LongThumbSkeleton() {
  return (
    <div className="space-y-2 my-3">
        <Skeleton className="h-5 w-[420px]" />
        <Skeleton className="h-5 w-[320px]" />
    </div>
  )
}
