import { cn } from '@/utils/cn';

export function Logo({
  size = 'md',
  showWordmark = true,
  className,
}: {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  className?: string;
}) {
  const dim = size === 'sm' ? 28 : size === 'lg' ? 44 : 34;
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span
        className="relative grid place-items-center rounded-xl bg-gradient-to-br from-gold-400/25 to-teal-500/20 ring-1 ring-line/10"
        style={{ width: dim, height: dim }}
      >
        <svg viewBox="0 0 32 32" width={dim * 0.62} height={dim * 0.62} fill="none">
          <path
            d="M16 6 L25 14 V25 H7 V14 Z"
            fill="none"
            stroke="#D9A648"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M13 25 V18 H19 V25"
            fill="none"
            stroke="#3FB89E"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="9.5" r="1.2" fill="#ECD39D" />
        </svg>
      </span>
      {showWordmark && (
        <div className="leading-none">
          <span
            className={cn(
              'block font-display font-semibold tracking-tight text-content',
              size === 'lg' ? 'text-xl' : 'text-lg',
            )}
          >
            Lumen
          </span>
          <span className="block text-[10px] font-medium uppercase tracking-[0.24em] text-gold-400/80">
            Retreat
          </span>
        </div>
      )}
    </div>
  );
}
