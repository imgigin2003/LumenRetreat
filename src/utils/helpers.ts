import {
  differenceInDays,
  formatDistance,
  isToday as isTodayFns,
  parseISO,
  format,
} from 'date-fns';

/** Format a number as USD currency. */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

/** Compact currency for KPI tiles (e.g. $12.4k). */
export function formatCompactCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

/** e.g. "Apr 12, 2026" */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'MMM d, yyyy');
}

/** e.g. "Apr 12" */
export function formatDateShort(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'MMM d');
}

export function isToday(date: string | Date): boolean {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return isTodayFns(d);
}

/**
 * Human "distance from now": subtracts today and formats.
 * "In 3 days", "2 days ago", "Today".
 */
export function formatDistanceFromNow(dateStr: string): string {
  const distance = formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  });
  return distance.replace('about ', '').replace('in ', 'In ');
}

export function subtractDates(dateStr1: string, dateStr2: string): number {
  return differenceInDays(parseISO(dateStr1), parseISO(dateStr2));
}

/** ISO date (yyyy-mm-dd) for `n` days from today. */
export function isoDaysFromNow(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

/** Clamp helper. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Deterministic hue (0-360) from a string — used for procedural cabin gradients. */
export function hueFromString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

/** Turn a full name into initials, e.g. "Amelia Hartley" → "AH". */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}
