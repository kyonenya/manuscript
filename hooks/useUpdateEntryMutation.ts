import { useMutation, useQueryClient } from 'react-query';
import { Entry } from '../domain/Entry';
import { updateEntry } from '../domain/entryUseCase';

export const useUpdateEntryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (entry: Entry) => {
      await updateEntry(entry);
    },
    {
      onSuccess: (_, entry) => {
        queryClient.invalidateQueries(['entry', { uuid: entry.uuid }]);
        queryClient.invalidateQueries(['entries']);
      },
    }
  );
};
