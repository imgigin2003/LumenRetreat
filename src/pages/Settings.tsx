import { useForm } from 'react-hook-form';
import { Moon, Users, Coffee } from 'lucide-react';
import { PageTransition } from '@/ui/PageTransition';
import { PageHeader } from '@/ui/PageHeader';
import { Input, FormRow } from '@/ui/Input';
import { Button } from '@/ui/Button';
import { Skeleton } from '@/ui/Skeleton';
import { ErrorState } from '@/ui/ErrorState';
import { useSettings } from '@/features/settings/useSettings';
import { useUpdateSettings } from '@/features/settings/useUpdateSettings';
import type { Settings } from '@/types/database.types';

interface SettingsValues {
  min_booking_length: number;
  max_booking_length: number;
  max_guests_per_booking: number;
  breakfast_price: number;
}

export default function SettingsPage() {
  const { settings, isLoading, error } = useSettings();

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader title="Settings" subtitle="Breakfast pricing, stay limits and capacity." />
        {error ? (
          <ErrorState description="Couldn’t load settings." />
        ) : isLoading || !settings ? (
          <div className="glass max-w-2xl space-y-5 p-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-11 w-full" />
            ))}
          </div>
        ) : (
          <SettingsForm settings={settings} />
        )}
      </div>
    </PageTransition>
  );
}

function SettingsForm({ settings }: { settings: Settings }) {
  const { update, isPending } = useUpdateSettings();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<SettingsValues>({
    defaultValues: {
      min_booking_length: settings.min_booking_length,
      max_booking_length: settings.max_booking_length,
      max_guests_per_booking: settings.max_guests_per_booking,
      breakfast_price: settings.breakfast_price,
    },
  });

  return (
    <form onSubmit={handleSubmit((v) => update(v))} className="glass max-w-2xl space-y-5 p-6 sm:p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormRow
          label="Minimum nights"
          htmlFor="min"
          error={errors.min_booking_length?.message}
          hint="Shortest stay allowed"
        >
          <Input
            id="min"
            type="number"
            min={1}
            icon={<Moon className="h-4 w-4" />}
            invalid={!!errors.min_booking_length}
            {...register('min_booking_length', {
              valueAsNumber: true,
              required: 'Required',
              min: { value: 1, message: '≥ 1' },
            })}
          />
        </FormRow>

        <FormRow
          label="Maximum nights"
          htmlFor="max"
          error={errors.max_booking_length?.message}
          hint="Longest stay allowed"
        >
          <Input
            id="max"
            type="number"
            min={1}
            icon={<Moon className="h-4 w-4" />}
            invalid={!!errors.max_booking_length}
            {...register('max_booking_length', {
              valueAsNumber: true,
              required: 'Required',
              min: { value: 1, message: '≥ 1' },
            })}
          />
        </FormRow>

        <FormRow
          label="Max guests / booking"
          htmlFor="guests"
          error={errors.max_guests_per_booking?.message}
          hint="Cap per reservation"
        >
          <Input
            id="guests"
            type="number"
            min={1}
            icon={<Users className="h-4 w-4" />}
            invalid={!!errors.max_guests_per_booking}
            {...register('max_guests_per_booking', {
              valueAsNumber: true,
              required: 'Required',
              min: { value: 1, message: '≥ 1' },
            })}
          />
        </FormRow>

        <FormRow
          label="Breakfast price ($)"
          htmlFor="breakfast"
          error={errors.breakfast_price?.message}
          hint="Per guest, per night"
        >
          <Input
            id="breakfast"
            type="number"
            min={0}
            icon={<Coffee className="h-4 w-4" />}
            invalid={!!errors.breakfast_price}
            {...register('breakfast_price', {
              valueAsNumber: true,
              required: 'Required',
              min: { value: 0, message: '≥ 0' },
            })}
          />
        </FormRow>
      </div>

      <div className="flex justify-end pt-1">
        <Button type="submit" loading={isPending} disabled={!isDirty}>
          Save settings
        </Button>
      </div>
    </form>
  );
}
