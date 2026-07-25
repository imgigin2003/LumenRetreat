import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, UserRound, ChevronDown } from 'lucide-react';
import { useUser } from '@/features/auth/useUser';
import { useLogout } from '@/features/auth/useLogout';
import { getInitials } from '@/utils/helpers';
import { cn } from '@/utils/cn';

export function UserMenu() {
  const { user } = useUser();
  const { logout, isPending } = useLogout();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const fullName = (user?.user_metadata?.full_name as string) || 'Retreat Host';
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
  const email = user?.email ?? '';

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="btn-focus flex items-center gap-2 rounded-xl border border-line/10 bg-surface-raised/50 py-1 pl-1 pr-2.5 transition-colors hover:bg-surface-raised/80"
      >
        <Avatar url={avatarUrl} name={fullName} />
        <span className="hidden text-sm font-medium text-content-soft sm:block">
          {fullName.split(' ')[0]}
        </span>
        <ChevronDown className={cn('h-4 w-4 text-content-muted transition-transform', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="glass absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden p-1.5"
          >
            <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
              <Avatar url={avatarUrl} name={fullName} size="lg" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-content">{fullName}</p>
                <p className="truncate text-xs text-content-muted">{email}</p>
              </div>
            </div>
            <div className="my-1 h-px bg-line/10" />
            <Link
              to="/account"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-content-soft transition-colors hover:bg-surface-raised/70 hover:text-content"
            >
              <UserRound className="h-4 w-4" /> Account
            </Link>
            <button
              onClick={() => logout()}
              disabled={isPending}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-content-soft transition-colors hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" /> {isPending ? 'Signing out…' : 'Sign out'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Avatar({
  url,
  name,
  size = 'md',
}: {
  url?: string;
  name: string;
  size?: 'md' | 'lg';
}) {
  const dim = size === 'lg' ? 'h-10 w-10 text-sm' : 'h-8 w-8 text-xs';
  if (url) {
    return (
      <img
        src={url}
        alt={name}
        className={cn('rounded-lg object-cover ring-1 ring-line/15', dim)}
      />
    );
  }
  return (
    <span
      className={cn(
        'grid place-items-center rounded-lg bg-gradient-to-br from-gold-400/30 to-teal-500/25 font-semibold text-content ring-1 ring-line/15',
        dim,
      )}
    >
      {getInitials(name)}
    </span>
  );
}
