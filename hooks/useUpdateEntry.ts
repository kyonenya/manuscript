import { useMutation, useQueryClient } from 'react-query';
import { Entry } from '../domain/Entry';
import { updateEntry } from '../domain/entryUseCase';

export const useUpdateEntry = (props: { entry: Entry | undefined }) => {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      if (!props.entry) return;
      await updateEntry({ ...props.entry });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('entries'); // TODO entryもinvalidate
      },
    }
  );
};
