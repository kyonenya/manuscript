import { useQuery } from 'react-query';
import * as entryUseCase from '../domain/entryUseCase';

export const useTagListQuery = () => {
  return useQuery(['tagList'], () => entryUseCase.getTagList());
};
