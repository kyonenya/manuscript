import { useInfiniteQuery } from 'react-query';
import { SearchQuery } from '../domain/SearchQuery';
import { searchEntries } from '../domain/entryUseCase';

export const useSearchEntriesQuery = (props: {
  searchQuery: SearchQuery;
  limit: number;
}) => {
  const { keyword, tag } = props.searchQuery;

  return useInfiniteQuery(
    ['entries', { keyword, tag }],
    ({ pageParam = 0 }) =>
      searchEntries({
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
