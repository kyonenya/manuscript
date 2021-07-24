import { useMutation } from 'react-query';
import * as entryUseCase from '../domain/entryUseCase';

export const useDeleteEntryMutation = () => {
  return useMutation((input: entryUseCase.DeleteEntryInput) =>
    entryUseCase.deleteEntry(input)
  );
};

export const useUpdateEntryMutation = () => {
  return useMutation((input: entryUseCase.UpdateEntryInput) =>
    entryUseCase.updateEntry(input)
  );
};
