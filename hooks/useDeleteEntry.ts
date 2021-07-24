import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { deleteEntry, DeleteEntryInput } from '../domain/entryUseCase';

export const useDeleteEntry = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    async (props: DeleteEntryInput) => {
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
