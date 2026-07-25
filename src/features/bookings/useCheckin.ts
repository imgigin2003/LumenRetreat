import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { updateBooking } from '@/services/apiBookings';
import type { Booking } from '@/types/database.types';

interface CheckinArgs {
  bookingId: string;
  breakfast?: Partial<Booking>; // has_breakfast, extras_price, total_price
}

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending } = useMutation({
    mutationFn: ({ bookingId, breakfast }: CheckinArgs) =>
      updateBooking(bookingId, { status: 'checked-in', is_paid: true, ...breakfast }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked in`);
      queryClient.invalidateQueries({ predicate: () => true });
      navigate('/bookings');
    },
    onError: () => toast.error('There was an error while checking in'),
  });

  return { checkin, isPending };
}
