import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateBooking } from '@/services/apiBookings';

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending } = useMutation({
    mutationFn: (bookingId: string) =>
      updateBooking(bookingId, { status: 'checked-out' }),
    onSuccess: (data) => {
      toast.success(`Booking checked out`);
      // Refresh anything showing booking state.
      queryClient.invalidateQueries({ predicate: () => true });
      return data;
    },
    onError: () => toast.error('There was an error while checking out'),
  });

  return { checkout, isPending };
}
