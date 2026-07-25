import { cn } from '@/utils/cn';

/** Shimmer skeleton block. Compose several to mirror your content layout. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('skeleton', className)} />;
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2.5', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-3.5"
          // last line is shorter for a natural paragraph feel
        />
      ))}
    </div>
  );
}
