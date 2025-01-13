import { Skeleton } from "../ui/skeleton";

export function ShortThumbSkeleton() {
  return (
    <div className="space-y-2 my-3">
        <Skeleton className="h-5 w-[250px]" />
        <Skeleton className="h-5 w-[200px]" />
    </div>
  )
}
