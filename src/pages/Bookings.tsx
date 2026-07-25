import { PageTransition } from '@/ui/PageTransition';
import { PageHeader } from '@/ui/PageHeader';
import { BookingFilterBar } from '@/features/bookings/BookingFilterBar';
import { BookingTable } from '@/features/bookings/BookingTable';

export default function Bookings() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader title="Bookings" subtitle="Every arrival, stay and departure." />
        <BookingFilterBar />
        <BookingTable />
      </div>
    </PageTransition>
  );
}
