import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Mail } from 'lucide-react';
import { PageTransition } from '@/ui/PageTransition';
import { PageHeader } from '@/ui/PageHeader';
import { Input } from '@/ui/Input';
import { Badge } from '@/ui/Badge';
import { Skeleton } from '@/ui/Skeleton';
import { EmptyState } from '@/ui/EmptyState';
import { ErrorState } from '@/ui/ErrorState';
import { useGuests } from '@/features/guests/useGuests';

export default function Guests() {
  const [query, setQuery] = useState('');
  const { guests, counts, isLoading, error } = useGuests(query);

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader
          title="Guests"
          subtitle="The people who make the retreat glow."
          actions={
            <div className="w-full sm:w-72">
              <Input
                placeholder="Search name, email, country…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
          }
        />

        {error ? (
          <ErrorState description="Couldn’t load guests." />
        ) : isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="glass flex items-center gap-3 p-4">
                <Skeleton className="h-11 w-11 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3.5 w-2/3" />
                  <Skeleton className="h-2.5 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : guests.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No guests found"
            description={query ? `Nothing matches “${query}”.` : 'No guests yet.'}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {guests.map((guest, i) => {
              const stays = counts[guest.id] ?? 0;
              return (
                <motion.div
                  key={guest.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.03, 0.4), duration: 0.4 }}
                  className="glass glass-hover flex items-center gap-3.5 p-4"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-surface-raised/70 text-2xl ring-1 ring-line/10">
                    {guest.country_flag ?? '🏳️'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-content">{guest.full_name}</p>
                    <p className="flex items-center gap-1.5 truncate text-xs text-content-muted">
                      <Mail className="h-3 w-3" /> {guest.email}
                    </p>
                    <p className="mt-0.5 text-xs text-content-muted">{guest.nationality}</p>
                  </div>
                  {stays > 0 && (
                    <Badge tone="amber">
                      {stays} {stays === 1 ? 'stay' : 'stays'}
                    </Badge>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
