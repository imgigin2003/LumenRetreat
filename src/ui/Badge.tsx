import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Tone = 'amber' | 'teal' | 'slate' | 'red' | 'green';

const tones: Record<Tone, string> = {
  amber: 'bg-gold-400/12 text-gold-300 ring-gold-400/25',
  teal: 'bg-teal-400/12 text-teal-300 ring-teal-400/25',
  slate: 'bg-line/10 text-content-soft ring-line/20',
  red: 'bg-red-500/12 text-red-300 ring-red-500/25',
  green: 'bg-emerald-500/12 text-emerald-300 ring-emerald-500/25',
};

export function Badge({
  children,
  tone = 'slate',
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
