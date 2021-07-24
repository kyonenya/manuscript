import { useQuery } from 'react-query';
import { getTagList } from '../domain/entryUseCase';

export const useTagListQuery = () => {
  return useQuery(['tagList'], () => getTagList());
};
