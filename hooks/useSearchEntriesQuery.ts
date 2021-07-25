import { useInfiniteQuery } from 'react-query';
import { searchEntries } from '../domain/entryUseCase';

export const useSearchEntriesQuery = (props: {
  keyword?: string;
  limit: number;
}) => {
  return useInfiniteQuery(
    ['entries', { keyword: props.keyword }],
    ({ pageParam = 0 }) =>
      searchEntries({
        keyword: props.keyword,
        limit: props.limit,
        offset: pageParam * props.limit,
      }),
    {
      getNextPageParam: (lastPage, pages) => pages.length,
    }
  );
};
