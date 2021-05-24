import { useQuery, useQueryClient, InfiniteData } from 'react-query';
import { Entry } from '../app/Entry';
import { getEntryEndpoint, GetEntry } from '../app/entryUseCase';
import { fetcher } from '../infra/fetcher';

const fetchGetEntry = fetcher<GetEntry>(getEntryEndpoint);

export const useGetEntry = ({ uuid }: { uuid?: string }) => {
  const queryClient = useQueryClient();
  return useQuery(
    ['entry', { uuid }],
    () => {
      if (!uuid) return;
      const result = fetchGetEntry({ uuid });
      return result;
    },
    {
      enabled: !!uuid,
      initialData: queryClient
        .getQueryData<InfiniteData<Entry>>([
          'entries',
          { keyword: queryClient.getQueryData('currentKeyword') },
        ])
        ?.pages.flat()
        .find((entry) => entry.uuid === uuid),
    }
  );
};
