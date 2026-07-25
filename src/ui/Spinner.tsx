import { cn } from '@/utils/cn';

export function Spinner({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-2 border-line/10" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-gold-400" />
      </div>
    </div>
  );
}

export function FullPageSpinner() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <Spinner />
    </div>
  );
}
