import { db, delay } from '@/lib/mockDb';
import type { Settings } from '@/types/database.types';

export async function getSettings(): Promise<Settings> {
  return delay(db.settings, 300);
}

export async function updateSettings(fields: Partial<Settings>): Promise<Settings> {
  Object.assign(db.settings, fields);
  return delay(db.settings, 450);
}
