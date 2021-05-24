import { useState } from 'react';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { searchEntries } from '../app/entryUseCase';

export const useSearchEntries = (props: { limit: number }) => {
  const queryClient = useQueryClient();
  const [keyword, setKeyword] = useState<string | undefined>(
    queryClient.getQueryData<string>('currentKeyword')
  );
  const result = useInfiniteQuery(
    ['entries', { keyword }],
    ({ pageParam = 0 }) => {
      queryClient.setQueryData('currentKeyword', keyword);
      return searchEntries({
        keyword: keyword ?? '',
        limit: props.limit,
        offset: pageParam * props.limit,
      });
    },
    {
      getNextPageParam: (lastPage, pages) => pages.length,
    }
  );
  return { keyword, setKeyword, ...result };
};
