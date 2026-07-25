import { AuthShell } from '@/features/auth/AuthShell';
import { LoginForm } from '@/features/auth/LoginForm';

export default function Login() {
  return (
    <AuthShell title="Welcome back" subtitle="Sign in to manage your retreat.">
      <LoginForm />
    </AuthShell>
  );
}
