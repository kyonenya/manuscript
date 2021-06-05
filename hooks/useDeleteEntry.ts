import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { deleteEntry } from '../domain/entryUseCase';

export const useDeleteEntry = (props: { uuid: string | undefined }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    async () => {
      if (!props.uuid) return;
      await deleteEntry({ uuid: props.uuid });
    },
    {
      onSuccess: () => {
        router.push('/');
        queryClient.invalidateQueries('entries');
      },
    }
  );
};
