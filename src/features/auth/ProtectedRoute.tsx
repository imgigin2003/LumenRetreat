import { useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './useUser';
import { FullPageSpinner } from '@/ui/Spinner';

/** Gate: redirects unauthenticated users to /login. */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login', { replace: true });
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <FullPageSpinner />;
  if (isAuthenticated) return <>{children}</>;
  return null;
}
