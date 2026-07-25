import { addDays, format, subDays } from 'date-fns';
import seed from '@/data/seed.json';
import type {
  Booking,
  BookingStatus,
  BookingWithRelations,
  Cabin,
  Guest,
  Settings,
} from '@/types/database.types';

/**
 * A tiny in-memory "database" seeded from src/data/seed.json.
 * Replaces Supabase for this demo — no backend, no network. State lives for the
 * life of the tab; bookings are regenerated relative to *today* on each load so
 * the dashboard always looks alive. Mutations (check-in/out, CRUD) persist for
 * the session.
 */

const ISO_DATE = 'yyyy-MM-dd';
const now = new Date();

function baseCabins(): Cabin[] {
  return seed.cabins.map((c, i) => ({
    ...(c as Omit<Cabin, 'created_at'>),
    created_at: subDays(now, 400 - i * 12).toISOString(),
  }));
}

function baseGuests(): Guest[] {
  return seed.guests.map((g, i) => ({
    ...(g as Omit<Guest, 'created_at'>),
    created_at: subDays(now, 300 - i * 8).toISOString(),
  }));
}

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const OBSERVATIONS = [
  'Celebrating an anniversary — a bottle of wine on arrival would be lovely.',
  'Travelling with a small, well-behaved dog.',
  'Please arrange a late check-out if possible.',
  'Vegetarian breakfast preferred.',
  'First visit to Lumen — recommendations welcome!',
];

function generateBookings(cabins: Cabin[], guests: Guest[], settings: Settings): Booking[] {
  const bookings: Booking[] = [];
  const bp = settings.breakfast_price;

  for (let i = 0; i < 52; i++) {
    const cabin = pick(cabins);
    const guest = pick(guests);
    const nights = rand(2, 13);
    const startDate = addDays(now, rand(-60, 44));
    const endDate = addDays(startDate, nights);
    const numGuests = rand(1, cabin.max_capacity);
    const hasBreakfast = Math.random() < 0.5;
    const cabinPrice = (cabin.regular_price - cabin.discount) * nights;
    const extrasPrice = hasBreakfast ? bp * nights * numGuests : 0;

    let status: BookingStatus;
    let isPaid: boolean;
    const todayMid = new Date(format(now, ISO_DATE));
    const startMid = new Date(format(startDate, ISO_DATE));
    const endMid = new Date(format(endDate, ISO_DATE));

    if (endMid < todayMid) {
      status = 'checked-out';
      isPaid = true;
    } else if (startMid <= todayMid && endMid >= todayMid) {
      status = pick(['checked-in', 'checked-in', 'unconfirmed'] as BookingStatus[]);
      isPaid = status === 'checked-in';
    } else {
      status = 'unconfirmed';
      isPaid = Math.random() < 0.35;
    }

    bookings.push({
      id: `b${String(i + 1).padStart(3, '0')}`,
      created_at: subDays(startDate, rand(5, 45)).toISOString(),
      start_date: format(startDate, ISO_DATE),
      end_date: format(endDate, ISO_DATE),
      num_nights: nights,
      num_guests: numGuests,
      cabin_price: cabinPrice,
      extras_price: extrasPrice,
      total_price: cabinPrice + extrasPrice,
      status,
      has_breakfast: hasBreakfast,
      is_paid: isPaid,
      observations: Math.random() < 0.25 ? pick(OBSERVATIONS) : null,
      cabin_id: cabin.id,
      guest_id: guest.id,
    });
  }

  // Newest first by creation.
  return bookings.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
}

// The live store ------------------------------------------------------------
interface Store {
  cabins: Cabin[];
  guests: Guest[];
  settings: Settings;
  bookings: Booking[];
}

const store: Store = (() => {
  const cabins = baseCabins();
  const guests = baseGuests();
  const settings = { ...(seed.settings as Settings), created_at: now.toISOString() };
  const bookings = generateBookings(cabins, guests, settings);
  return { cabins, guests, settings, bookings };
})();

export const db = store;

// Helpers -------------------------------------------------------------------

/** Simulate network latency so loading skeletons actually show. */
export function delay<T>(value: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(structuredCloneSafe(value)), ms));
}

/** structuredClone with a JSON fallback (keeps React Query caches immutable). */
function structuredCloneSafe<T>(value: T): T {
  try {
    return structuredClone(value);
  } catch {
    return JSON.parse(JSON.stringify(value));
  }
}

export function newId(prefix: string): string {
  return `${prefix}${Math.random().toString(36).slice(2, 9)}`;
}

/** Attach cabin + guest to a booking (mirrors a Supabase relational select). */
export function withRelations(booking: Booking): BookingWithRelations {
  const cabin = store.cabins.find((c) => c.id === booking.cabin_id) ?? null;
  const guest = store.guests.find((g) => g.id === booking.guest_id) ?? null;
  return {
    ...booking,
    cabins: cabin ? { id: cabin.id, name: cabin.name, category: cabin.category } : null,
    guests: guest
      ? {
          id: guest.id,
          full_name: guest.full_name,
          email: guest.email,
          country_flag: guest.country_flag,
          nationality: guest.nationality,
        }
      : null,
  };
}
