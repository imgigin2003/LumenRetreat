import { db, delay, newId } from '@/lib/mockDb';
import type { Cabin } from '@/types/database.types';

export type CabinInput = Omit<Cabin, 'id' | 'created_at'>;

export async function getCabins(): Promise<Cabin[]> {
  const sorted = [...db.cabins].sort((a, b) => a.regular_price - b.regular_price);
  return delay(sorted);
}

export async function createCabin(input: CabinInput): Promise<Cabin> {
  const cabin: Cabin = { ...input, id: newId('c'), created_at: new Date().toISOString() };
  db.cabins.push(cabin);
  return delay(cabin, 500);
}

export async function updateCabin(id: string, input: Partial<CabinInput>): Promise<Cabin> {
  const cabin = db.cabins.find((c) => c.id === id);
  if (!cabin) throw new Error('Cabin not found');
  Object.assign(cabin, input);
  return delay(cabin, 500);
}

export async function deleteCabin(id: string): Promise<void> {
  const idx = db.cabins.findIndex((c) => c.id === id);
  if (idx === -1) throw new Error('Cabin not found');
  db.cabins.splice(idx, 1);
  // Remove that cabin's bookings too (mirrors ON DELETE CASCADE).
  db.bookings = db.bookings.filter((b) => b.cabin_id !== id);
  return delay(undefined, 400);
}

export async function duplicateCabin(id: string): Promise<Cabin> {
  const source = db.cabins.find((c) => c.id === id);
  if (!source) throw new Error('Cabin not found');
  const copy: Cabin = {
    ...source,
    id: newId('c'),
    name: `${source.name} (copy)`,
    created_at: new Date().toISOString(),
  };
  db.cabins.push(copy);
  return delay(copy, 450);
}
