import { useMutation } from 'react-query';
import { deleteEntry } from '../domain/entryUseCase';

export const useDeleteEntry = (props: { uuid: string }) => {
  return useMutation(() => deleteEntry(props), {
    // TODO: back to top
    onSuccess: () => console.log('Success'),
  });
};
