import { useState } from 'react';
import { useQueryClient } from 'react-query';

export const useCurrentKeyword = () => {
  const queryClient = useQueryClient();
  const [keyword, setKeyword] = useState<string | undefined>(
    queryClient.getQueryData<string>('currentKeyword')
  );
  const setCurrentKeyword = (rawKeyword: string | undefined) => {
    const keyword = rawKeyword === '' ? undefined : rawKeyword;
    setKeyword(keyword);
    queryClient.setQueryData('currentKeyword', keyword);
  };
  return { keyword, setKeyword: setCurrentKeyword };
};
