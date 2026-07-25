import { Check, CircleDot, LogIn, LogOut, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { formatDate } from '@/utils/helpers';
import type { BookingWithRelations } from '@/types/database.types';
import { cn } from '@/utils/cn';

interface Step {
  label: string;
  icon: LucideIcon;
  date?: string;
  done: boolean;
  current?: boolean;
}

export function StatusTimeline({ booking }: { booking: BookingWithRelations }) {
  const isCheckedIn = booking.status === 'checked-in';
  const isCheckedOut = booking.status === 'checked-out';

  const steps: Step[] = [
    { label: 'Booked', icon: Sparkles, date: formatDate(booking.created_at), done: true },
    {
      label: 'Checked in',
      icon: LogIn,
      date: formatDate(booking.start_date),
      done: isCheckedIn || isCheckedOut,
      current: isCheckedIn,
    },
    {
      label: 'Checked out',
      icon: LogOut,
      date: formatDate(booking.end_date),
      done: isCheckedOut,
      current: isCheckedOut,
    },
  ];

  return (
    <ol className="relative flex flex-col gap-6">
      {steps.map((step, i) => {
        const Icon = step.done ? (i === 0 ? Sparkles : Check) : step.icon;
        return (
          <li key={step.label} className="relative flex items-start gap-4">
            {i < steps.length - 1 && (
              <span
                className={cn(
                  'absolute left-[18px] top-9 h-[calc(100%+4px)] w-px',
                  step.done ? 'bg-gold-400/40' : 'bg-line/12',
                )}
              />
            )}
            <span
              className={cn(
                'relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full ring-1 transition-colors',
                step.done
                  ? 'bg-gold-400/15 text-gold-300 ring-gold-400/30'
                  : 'bg-surface-raised/60 text-content-muted ring-line/12',
                step.current && 'ring-2 ring-gold-400/50',
              )}
            >
              {step.done ? <Icon className="h-4 w-4" strokeWidth={2.5} /> : <CircleDot className="h-4 w-4" />}
            </span>
            <div className="pt-1.5">
              <p className={cn('text-sm font-medium', step.done ? 'text-content' : 'text-content-muted')}>
                {step.label}
              </p>
              {step.date && <p className="text-xs text-content-muted">{step.date}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
