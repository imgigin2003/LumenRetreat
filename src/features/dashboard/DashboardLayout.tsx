import { Suspense, lazy } from 'react';
import { Stats } from './Stats';
import { SalesChart } from './SalesChart';
import { DurationChart } from './DurationChart';
import { TodayActivity } from './TodayActivity';
import { DashboardFilter } from './DashboardFilter';
import { DashboardSkeleton } from './DashboardSkeleton';
import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';
import { useCabins } from '@/features/cabins/useCabins';
import { useUser } from '@/features/auth/useUser';
import { ErrorState } from '@/ui/ErrorState';

// Orb pulls in three — load it lazily so it never blocks the dashboard data.
const HeaderOrb = lazy(() =>
  import('@/three/HeaderOrb').then((m) => ({ default: m.HeaderOrb })),
);

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

export function DashboardLayout() {
  const { user } = useUser();
  const { bookings, isLoading: l1, error: e1 } = useRecentBookings();
  const { confirmedStays, isLoading: l2, error: e2, numDays } = useRecentStays();
  const { cabins, isLoading: l3, error: e3 } = useCabins();

  const firstName =
    ((user?.user_metadata?.full_name as string) || 'there').split(' ')[0];

  const header = (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <Suspense fallback={<div className="h-24 w-24" />}>
          <HeaderOrb className="-ml-2 hidden shrink-0 sm:block" />
        </Suspense>
        <div>
          <h1 className="text-2xl font-semibold text-content sm:text-[28px]">
            {greeting()}, {firstName}
          </h1>
          <p className="text-sm text-content-muted">Here’s how the retreat is glowing.</p>
        </div>
      </div>
      <DashboardFilter />
    </header>
  );

  if (l1 || l2 || l3) {
    return (
      <div className="space-y-6">
        {header}
        <DashboardSkeleton />
      </div>
    );
  }

  if (e1 || e2 || e3) {
    return (
      <div className="space-y-6">
        {header}
        <ErrorState
          title="Couldn’t load the dashboard"
          description="Check your Supabase connection and that the schema + seed have been run."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {header}

      <div className="space-y-5">
        <Stats
          bookings={bookings ?? []}
          confirmedStays={confirmedStays ?? []}
          numDays={numDays}
          cabinCount={cabins?.length ?? 0}
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <TodayActivity />
          <DurationChart confirmedStays={confirmedStays ?? []} />
        </div>

        <SalesChart bookings={bookings ?? []} numDays={numDays} />
      </div>
    </div>
  );
}
