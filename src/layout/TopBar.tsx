import { Logo } from '@/ui/Logo';
import { ThemeToggle } from '@/ui/ThemeToggle';
import { UserMenu } from './UserMenu';

/** Slim top bar: mobile logo on the left, theme + user controls on the right. */
export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-line/8 bg-ink/90 px-4 sm:px-6 lg:px-8">
      <div className="lg:hidden">
        <Logo showWordmark={false} />
      </div>
      <div className="hidden lg:block" />
      <div className="flex items-center gap-2.5">
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
