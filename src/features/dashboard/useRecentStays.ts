import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '@/services/apiBookings';
import { isoDaysFromNow } from '@/utils/helpers';

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = Number(searchParams.get('last')) || 30;
  const queryDate = isoDaysFromNow(-numDays);

  const { isLoading, data: stays, error } = useQuery({
    queryKey: ['stays', 'recent', numDays],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  // Confirmed = anything that actually happened (not still unconfirmed).
  const confirmedStays = stays?.filter(
    (stay) => stay.status === 'checked-in' || stay.status === 'checked-out',
  );

  return { isLoading, stays, confirmedStays, error, numDays };
}
