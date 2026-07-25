import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DASHBOARD_RANGES } from '@/utils/constants';
import { cn } from '@/utils/cn';

export function DashboardFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const current = Number(searchParams.get('last')) || 30;

  function handleSelect(value: number) {
    searchParams.set('last', String(value));
    setSearchParams(searchParams, { replace: true });
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-xl border border-line/10 bg-surface/70 p-1">
      {DASHBOARD_RANGES.map(({ value, label }) => {
        const active = current === value;
        return (
          <button
            key={value}
            onClick={() => handleSelect(value)}
            className={cn(
              'btn-focus relative rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm',
              active ? 'text-ink' : 'text-content-soft hover:text-content',
            )}
          >
            {active && (
              <motion.span
                layoutId="dash-range"
                className="absolute inset-0 rounded-lg bg-gradient-to-b from-gold-400 to-gold-500"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
