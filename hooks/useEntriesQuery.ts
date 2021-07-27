import { useInfiniteQuery } from 'react-query';
import { SearchQuery } from '../domain/SearchQuery';
import { getEntries } from '../domain/entryUseCase';

export const useEntriesQuery = (props: {
  searchQuery: SearchQuery | undefined;
  limit: number;
}) => {
  const { keyword, tag } = props.searchQuery ?? {};

  return useInfiniteQuery(
    ['entries', { keyword, tag }],
    ({ pageParam = 0 }) =>
      getEntries({
        keyword,
        tag,
        limit: props.limit,
        offset: pageParam * props.limit,
      }),
    {
      getNextPageParam: (lastPage, pages) => pages.length,
    }
  );
};
