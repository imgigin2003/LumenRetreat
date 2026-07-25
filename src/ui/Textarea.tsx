import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, invalid, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={cn(
        'btn-focus w-full rounded-xl border bg-surface-sunken/60 px-3.5 py-2.5 text-sm text-content placeholder:text-content-muted transition-colors',
        invalid ? 'border-red-500/50' : 'border-line/12 hover:border-line/20',
        className,
      )}
      {...props}
    />
  );
});
