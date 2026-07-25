import type { BookingStatus, CabinCategory } from '@/types/database.types';

export const PAGE_SIZE = 10;

export const BOOKING_STATUS_META: Record<
  BookingStatus,
  { label: string; tone: 'amber' | 'teal' | 'slate'; dot: string }
> = {
  unconfirmed: { label: 'Unconfirmed', tone: 'slate', dot: 'bg-content-muted' },
  'checked-in': { label: 'Checked in', tone: 'teal', dot: 'bg-teal-400' },
  'checked-out': { label: 'Checked out', tone: 'amber', dot: 'bg-gold-400' },
};

export const CABIN_CATEGORY_META: Record<
  CabinCategory,
  { label: string; color: string; hex: string; ring: string }
> = {
  standard: { label: 'Standard', color: 'text-content-soft', hex: '#8aa0b5', ring: 'ring-slate-400/30' },
  deluxe: { label: 'Deluxe', color: 'text-teal-300', hex: '#3fb89e', ring: 'ring-teal-400/40' },
  luxury: { label: 'Luxury', color: 'text-gold-300', hex: '#d9a648', ring: 'ring-gold-400/40' },
};

/** Options for the dashboard "last N days" toggle. */
export const DASHBOARD_RANGES = [
  { value: 7, label: 'Last 7 days' },
  { value: 30, label: 'Last 30 days' },
  { value: 90, label: 'Last 90 days' },
] as const;
