import { CalendarX } from 'lucide-react';
import { BookingRow } from './BookingRow';
import { Skeleton } from '@/ui/Skeleton';
import { EmptyState } from '@/ui/EmptyState';
import { ErrorState } from '@/ui/ErrorState';
import { Pagination } from '@/ui/Pagination';
import { useBookings } from './useBookings';
import { useSearchParams } from 'react-router-dom';

export function BookingTable() {
  const { bookings, count, isLoading, error, page, pageSize } = useBookings();
  const [searchParams, setSearchParams] = useSearchParams();

  function setPage(p: number) {
    searchParams.set('page', String(p));
    setSearchParams(searchParams, { replace: true });
  }

  if (error) return <ErrorState description="Couldn’t load bookings." />;

  if (!isLoading && bookings.length === 0) {
    return (
      <EmptyState
        icon={CalendarX}
        title="No bookings found"
        description="Try a different status filter — or check back when guests start booking."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="glass overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="border-b border-line/10 text-left">
                <Th>Cabin</Th>
                <Th>Guest</Th>
                <Th>Dates</Th>
                <Th>Status</Th>
                <Th className="text-right">Amount</Th>
                <th className="w-12" />
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: pageSize }).map((_, i) => <RowSkeleton key={i} />)
                : bookings.map((b) => <BookingRow key={b.id} booking={b} />)}
            </tbody>
          </table>
        </div>
      </div>

      {!isLoading && (
        <Pagination page={page} pageSize={pageSize} count={count} onChange={setPage} />
      )}
    </div>
  );
}

function Th({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <th
      className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider text-content-muted ${className}`}
    >
      {children}
    </th>
  );
}

function RowSkeleton() {
  return (
    <tr className="border-b border-line/8 last:border-0">
      <td className="px-4 py-4">
        <Skeleton className="h-4 w-20" />
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-28" />
            <Skeleton className="h-2.5 w-36" />
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <Skeleton className="h-3.5 w-28" />
      </td>
      <td className="px-4 py-4">
        <Skeleton className="h-6 w-24 rounded-full" />
      </td>
      <td className="px-4 py-4 text-right">
        <Skeleton className="ml-auto h-4 w-16" />
      </td>
      <td className="px-4 py-4" />
    </tr>
  );
}
