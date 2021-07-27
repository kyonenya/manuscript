import { useState } from 'react';
import { useQueryClient } from 'react-query';

const queryKey = 'currentSearchStr';

export const useCurrentSearchStr = () => {
  const queryClient = useQueryClient();
  const [searchStr, setSearchStr] = useState<string | undefined>(
    queryClient.getQueryData<string>(queryKey)
  );
  const setCurrentSearchStr = (rawStr: string | undefined) => {
    const searchStr = rawStr === '' ? undefined : rawStr;
    setSearchStr(searchStr);
    queryClient.setQueryData(queryKey, searchStr);
  };

  return { searchStr, setSearchStr: setCurrentSearchStr };
};
