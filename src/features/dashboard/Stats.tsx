import { Briefcase, Banknote, CalendarCheck, BarChart3 } from 'lucide-react';
import { Stat } from './Stat';
import { formatCurrency } from '@/utils/helpers';
import type { Booking } from '@/types/database.types';

interface StatsProps {
  bookings: { total_price: number }[];
  confirmedStays: Booking[];
  numDays: number;
  cabinCount: number;
}

export function Stats({ bookings, confirmedStays, numDays, cabinCount }: StatsProps) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, b) => acc + b.total_price, 0);
  const checkins = confirmedStays.length;

  // Occupancy = nights actually booked / nights available in the window.
  const occupiedNights = confirmedStays.reduce((acc, s) => acc + s.num_nights, 0);
  const availableNights = numDays * Math.max(cabinCount, 1);
  const occupancy = Math.round((occupiedNights / availableNights) * 100);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Stat label="Bookings" value={numBookings} icon={Briefcase} tone="amber" index={0} />
      <Stat
        label="Revenue"
        value={sales}
        icon={Banknote}
        tone="emerald"
        format={formatCurrency}
        index={1}
      />
      <Stat label="Check-ins" value={checkins} icon={CalendarCheck} tone="sky" index={2} />
      <Stat
        label="Occupancy rate"
        value={occupancy}
        icon={BarChart3}
        tone="violet"
        format={(n) => `${Math.round(n)}%`}
        index={3}
      />
    </div>
  );
}
