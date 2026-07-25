import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateCurrentUser } from '@/services/apiAuth';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success('Account updated');
      queryClient.setQueryData(['user'], user);
    },
    onError: (err: Error) => toast.error(err.message || 'Could not update account'),
  });

  return { updateUser, isPending };
}
