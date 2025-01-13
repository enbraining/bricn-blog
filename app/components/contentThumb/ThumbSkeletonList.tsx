import { LongThumbSkeleton } from "../skeleton/LongSkeleton";
import { ShortThumbSkeleton } from "../skeleton/ShortSkeleton";

export function ThumbSkeletonList() {
  return (
    <div className="grid">
      <ShortThumbSkeleton />
      <LongThumbSkeleton />
      <ShortThumbSkeleton />
      <ShortThumbSkeleton />
      <LongThumbSkeleton />
    </div>
  )
}
