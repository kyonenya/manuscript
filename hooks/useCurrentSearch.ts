import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { newSearchQuery } from '../domain/SearchQuery';
import { queryKeys } from '../domain/queryKeys';

export const useCurrentSearch = () => {
  const queryClient = useQueryClient();
  const [searchStr, setSearchStr] = useState<string | undefined>(
    queryClient.getQueryData<string>(queryKeys.currentSearchStr)
  );
  const setCurrentSearchStr = (rawStr: string | undefined) => {
    const searchStr = rawStr === '' ? undefined : rawStr;
    setSearchStr(searchStr);
    queryClient.setQueryData(queryKeys.currentSearchStr, searchStr);
  };
  const searchQuery = searchStr ? newSearchQuery(searchStr) : undefined;

  return { searchStr, searchQuery, setSearchStr: setCurrentSearchStr };
};
