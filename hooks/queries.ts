import { useQuery } from 'react-query';
import * as entryUseCase from '../domain/entryUseCase';

export const useTagListQuery = () =>
  useQuery(['tagList'], () => entryUseCase.getTagList());
