import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateSettings } from '@/services/apiSettings';

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: update, isPending } = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      toast.success('Settings updated');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: () => toast.error('Could not update settings'),
  });

  return { update, isPending };
}
