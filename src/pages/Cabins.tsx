import { useState } from 'react';
import { Plus, Home } from 'lucide-react';
import { PageTransition } from '@/ui/PageTransition';
import { PageHeader } from '@/ui/PageHeader';
import { Button } from '@/ui/Button';
import { Skeleton } from '@/ui/Skeleton';
import { EmptyState } from '@/ui/EmptyState';
import { ErrorState } from '@/ui/ErrorState';
import { CabinCard } from '@/features/cabins/CabinCard';
import { CabinForm } from '@/features/cabins/CabinForm';
import { useCabins } from '@/features/cabins/useCabins';
import { cn } from '@/utils/cn';
import type { CabinCategory } from '@/types/database.types';

const FILTERS: { value: 'all' | CabinCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'standard', label: 'Standard' },
  { value: 'deluxe', label: 'Deluxe' },
  { value: 'luxury', label: 'Luxury' },
];

export default function Cabins() {
  const { cabins, isLoading, error } = useCabins();
  const [filter, setFilter] = useState<'all' | CabinCategory>('all');
  const [createOpen, setCreateOpen] = useState(false);

  const filtered = (cabins ?? []).filter((c) => filter === 'all' || c.category === filter);

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader
          title="Cabins"
          subtitle="Ten hand-built hideaways in the pines."
          actions={
            <Button onClick={() => setCreateOpen(true)}>
              <Plus className="h-4 w-4" /> New cabin
            </Button>
          }
        />

        <div className="inline-flex items-center gap-1 rounded-xl border border-line/10 bg-surface/70 p-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                'btn-focus rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors',
                filter === f.value
                  ? 'bg-gold-400/15 text-gold-200 ring-1 ring-inset ring-gold-400/25'
                  : 'text-content-soft hover:text-content',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {error ? (
          <ErrorState description="Couldn’t load cabins." />
        ) : isLoading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass overflow-hidden p-0">
                <Skeleton className="h-44 w-full rounded-none" />
                <div className="space-y-3 p-5">
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Home}
            title="No cabins here"
            description={
              filter === 'all'
                ? 'Add your first cabin to get started.'
                : `No ${filter} cabins yet.`
            }
            action={
              <Button onClick={() => setCreateOpen(true)}>
                <Plus className="h-4 w-4" /> New cabin
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((cabin, i) => (
              <CabinCard key={cabin.id} cabin={cabin} index={i} />
            ))}
          </div>
        )}

        {createOpen && <CabinForm open={createOpen} onClose={() => setCreateOpen(false)} />}
      </div>
    </PageTransition>
  );
}
