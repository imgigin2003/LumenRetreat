import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { CabinScene } from '@/three/CabinScene';
import { Logo } from '@/ui/Logo';
import { ThemeToggle } from '@/ui/ThemeToggle';

/**
 * Two-panel auth layout: the 3D rotating cabin hero on the left,
 * the form on the right. On mobile the hero collapses to a slim banner.
 */
export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Hero panel */}
      <div className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0">
          <CabinScene />
        </div>
        {/* Gradient scrim + copy */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/40" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold-300/90">
              Boutique resort management
            </p>
            <h2 className="max-w-md font-display text-4xl font-semibold leading-tight text-content">
              Where every stay begins with a warm light in the pines.
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Form panel */}
      <div className="relative flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
        <div className="absolute right-6 top-6">
          <ThemeToggle />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-md"
        >
          <div className="mb-10">
            <Logo size="lg" />
          </div>

          {/* Mobile mini-hero */}
          <div className="mb-8 h-40 overflow-hidden rounded-2xl border border-line/10 lg:hidden">
            <CabinScene />
          </div>

          <div className="mb-9 space-y-2">
            <h1 className="text-4xl font-semibold text-content">{title}</h1>
            <p className="text-lg text-content-muted">{subtitle}</p>
          </div>

          {children}
        </motion.div>
      </div>
    </div>
  );
}
