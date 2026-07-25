import { Link } from 'react-router-dom';
import { Logo } from '@/ui/Logo';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo size="lg" />
      <div className="space-y-2">
        <p className="text-gradient-gold font-display text-7xl font-semibold">404</p>
        <h1 className="text-xl font-semibold text-content">This trail leads nowhere</h1>
        <p className="max-w-sm text-sm text-content-muted">
          The page you’re looking for has wandered off into the pines.
        </p>
      </div>
      <Link
        to="/dashboard"
        className="btn-focus inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 px-7 text-sm font-semibold text-ink shadow-glow-gold transition-all hover:from-gold-300 hover:to-gold-400 active:scale-[0.98]"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
