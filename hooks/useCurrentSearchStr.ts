import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { queryKeys } from '../domain/queryKeys';

export const useCurrentSearchStr = () => {
  const queryClient = useQueryClient();
  const [searchStr, setSearchStr] = useState<string | undefined>(
    queryClient.getQueryData<string>(queryKeys.currentSearch)
  );
  const setCurrentSearchStr = (rawStr: string | undefined) => {
    const searchStr = rawStr === '' ? undefined : rawStr;
    setSearchStr(searchStr);
    queryClient.setQueryData(queryKeys.currentSearch, searchStr);
  };

  return { searchStr, setSearchStr: setCurrentSearchStr };
};
