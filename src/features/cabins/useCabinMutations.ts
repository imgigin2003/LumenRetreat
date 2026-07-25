import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  createCabin,
  updateCabin,
  deleteCabin,
  duplicateCabin,
  type CabinInput,
} from '@/services/apiCabins';

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: create, isPending } = useMutation({
    mutationFn: (input: CabinInput) => createCabin(input),
    onSuccess: () => {
      toast.success('Cabin created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: () => toast.error('Could not create cabin'),
  });
  return { create, isPending };
}

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: update, isPending } = useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<CabinInput> }) =>
      updateCabin(id, input),
    onSuccess: () => {
      toast.success('Cabin updated');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: () => toast.error('Could not update cabin'),
  });
  return { update, isPending };
}

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { mutate: remove, isPending } = useMutation({
    mutationFn: (id: string) => deleteCabin(id),
    onSuccess: () => {
      toast.success('Cabin deleted');
      queryClient.invalidateQueries({ predicate: () => true });
    },
    onError: () => toast.error('Could not delete cabin'),
  });
  return { remove, isPending };
}

export function useDuplicateCabin() {
  const queryClient = useQueryClient();
  const { mutate: duplicate, isPending } = useMutation({
    mutationFn: (id: string) => duplicateCabin(id),
    onSuccess: () => {
      toast.success('Cabin duplicated');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: () => toast.error('Could not duplicate cabin'),
  });
  return { duplicate, isPending };
}
