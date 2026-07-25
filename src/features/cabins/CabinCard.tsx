import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MoreVertical, Rotate3d, Pencil, Copy, Trash2, Home } from 'lucide-react';
import { Dropdown, DropdownItem } from '@/ui/Dropdown';
import { Badge } from '@/ui/Badge';
import { ConfirmDialog } from '@/ui/ConfirmDialog';
import { CabinForm } from './CabinForm';
import { CabinViewer } from './CabinViewer';
import { useDeleteCabin, useDuplicateCabin } from './useCabinMutations';
import { CABIN_CATEGORY_META } from '@/utils/constants';
import { formatCurrency } from '@/utils/helpers';
import type { Cabin } from '@/types/database.types';

export function CabinCard({ cabin, index = 0 }: { cabin: Cabin; index?: number }) {
  const cat = CABIN_CATEGORY_META[cabin.category];
  const { remove, isPending: deleting } = useDeleteCabin();
  const { duplicate } = useDuplicateCabin();

  const [viewerOpen, setViewerOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const price = cabin.regular_price - cabin.discount;
  const tone = cabin.category === 'luxury' ? 'amber' : cabin.category === 'deluxe' ? 'teal' : 'slate';

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="glass glass-hover group overflow-hidden p-0"
      >
        {/* Preview */}
        <button
          onClick={() => setViewerOpen(true)}
          className="relative block h-44 w-full overflow-hidden"
          style={{
            background: `radial-gradient(130% 120% at 28% 12%, ${cat.hex}30, transparent 62%), linear-gradient(160deg, #1c2632, #0e141c)`,
          }}
          aria-label={`View ${cabin.name} in 3D`}
        >
          <Home
            className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:scale-110"
            style={{ color: cat.hex, opacity: 0.35 }}
            strokeWidth={1}
          />
          <span className="absolute left-3 top-3">
            <Badge tone={tone}>{cat.label}</Badge>
          </span>
          {cabin.discount > 0 && (
            <span className="absolute right-3 top-3">
              <Badge tone="green">−{formatCurrency(cabin.discount)}</Badge>
            </span>
          )}
          <span className="absolute inset-0 flex items-center justify-center bg-ink/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex items-center gap-1.5 rounded-full border border-line/15 bg-ink/70 px-3.5 py-2 text-xs font-medium text-content">
              <Rotate3d className="h-4 w-4 text-gold-300" /> View in 3D
            </span>
          </span>
        </button>

        {/* Body */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-semibold text-content">{cabin.name}</h3>
            <span className="flex items-center gap-1 text-sm text-content-muted">
              <Users className="h-4 w-4" /> {cabin.max_capacity}
            </span>
          </div>

          {cabin.description && (
            <p className="mt-1.5 line-clamp-2 text-sm text-content-muted">{cabin.description}</p>
          )}

          <div className="mt-4 flex items-center justify-between">
            <div>
              {cabin.discount > 0 && (
                <span className="mr-1.5 text-sm text-content-muted line-through">
                  {formatCurrency(cabin.regular_price)}
                </span>
              )}
              <span className="font-display text-lg font-semibold text-content">
                {formatCurrency(price)}
              </span>
              <span className="text-xs text-content-muted"> /night</span>
            </div>

            <Dropdown trigger={<MoreVertical className="h-4 w-4" />}>
              <DropdownItem icon={Rotate3d} onClick={() => setViewerOpen(true)}>
                View in 3D
              </DropdownItem>
              <DropdownItem icon={Pencil} onClick={() => setEditOpen(true)}>
                Edit
              </DropdownItem>
              <DropdownItem icon={Copy} onClick={() => duplicate(cabin.id)}>
                Duplicate
              </DropdownItem>
              <DropdownItem icon={Trash2} danger onClick={() => setConfirmOpen(true)}>
                Delete
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </motion.article>

      {viewerOpen && <CabinViewer open={viewerOpen} onClose={() => setViewerOpen(false)} cabin={cabin} />}
      {editOpen && <CabinForm open={editOpen} onClose={() => setEditOpen(false)} cabinToEdit={cabin} />}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => remove(cabin.id, { onSettled: () => setConfirmOpen(false) })}
        title={`Delete ${cabin.name}?`}
        description="This removes the cabin and its bookings. This can’t be undone."
        confirmLabel="Delete"
        loading={deleting}
        danger
      />
    </>
  );
}
