import { Badge } from '@/ui/Badge';
import { BOOKING_STATUS_META } from '@/utils/constants';
import type { BookingStatus } from '@/types/database.types';

export function StatusBadge({ status }: { status: BookingStatus }) {
  const meta = BOOKING_STATUS_META[status];
  return (
    <Badge tone={meta.tone}>
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </Badge>
  );
}
