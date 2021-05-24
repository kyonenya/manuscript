import { useQuery, useQueryClient, InfiniteData } from 'react-query';
import { Entry } from '../app/Entry';

export const useGetEntry = ({ uuid }: { uuid?: string }) => {
  const queryClient = useQueryClient();
  return useQuery<Entry>(
    ['entry', { uuid }],
    async () => {
      const res = await fetch('/api/getEntry', {
        method: 'POST',
        body: JSON.stringify({ uuid }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
      });
      if (!res.ok) throw new Error(res.statusText);
      return await res.json();
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
