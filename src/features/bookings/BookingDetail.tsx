import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  LogOut,
  Trash2,
  Coffee,
  CheckCircle2,
  XCircle,
  Moon,
  Users,
  Mail,
  Home,
} from 'lucide-react';
import { useBooking } from './useBooking';
import { useCheckin } from './useCheckin';
import { useCheckout } from './useCheckout';
import { useDeleteBooking } from './useDeleteBooking';
import { useSettings } from '@/features/settings/useSettings';
import { StatusBadge } from './StatusBadge';
import { StatusTimeline } from './StatusTimeline';
import { Button } from '@/ui/Button';
import { Checkbox } from '@/ui/Checkbox';
import { Skeleton } from '@/ui/Skeleton';
import { ErrorState } from '@/ui/ErrorState';
import { ConfirmDialog } from '@/ui/ConfirmDialog';
import { CABIN_CATEGORY_META } from '@/utils/constants';
import { formatCurrency, formatDate } from '@/utils/helpers';
import { cn } from '@/utils/cn';

export function BookingDetail() {
  const navigate = useNavigate();
  const { booking, isLoading, error } = useBooking();
  const { settings } = useSettings();
  const { checkin, isPending: checkingIn } = useCheckin();
  const { checkout, isPending: checkingOut } = useCheckout();
  const { deleteBooking, isPending: deleting } = useDeleteBooking();

  const [addBreakfast, setAddBreakfast] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (isLoading) return <DetailSkeleton />;
  if (error || !booking)
    return (
      <div className="space-y-6">
        <BackButton />
        <ErrorState title="Booking not found" description="This booking may have been deleted." />
      </div>
    );

  const guest = booking.guests;
  const cabin = booking.cabins;
  const cat = cabin ? CABIN_CATEGORY_META[cabin.category] : null;

  const breakfastPrice =
    (settings?.breakfast_price ?? 0) * booking.num_nights * booking.num_guests;

  function handleCheckin() {
    if (!booking) return;
    const breakfast =
      addBreakfast && !booking.has_breakfast
        ? {
            has_breakfast: true,
            extras_price: breakfastPrice,
            total_price: booking.cabin_price + breakfastPrice,
          }
        : undefined;
    checkin({ bookingId: booking.id, breakfast });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <BackButton />
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-2xl font-semibold text-content">
                {cabin?.name ?? 'Cabin'}
              </h1>
              <StatusBadge status={booking.status} />
            </div>
            <p className="text-sm text-content-muted">Booking #{booking.id}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {booking.status === 'checked-in' && (
            <Button variant="secondary" onClick={() => checkout(booking.id)} loading={checkingOut}>
              <LogOut className="h-4 w-4" /> Check out
            </Button>
          )}
          <Button variant="ghost" onClick={() => setConfirmOpen(true)}>
            <Trash2 className="h-4 w-4" /> Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Left: guest + stay + price */}
        <div className="space-y-5 lg:col-span-2">
          {/* Guest */}
          <section className="glass p-6">
            <SectionTitle>Guest</SectionTitle>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{guest?.country_flag ?? '🏳️'}</span>
              <div>
                <p className="text-lg font-medium text-content">{guest?.full_name}</p>
                <p className="text-sm text-content-muted">{guest?.nationality}</p>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <DataItem icon={Mail} label="Email" value={guest?.email ?? '—'} />
              <DataItem icon={Users} label="Guests" value={`${booking.num_guests}`} />
            </div>
          </section>

          {/* Stay */}
          <section className="glass p-6">
            <SectionTitle>Stay</SectionTitle>
            <div className="grid gap-3 sm:grid-cols-2">
              <DataItem icon={Moon} label="Nights" value={`${booking.num_nights}`} />
              <DataItem
                icon={Home}
                label="Cabin"
                value={`${cabin?.name ?? '—'}${cat ? ` · ${cat.label}` : ''}`}
              />
              <DataItem label="Check in" value={formatDate(booking.start_date)} />
              <DataItem label="Check out" value={formatDate(booking.end_date)} />
            </div>

            {booking.observations && (
              <div className="mt-4 rounded-xl border border-line/10 bg-surface-sunken/40 p-3.5">
                <p className="text-xs font-medium uppercase tracking-wide text-content-muted">
                  Observations
                </p>
                <p className="mt-1 text-sm text-content-soft">{booking.observations}</p>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <Flag on={booking.has_breakfast} label="Breakfast included" />
              <Flag on={booking.is_paid} label={booking.is_paid ? 'Paid' : 'Not paid'} />
            </div>
          </section>

          {/* Price breakdown */}
          <section className="glass p-6">
            <SectionTitle>Payment</SectionTitle>
            <dl className="space-y-2.5 text-sm">
              <PriceRow label="Cabin" value={booking.cabin_price} />
              {booking.extras_price > 0 && (
                <PriceRow label="Breakfast & extras" value={booking.extras_price} />
              )}
              <div className="my-2 h-px bg-line/10" />
              <div className="flex items-center justify-between">
                <dt className="font-medium text-content">Total</dt>
                <dd className="font-display text-xl font-semibold text-gradient-gold">
                  {formatCurrency(booking.total_price)}
                </dd>
              </div>
            </dl>
          </section>
        </div>

        {/* Right: timeline + check-in */}
        <div className="space-y-5">
          <section className="glass p-6">
            <SectionTitle>Timeline</SectionTitle>
            <StatusTimeline booking={booking} />
          </section>

          {booking.status === 'unconfirmed' && (
            <section className="glass p-6">
              <SectionTitle>Check in</SectionTitle>
              {!booking.has_breakfast && settings && (
                <div className="mb-4 rounded-xl border border-gold-400/20 bg-gold-400/5 p-3.5">
                  <Checkbox
                    id="add-breakfast"
                    checked={addBreakfast}
                    onChange={setAddBreakfast}
                    label={
                      <span className="flex items-center gap-1.5">
                        <Coffee className="h-4 w-4 text-gold-300" />
                        Add breakfast for the stay
                        <span className="font-medium text-gold-200">
                          (+{formatCurrency(breakfastPrice)})
                        </span>
                      </span>
                    }
                  />
                </div>
              )}
              <p className="mb-4 text-xs text-content-muted">
                Checking in marks this booking as paid
                {addBreakfast ? ` (${formatCurrency(booking.cabin_price + breakfastPrice)}).` : '.'}
              </p>
              <Button fullWidth onClick={handleCheckin} loading={checkingIn}>
                Check in booking #{booking.id}
              </Button>
            </section>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() =>
          deleteBooking(booking.id, {
            onSuccess: () => navigate('/bookings'),
          })
        }
        title="Delete booking?"
        description="This permanently removes the booking. This can’t be undone."
        confirmLabel="Delete"
        loading={deleting}
        danger
      />
    </div>
  );
}

// -- little building blocks --------------------------------------------------

function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/bookings')}
      className="btn-focus grid h-10 w-10 place-items-center rounded-xl border border-line/10 bg-surface-raised/50 text-content-soft transition-colors hover:text-content"
      aria-label="Back to bookings"
    >
      <ArrowLeft className="h-4 w-4" />
    </button>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-content-muted">{children}</h2>;
}

function DataItem({
  icon: Icon,
  label,
  value,
}: {
  icon?: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      {Icon && <Icon className="mt-0.5 h-4 w-4 shrink-0 text-content-muted" />}
      <div className="min-w-0">
        <p className="text-xs text-content-muted">{label}</p>
        <p className="truncate text-sm font-medium text-content">{value}</p>
      </div>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-content-muted">{label}</dt>
      <dd className="text-content-soft">{formatCurrency(value)}</dd>
    </div>
  );
}

function Flag({ on, label }: { on: boolean; label: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset',
        on ? 'bg-teal-400/12 text-teal-300 ring-teal-400/25' : 'bg-line/8 text-content-muted ring-line/15',
      )}
    >
      {on ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
      {label}
    </span>
  );
}

function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-52 w-full rounded-2xl" />
        </div>
        <Skeleton className="h-72 w-full rounded-2xl" />
      </div>
    </div>
  );
}
