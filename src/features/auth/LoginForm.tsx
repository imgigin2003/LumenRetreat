import { useForm } from 'react-hook-form';
import { Mail, Lock, Sparkles } from 'lucide-react';
import { Button } from '@/ui/Button';
import { Input, FormRow } from '@/ui/Input';
import { useLogin } from './useLogin';
import { DEMO_EMAIL, DEMO_PASSWORD } from '@/services/apiAuth';

interface LoginValues {
  email: string;
  password: string;
}

export function LoginForm() {
  const { login, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    defaultValues: { email: DEMO_EMAIL, password: DEMO_PASSWORD },
  });

  function onSubmit({ email, password }: LoginValues) {
    login({ email, password });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormRow label="Email" htmlFor="email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          autoComplete="username"
          placeholder="you@retreat.com"
          icon={<Mail className="h-5 w-5" />}
          invalid={!!errors.email}
          disabled={isPending}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' },
          })}
        />
      </FormRow>

      <FormRow label="Password" htmlFor="password" error={errors.password?.message}>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          icon={<Lock className="h-5 w-5" />}
          invalid={!!errors.password}
          disabled={isPending}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'At least 6 characters' },
          })}
        />
      </FormRow>

      <Button type="submit" size="lg" fullWidth loading={isPending}>
        {isPending ? 'Signing in…' : 'Sign in'}
      </Button>

      <div className="flex items-start gap-2.5 rounded-xl border border-gold-400/20 bg-gold-400/5 p-4 text-sm text-content-soft">
        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" />
        <p>
          <span className="font-medium text-content">Demo access</span> — the fields are pre-filled.
          Just press <span className="font-medium text-gold-200">Sign in</span>.
          <br />
          <span className="text-content-muted">
            {DEMO_EMAIL} · {DEMO_PASSWORD}
          </span>
        </p>
      </div>
    </form>
  );
}
