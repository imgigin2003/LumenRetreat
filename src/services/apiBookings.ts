import { format, parseISO } from 'date-fns';
import { db, delay, withRelations } from '@/lib/mockDb';
import type { Booking, BookingStatus, BookingWithRelations } from '@/types/database.types';

const ISO_DATE = 'yyyy-MM-dd';
const todayStr = () => format(new Date(), ISO_DATE);

// ---------------------------------------------------------------------------
//  Dashboard reads
// ---------------------------------------------------------------------------

/** Bookings created after a given date — powers the sales chart & counts. */
export async function getBookingsAfterDate(dateISO: string): Promise<Booking[]> {
  const nowISO = new Date().toISOString();
  const list = db.bookings.filter((b) => b.created_at >= dateISO && b.created_at <= nowISO);
  return delay(list);
}

/** Stays that START after a given date (and on/before today) — occupancy & durations. */
export async function getStaysAfterDate(dateISO: string): Promise<Booking[]> {
  const fromStr = format(parseISO(dateISO), ISO_DATE);
  const today = todayStr();
  const list = db.bookings.filter((b) => b.start_date >= fromStr && b.start_date <= today);
  return delay(list);
}

/** Arrivals (unconfirmed, arriving today) + departures (checked-in, leaving today). */
export async function getStaysTodayActivity(): Promise<BookingWithRelations[]> {
  const today = todayStr();
  const list = db.bookings
    .filter(
      (b) =>
        (b.status === 'unconfirmed' && b.start_date === today) ||
        (b.status === 'checked-in' && b.end_date === today),
    )
    .sort((a, b) => (a.created_at < b.created_at ? -1 : 1))
    .map(withRelations);
  return delay(list);
}

// ---------------------------------------------------------------------------
//  Bookings table + detail
// ---------------------------------------------------------------------------

export interface GetBookingsParams {
  status?: BookingStatus | 'all';
  sortBy?: { field: string; direction: 'asc' | 'desc' };
  page?: number;
  pageSize?: number;
}

export async function getBookings({ status, sortBy, page, pageSize }: GetBookingsParams) {
  let list = [...db.bookings];

  if (status && status !== 'all') list = list.filter((b) => b.status === status);

  if (sortBy) {
    const { field, direction } = sortBy;
    const dir = direction === 'asc' ? 1 : -1;
    list.sort((a, b) => {
      const av = a[field as keyof Booking] as string | number;
      const bv = b[field as keyof Booking] as string | number;
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  }

  const count = list.length;

  if (page && pageSize) {
    const from = (page - 1) * pageSize;
    list = list.slice(from, from + pageSize);
  }

  const data = list.map(withRelations);
  return delay({ data, count });
}

export async function getBooking(id: string): Promise<BookingWithRelations> {
  const booking = db.bookings.find((b) => b.id === id);
  if (!booking) throw new Error('Booking not found');
  return delay(withRelations(booking));
}

export async function updateBooking(id: string, fields: Partial<Booking>): Promise<Booking> {
  const booking = db.bookings.find((b) => b.id === id);
  if (!booking) throw new Error('Booking could not be updated');
  Object.assign(booking, fields);
  return delay(booking, 450);
}

export async function deleteBooking(id: string): Promise<void> {
  const idx = db.bookings.findIndex((b) => b.id === id);
  if (idx === -1) throw new Error('Booking could not be deleted');
  db.bookings.splice(idx, 1);
  return delay(undefined, 400);
}
