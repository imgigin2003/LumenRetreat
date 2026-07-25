import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

export function Pagination({
  page,
  pageSize,
  count,
  onChange,
}: {
  page: number;
  pageSize: number;
  count: number;
  onChange: (page: number) => void;
}) {
  const pageCount = Math.ceil(count / pageSize);
  if (pageCount <= 1) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, count);

  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <p className="text-sm text-content-muted">
        Showing <span className="font-medium text-content-soft">{from}</span>–
        <span className="font-medium text-content-soft">{to}</span> of{' '}
        <span className="font-medium text-content-soft">{count}</span>
      </p>
      <div className="flex items-center gap-1">
        <PageButton disabled={page === 1} onClick={() => onChange(page - 1)}>
          <ChevronLeft className="h-4 w-4" /> Prev
        </PageButton>
        {Array.from({ length: pageCount }).map((_, i) => {
          const p = i + 1;
          return (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={cn(
                'btn-focus grid h-9 min-w-9 place-items-center rounded-lg px-2 text-sm font-medium transition-colors',
                p === page
                  ? 'bg-gold-400/15 text-gold-200 ring-1 ring-inset ring-gold-400/25'
                  : 'text-content-soft hover:bg-surface-raised/70 hover:text-content',
              )}
            >
              {p}
            </button>
          );
        })}
        <PageButton disabled={page === pageCount} onClick={() => onChange(page + 1)}>
          Next <ChevronRight className="h-4 w-4" />
        </PageButton>
      </div>
    </div>
  );
}

function PageButton({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn-focus flex h-9 items-center gap-1 rounded-lg px-2.5 text-sm font-medium text-content-soft transition-colors hover:bg-surface-raised/70 hover:text-content disabled:pointer-events-none disabled:opacity-40"
    >
      {children}
    </button>
  );
}
