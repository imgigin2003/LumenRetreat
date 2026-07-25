import { cn } from '@/utils/cn';

/**
 * Graceful fallback shown if WebGL is unavailable (via the error boundary) or
 * while a 3D scene loads. A calm dusk gradient — no canvas required.
 */
export function CanvasFallback({ className, label }: { className?: string; label?: string }) {
  return (
    <div
      className={cn(
        'relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#1e2836] via-[#161d29] to-[#10151d]',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(58%_50%_at_30%_24%,rgba(230,192,120,0.14),transparent_60%),radial-gradient(50%_45%_at_82%_18%,rgba(63,184,158,0.11),transparent_55%)]" />
      {label && (
        <span className="relative text-xs font-medium tracking-[0.2em] text-content-soft/70">
          {label.toUpperCase()}
        </span>
      )}
    </div>
  );
}
