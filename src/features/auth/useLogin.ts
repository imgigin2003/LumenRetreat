import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login as loginApi } from '@/services/apiAuth';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      toast.success('Welcome back to Lumen Retreat');
      navigate('/dashboard', { replace: true });
    },
    onError: () => {
      toast.error('Incorrect email or password');
    },
  });

  return { login, isPending };
}
