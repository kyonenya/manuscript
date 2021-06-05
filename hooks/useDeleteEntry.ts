import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { deleteEntry } from '../domain/entryUseCase';

export const useDeleteEntry = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation((v: { uuid: string }) => deleteEntry(v), {
    onMutate: () => {
      router.push('/');
      queryClient.invalidateQueries('entries')
    },
    onError: (e) => console.log(e),
  });
};
