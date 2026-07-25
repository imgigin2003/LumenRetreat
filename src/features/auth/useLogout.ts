import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { logout as logoutApi } from '@/services/apiAuth';

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success('Signed out');
      navigate('/login', { replace: true });
    },
    onError: () => toast.error('Could not sign out'),
  });

  return { logout, isPending };
}
