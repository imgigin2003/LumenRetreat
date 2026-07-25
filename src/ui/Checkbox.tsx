import { Check } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export function Checkbox({
  checked,
  onChange,
  label,
  disabled,
  id,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
  id?: string;
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'flex cursor-pointer items-center gap-3 text-sm text-content-soft',
        disabled && 'cursor-not-allowed opacity-60',
      )}
    >
      <span className="relative inline-flex">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className={cn(
            'grid h-5 w-5 place-items-center rounded-md border transition-colors',
            checked
              ? 'border-gold-400 bg-gold-400 text-ink'
              : 'border-line/25 bg-surface-sunken/60',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-gold-400/70 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ink',
          )}
        >
          {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
        </span>
      </span>
      {label}
    </label>
  );
}
