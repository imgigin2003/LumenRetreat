import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Eye, LogIn, LogOut, Trash2 } from 'lucide-react';
import { Dropdown, DropdownItem } from '@/ui/Dropdown';
import { ConfirmDialog } from '@/ui/ConfirmDialog';
import { StatusBadge } from './StatusBadge';
import { useCheckout } from './useCheckout';
import { useDeleteBooking } from './useDeleteBooking';
import { formatCurrency, formatDateShort, formatDistanceFromNow } from '@/utils/helpers';
import { CABIN_CATEGORY_META } from '@/utils/constants';
import type { BookingWithRelations } from '@/types/database.types';

export function BookingRow({ booking }: { booking: BookingWithRelations }) {
  const navigate = useNavigate();
  const { checkout } = useCheckout();
  const { deleteBooking, isPending: deleting } = useDeleteBooking();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const cabin = booking.cabins;
  const guest = booking.guests;
  const cat = cabin ? CABIN_CATEGORY_META[cabin.category] : null;

  return (
    <>
      <tr
        onClick={() => navigate(`/bookings/${booking.id}`)}
        className="group cursor-pointer border-b border-line/8 transition-colors last:border-0 hover:bg-surface-raised/30"
      >
        {/* Cabin */}
        <td className="px-4 py-3.5">
          <div className="flex items-center gap-2">
            <span className="font-display text-base font-medium text-content">{cabin?.name ?? '—'}</span>
            {cat && <span className={`text-xs ${cat.color}`}>{cat.label}</span>}
          </div>
        </td>

        {/* Guest */}
        <td className="px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">{guest?.country_flag ?? '🏳️'}</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-content">{guest?.full_name ?? 'Guest'}</p>
              <p className="truncate text-xs text-content-muted">{guest?.email}</p>
            </div>
          </div>
        </td>

        {/* Dates */}
        <td className="px-4 py-3.5">
          <p className="text-sm text-content-soft">
            {formatDateShort(booking.start_date)} → {formatDateShort(booking.end_date)}
          </p>
          <p className="text-xs text-content-muted">
            {formatDistanceFromNow(booking.start_date)} · {booking.num_nights} nights
          </p>
        </td>

        {/* Status */}
        <td className="px-4 py-3.5">
          <StatusBadge status={booking.status} />
        </td>

        {/* Amount */}
        <td className="px-4 py-3.5 text-right">
          <span className="font-medium text-content">{formatCurrency(booking.total_price)}</span>
        </td>

        {/* Actions */}
        <td className="px-2 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-end">
            <Dropdown trigger={<MoreVertical className="h-4 w-4" />}>
              <DropdownItem icon={Eye} onClick={() => navigate(`/bookings/${booking.id}`)}>
                See details
              </DropdownItem>
              {booking.status === 'unconfirmed' && (
                <DropdownItem icon={LogIn} onClick={() => navigate(`/bookings/${booking.id}`)}>
                  Check in
                </DropdownItem>
              )}
              {booking.status === 'checked-in' && (
                <DropdownItem icon={LogOut} onClick={() => checkout(booking.id)}>
                  Check out
                </DropdownItem>
              )}
              <DropdownItem icon={Trash2} danger onClick={() => setConfirmOpen(true)}>
                Delete
              </DropdownItem>
            </Dropdown>
          </div>
        </td>
      </tr>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => deleteBooking(booking.id, { onSettled: () => setConfirmOpen(false) })}
        title="Delete booking?"
        description={`This permanently removes the booking for ${guest?.full_name ?? 'this guest'}. This can’t be undone.`}
        confirmLabel="Delete"
        loading={deleting}
        danger
      />
    </>
  );
}
