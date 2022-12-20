import { useAtom } from 'jotai';
import { newSearchQuery } from '../domain/SearchQuery';
import { searchStrAtom } from '../domain/atoms';

export const useCurrentSearch = () => {
  const [searchStr, setSearchStr] = useAtom(searchStrAtom);
  return {
    searchStr,
    searchQuery: searchStr ? newSearchQuery(searchStr) : undefined,
    setSearchStr: (rawStr: string | undefined) =>
      setSearchStr(rawStr === '' ? undefined : rawStr),
    limit: 40,
  };
};
