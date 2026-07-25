import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '@/ui/Logo';
import { NAV_ITEMS } from './navItems';
import { cn } from '@/utils/cn';

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[264px] shrink-0 flex-col gap-8 border-r border-line/8 bg-ink-soft/80 px-5 py-7 lg:flex">
      <div className="px-2">
        <Logo />
      </div>

      <nav className="flex flex-1 flex-col gap-1.5">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-content-muted">
          Manage
        </p>
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'text-content'
                  : 'text-content-soft hover:bg-surface-raised/50 hover:text-content',
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-gold-400/15 to-teal-500/5 ring-1 ring-inset ring-gold-400/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon
                  className={cn(
                    'relative h-[18px] w-[18px] transition-colors',
                    isActive ? 'text-gold-300' : 'text-content-muted group-hover:text-content-soft',
                  )}
                />
                <span className="relative">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="rounded-2xl border border-line/8 bg-surface/40 p-4">
        <p className="text-xs font-medium text-content-soft">Lumen Retreat</p>
        <p className="mt-1 text-[11px] leading-relaxed text-content-muted">
          10 cabins · Nestled in the northern pines. Managing calm, one stay at a time.
        </p>
      </div>
    </aside>
  );
}
