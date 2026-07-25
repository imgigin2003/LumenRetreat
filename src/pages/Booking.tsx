import { PageTransition } from '@/ui/PageTransition';
import { BookingDetail } from '@/features/bookings/BookingDetail';

export default function Booking() {
  return (
    <PageTransition>
      <BookingDetail />
    </PageTransition>
  );
}
