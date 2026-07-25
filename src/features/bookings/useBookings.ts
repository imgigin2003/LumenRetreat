import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookings } from '@/services/apiBookings';
import { PAGE_SIZE } from '@/utils/constants';
import type { BookingStatus } from '@/types/database.types';

export function useBookings() {
  const [searchParams] = useSearchParams();

  const status = (searchParams.get('status') as BookingStatus | 'all') || 'all';
  const [field, direction] = (searchParams.get('sortBy') || 'start_date-desc').split('-') as [
    string,
    'asc' | 'desc',
  ];
  const page = Number(searchParams.get('page')) || 1;

  const { isLoading, data, error } = useQuery({
    queryKey: ['bookings', 'list', status, field, direction, page],
    queryFn: () =>
      getBookings({
        status,
        sortBy: { field, direction },
        page,
        pageSize: PAGE_SIZE,
      }),
    placeholderData: (prev) => prev, // keep old rows while paginating
  });

  return {
    isLoading,
    error,
    bookings: data?.data ?? [],
    count: data?.count ?? 0,
    page,
    pageSize: PAGE_SIZE,
  };
}
