import { useForm } from 'react-hook-form';
import { Modal } from '@/ui/Modal';
import { Button } from '@/ui/Button';
import { Input, FormRow } from '@/ui/Input';
import { Select } from '@/ui/Select';
import { Textarea } from '@/ui/Textarea';
import { useCreateCabin, useUpdateCabin } from './useCabinMutations';
import type { Cabin, CabinCategory } from '@/types/database.types';
import type { CabinInput } from '@/services/apiCabins';

interface CabinFormValues {
  name: string;
  category: CabinCategory;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string;
}

const CATEGORY_OPTIONS = [
  { value: 'standard', label: 'Standard' },
  { value: 'deluxe', label: 'Deluxe' },
  { value: 'luxury', label: 'Luxury' },
];

export function CabinForm({
  open,
  onClose,
  cabinToEdit,
}: {
  open: boolean;
  onClose: () => void;
  cabinToEdit?: Cabin;
}) {
  const isEdit = !!cabinToEdit;
  const { create, isPending: creating } = useCreateCabin();
  const { update, isPending: updating } = useUpdateCabin();
  const isPending = creating || updating;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CabinFormValues>({
    defaultValues: cabinToEdit
      ? {
          name: cabinToEdit.name,
          category: cabinToEdit.category,
          max_capacity: cabinToEdit.max_capacity,
          regular_price: cabinToEdit.regular_price,
          discount: cabinToEdit.discount,
          description: cabinToEdit.description ?? '',
        }
      : {
          name: '',
          category: 'standard',
          max_capacity: 2,
          regular_price: 250,
          discount: 0,
          description: '',
        },
  });

  function onSubmit(values: CabinFormValues) {
    const input: CabinInput = { ...values, image: null };
    if (isEdit && cabinToEdit) {
      update({ id: cabinToEdit.id, input }, { onSuccess: onClose });
    } else {
      create(input, { onSuccess: onClose });
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title={isEdit ? `Edit ${cabinToEdit?.name}` : 'New cabin'}
      description={isEdit ? 'Update this cabin’s details.' : 'Add a new cabin to the retreat.'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormRow label="Name" htmlFor="name" error={errors.name?.message}>
          <Input
            id="name"
            placeholder="Aurora"
            invalid={!!errors.name}
            disabled={isPending}
            {...register('name', { required: 'Name is required' })}
          />
        </FormRow>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormRow label="Category" htmlFor="category">
            <Select
              id="category"
              options={CATEGORY_OPTIONS}
              disabled={isPending}
              {...register('category')}
            />
          </FormRow>
          <FormRow label="Max capacity" htmlFor="max_capacity" error={errors.max_capacity?.message}>
            <Input
              id="max_capacity"
              type="number"
              min={1}
              invalid={!!errors.max_capacity}
              disabled={isPending}
              {...register('max_capacity', {
                valueAsNumber: true,
                required: 'Required',
                min: { value: 1, message: 'At least 1 guest' },
              })}
            />
          </FormRow>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormRow label="Regular price ($/night)" htmlFor="regular_price" error={errors.regular_price?.message}>
            <Input
              id="regular_price"
              type="number"
              min={0}
              invalid={!!errors.regular_price}
              disabled={isPending}
              {...register('regular_price', {
                valueAsNumber: true,
                required: 'Required',
                min: { value: 0, message: 'Must be ≥ 0' },
              })}
            />
          </FormRow>
          <FormRow label="Discount ($)" htmlFor="discount" error={errors.discount?.message}>
            <Input
              id="discount"
              type="number"
              min={0}
              invalid={!!errors.discount}
              disabled={isPending}
              {...register('discount', {
                valueAsNumber: true,
                min: { value: 0, message: 'Must be ≥ 0' },
                validate: (value) =>
                  value <= getValues().regular_price || 'Discount can’t exceed the price',
              })}
            />
          </FormRow>
        </div>

        <FormRow label="Description" htmlFor="description">
          <Textarea
            id="description"
            rows={3}
            placeholder="A glass-walled hideaway above the treeline…"
            disabled={isPending}
            {...register('description')}
          />
        </FormRow>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" loading={isPending}>
            {isEdit ? 'Save changes' : 'Create cabin'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
