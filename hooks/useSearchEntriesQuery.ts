import { useInfiniteQuery } from 'react-query';
import { searchEntries, SearchEntriesInput } from '../domain/entryUseCase';

export const useSearchEntriesQuery = (
  props: Omit<SearchEntriesInput, 'offset'>
) => {
  return useInfiniteQuery(
    ['entries', { keyword: props.keyword, tag: props.tag }],
    ({ pageParam = 0 }) =>
      searchEntries({
        keyword: props.keyword,
        tag: props.tag,
        limit: props.limit,
        offset: pageParam * props.limit,
      }),
    {
      getNextPageParam: (lastPage, pages) => pages.length,
    }
  );
};
