import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, LogOut } from 'lucide-react';
import { useTodayActivity } from './useTodayActivity';
import { useCheckout } from '@/features/bookings/useCheckout';
import { Button } from '@/ui/Button';
import { Badge } from '@/ui/Badge';
import { Skeleton } from '@/ui/Skeleton';
import { ErrorState } from '@/ui/ErrorState';
import type { BookingWithRelations } from '@/types/database.types';

export function TodayActivity() {
  const { activities, isLoading, error } = useTodayActivity();

  return (
    <div className="glass flex h-full flex-col p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-content">Today</h2>
          <p className="text-sm text-content-muted">Arrivals &amp; departures</p>
        </div>
      </div>

      {isLoading && <ActivitySkeleton />}
      {error && <ErrorState description="Couldn’t load today’s activity." />}

      {!isLoading && !error && activities && activities.length === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center gap-1 py-12 text-center">
          <p className="text-sm font-medium text-content-soft">No activity today</p>
          <p className="text-xs text-content-muted">No guests arriving or departing.</p>
        </div>
      )}

      {!isLoading && !error && activities && activities.length > 0 && (
        <ul className="flex flex-col gap-2 overflow-y-auto">
          {activities.map((activity, i) => (
            <ActivityItem key={activity.id} activity={activity} index={i} />
          ))}
        </ul>
      )}
    </div>
  );
}

function ActivityItem({ activity, index }: { activity: BookingWithRelations; index: number }) {
  const navigate = useNavigate();
  const { checkout, isPending } = useCheckout();
  const isArrival = activity.status === 'unconfirmed';
  const guest = activity.guests;

  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-3 rounded-xl border border-line/8 bg-surface-raised/30 p-3"
    >
      <span className="text-xl">{guest?.country_flag ?? '🏳️'}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-content">{guest?.full_name ?? 'Guest'}</p>
        <p className="text-xs text-content-muted">
          {activity.num_nights} {activity.num_nights === 1 ? 'night' : 'nights'} ·{' '}
          {activity.num_guests} {activity.num_guests === 1 ? 'guest' : 'guests'}
        </p>
      </div>

      <Badge tone={isArrival ? 'teal' : 'amber'}>
        {isArrival ? 'Arriving' : 'Departing'}
      </Badge>

      {isArrival ? (
        <Button size="sm" variant="secondary" onClick={() => navigate(`/bookings/${activity.id}`)}>
          <LogIn className="h-3.5 w-3.5" /> Check in
        </Button>
      ) : (
        <Button
          size="sm"
          variant="secondary"
          loading={isPending}
          onClick={() => checkout(activity.id)}
        >
          <LogOut className="h-3.5 w-3.5" /> Check out
        </Button>
      )}
    </motion.li>
  );
}

function ActivitySkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl bg-surface-raised/20 p-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-2/5" />
            <Skeleton className="h-2.5 w-1/4" />
          </div>
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      ))}
    </div>
  );
}
