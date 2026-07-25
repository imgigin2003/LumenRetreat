import { db, delay } from '@/lib/mockDb';
import type { Guest } from '@/types/database.types';

export async function getGuests(query?: string): Promise<Guest[]> {
  let list = [...db.guests].sort((a, b) => a.full_name.localeCompare(b.full_name));
  if (query) {
    const q = query.toLowerCase();
    list = list.filter(
      (g) =>
        g.full_name.toLowerCase().includes(q) ||
        g.email.toLowerCase().includes(q) ||
        (g.nationality ?? '').toLowerCase().includes(q),
    );
  }
  return delay(list);
}

/** Count of stays per guest — handy for the guests page. */
export async function getGuestStayCounts(): Promise<Record<string, number>> {
  const counts: Record<string, number> = {};
  for (const b of db.bookings) counts[b.guest_id] = (counts[b.guest_id] ?? 0) + 1;
  return delay(counts, 250);
}
