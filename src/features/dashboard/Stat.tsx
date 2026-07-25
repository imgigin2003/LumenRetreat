import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedNumber } from '@/ui/AnimatedNumber';
import { cn } from '@/utils/cn';

export type StatTone = 'amber' | 'emerald' | 'sky' | 'violet';

/** Soft pastel circular icon badges — one tint per metric (see reference). */
const tones: Record<StatTone, { badge: string; icon: string; glow: string }> = {
  amber: {
    badge: 'bg-amber-400/12 ring-amber-400/25',
    icon: 'text-amber-300',
    glow: 'group-hover:shadow-[0_0_40px_-8px_rgb(251_191_36/0.35)]',
  },
  emerald: {
    badge: 'bg-emerald-400/12 ring-emerald-400/25',
    icon: 'text-emerald-300',
    glow: 'group-hover:shadow-[0_0_40px_-8px_rgb(52_211_153/0.35)]',
  },
  sky: {
    badge: 'bg-sky-400/12 ring-sky-400/25',
    icon: 'text-sky-300',
    glow: 'group-hover:shadow-[0_0_40px_-8px_rgb(56_189_248/0.35)]',
  },
  violet: {
    badge: 'bg-violet-400/12 ring-violet-400/25',
    icon: 'text-violet-300',
    glow: 'group-hover:shadow-[0_0_40px_-8px_rgb(167_139_250/0.35)]',
  },
};

export function Stat({
  label,
  value,
  icon: Icon,
  tone,
  format,
  index = 0,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  tone: StatTone;
  format?: (n: number) => string;
  index?: number;
}) {
  const t = tones[tone];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn('glass glass-hover group flex items-center gap-4 p-5', t.glow)}
    >
      <span
        className={cn(
          'grid h-14 w-14 shrink-0 place-items-center rounded-2xl ring-1 ring-inset transition-transform duration-300 group-hover:scale-105',
          t.badge,
        )}
      >
        <Icon className={cn('h-6 w-6', t.icon)} strokeWidth={1.9} />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-content-muted">
          {label}
        </p>
        <AnimatedNumber
          value={value}
          format={format}
          className="mt-0.5 block font-display text-[28px] font-semibold leading-none text-content"
        />
      </div>
    </motion.div>
  );
}
