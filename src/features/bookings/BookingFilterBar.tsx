import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Select } from '@/ui/Select';
import { cn } from '@/utils/cn';

const STATUS_TABS = [
  { value: 'all', label: 'All' },
  { value: 'unconfirmed', label: 'Unconfirmed' },
  { value: 'checked-in', label: 'Checked in' },
  { value: 'checked-out', label: 'Checked out' },
];

const SORT_OPTIONS = [
  { value: 'start_date-desc', label: 'Date (recent first)' },
  { value: 'start_date-asc', label: 'Date (earliest first)' },
  { value: 'total_price-desc', label: 'Amount (high–low)' },
  { value: 'total_price-asc', label: 'Amount (low–high)' },
];

export function BookingFilterBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status') || 'all';
  const sortBy = searchParams.get('sortBy') || 'start_date-desc';

  function setStatus(value: string) {
    searchParams.set('status', value);
    searchParams.set('page', '1');
    setSearchParams(searchParams, { replace: true });
  }

  function setSort(value: string) {
    searchParams.set('sortBy', value);
    setSearchParams(searchParams, { replace: true });
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="no-scrollbar inline-flex items-center gap-1 overflow-x-auto rounded-xl border border-line/10 bg-surface/70 p-1">
        {STATUS_TABS.map((tab) => {
          const active = status === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setStatus(tab.value)}
              className={cn(
                'btn-focus relative whitespace-nowrap rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors',
                active ? 'text-content' : 'text-content-soft hover:text-content',
              )}
            >
              {active && (
                <motion.span
                  layoutId="booking-status-tab"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-gold-400/18 to-teal-500/8 ring-1 ring-inset ring-gold-400/25"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="w-full sm:w-56">
        <Select
          options={SORT_OPTIONS}
          value={sortBy}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort bookings"
        />
      </div>
    </div>
  );
}
