import { lazy, Suspense } from 'react';
import { Rotate3d, Users } from 'lucide-react';
import { Modal } from '@/ui/Modal';
import { Badge } from '@/ui/Badge';
import { CanvasFallback } from '@/three/CanvasFallback';
import { CABIN_CATEGORY_META } from '@/utils/constants';
import { formatCurrency } from '@/utils/helpers';
import type { Cabin } from '@/types/database.types';

const OrbitCabin = lazy(() =>
  import('@/three/OrbitCabin').then((m) => ({ default: m.OrbitCabin })),
);

export function CabinViewer({
  open,
  onClose,
  cabin,
}: {
  open: boolean;
  onClose: () => void;
  cabin: Cabin;
}) {
  const cat = CABIN_CATEGORY_META[cabin.category];
  const price = cabin.regular_price - cabin.discount;

  return (
    <Modal open={open} onClose={onClose} size="xl">
      <div className="space-y-5">
        <div className="relative h-[360px] overflow-hidden rounded-2xl border border-line/10 bg-gradient-to-b from-[#1b2431] via-[#141b26] to-[#0e141c] sm:h-[440px]">
          {open && (
            <Suspense fallback={<CanvasFallback label="Loading cabin…" />}>
              <OrbitCabin category={cabin.category} />
            </Suspense>
          )}
          <div className="pointer-events-none absolute left-4 top-4">
            <Badge tone={cat.label === 'Luxury' ? 'amber' : cat.label === 'Deluxe' ? 'teal' : 'slate'}>
              {cat.label}
            </Badge>
          </div>
          <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-line/10 bg-ink/75 px-3 py-1.5 text-xs text-content-soft">
            <Rotate3d className="h-3.5 w-3.5" /> Drag to rotate · scroll to zoom
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-content">{cabin.name}</h2>
            {cabin.description && (
              <p className="mt-1 max-w-xl text-sm text-content-muted">{cabin.description}</p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm text-content-soft">
              <Users className="h-4 w-4 text-content-muted" /> Fits {cabin.max_capacity}
            </div>
            <div className="text-right">
              {cabin.discount > 0 && (
                <span className="mr-1.5 text-sm text-content-muted line-through">
                  {formatCurrency(cabin.regular_price)}
                </span>
              )}
              <span className="font-display text-xl font-semibold text-gradient-gold">
                {formatCurrency(price)}
              </span>
              <span className="text-xs text-content-muted"> /night</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
