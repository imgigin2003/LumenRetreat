import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, icon, ...props },
  ref,
) {
  return (
    <div className="relative">
      {icon && (
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-content-muted">
          {icon}
        </span>
      )}
      <input
        ref={ref}
        className={cn(
          'btn-focus h-12 w-full rounded-xl border bg-surface-sunken/60 px-4 text-base text-content placeholder:text-content-muted transition-colors',
          !!icon && 'pl-11',
          invalid
            ? 'border-red-500/50 focus-visible:ring-red-500/50'
            : 'border-line/12 hover:border-line/20',
          className,
        )}
        {...props}
      />
    </div>
  );
});

export function FormRow({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label?: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={htmlFor} className="block text-base font-medium text-content-soft">
          {label}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-xs text-red-400">{error}</p>
      ) : hint ? (
        <p className="text-xs text-content-muted">{hint}</p>
      ) : null}
    </div>
  );
}
