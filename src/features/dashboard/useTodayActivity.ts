import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '@/services/apiBookings';

export function useTodayActivity() {
  const { isLoading, data: activities, error } = useQuery({
    queryKey: ['activity', 'today'],
    queryFn: getStaysTodayActivity,
  });

  return { isLoading, activities, error };
}
