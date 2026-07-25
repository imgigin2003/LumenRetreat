// Hand-written to match supabase/schema.sql. If you prefer generated types, run:
//   npx supabase gen types typescript --project-id <ref> > src/types/database.types.ts

export type CabinCategory = 'standard' | 'deluxe' | 'luxury';
export type BookingStatus = 'unconfirmed' | 'checked-in' | 'checked-out';

export interface Cabin {
  id: string;
  created_at: string;
  name: string;
  category: CabinCategory;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string | null;
  image: string | null;
}

export interface Guest {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  nationality: string | null;
  country_flag: string | null;
  national_id: string | null;
}

export interface Settings {
  id: number;
  created_at: string;
  min_booking_length: number;
  max_booking_length: number;
  max_guests_per_booking: number;
  breakfast_price: number;
}

export interface Booking {
  id: string;
  created_at: string;
  start_date: string;
  end_date: string;
  num_nights: number;
  num_guests: number;
  cabin_price: number;
  extras_price: number;
  total_price: number;
  status: BookingStatus;
  has_breakfast: boolean;
  is_paid: boolean;
  observations: string | null;
  cabin_id: string;
  guest_id: string;
}

/** Booking joined with its cabin & guest (used across the UI). */
export interface BookingWithRelations extends Booking {
  cabins: Pick<Cabin, 'id' | 'name' | 'category'> | null;
  guests: Pick<Guest, 'id' | 'full_name' | 'email' | 'country_flag' | 'nationality'> | null;
}
