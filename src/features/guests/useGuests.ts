import { useQuery } from '@tanstack/react-query';
import { getGuests, getGuestStayCounts } from '@/services/apiGuests';

export function useGuests(query: string) {
  const guestsQuery = useQuery({
    queryKey: ['guests', query],
    queryFn: () => getGuests(query),
    placeholderData: (prev) => prev,
  });

  const countsQuery = useQuery({
    queryKey: ['guest-stay-counts'],
    queryFn: getGuestStayCounts,
  });

  return {
    guests: guestsQuery.data ?? [],
    isLoading: guestsQuery.isLoading,
    error: guestsQuery.error,
    counts: countsQuery.data ?? {},
  };
}
