import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate } from '@/services/apiBookings';
import { isoDaysFromNow } from '@/utils/helpers';

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = Number(searchParams.get('last')) || 30;
  const queryDate = isoDaysFromNow(-numDays);

  const { isLoading, data: bookings, error } = useQuery({
    queryKey: ['bookings', 'recent', numDays],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { isLoading, bookings, error, numDays };
}
