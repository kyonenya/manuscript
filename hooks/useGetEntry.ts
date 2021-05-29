import { useQuery, useQueryClient, InfiniteData } from 'react-query';
import { Entry } from '../domain/Entry';
import { getEntry } from '../domain/entryUseCase';

export const useGetEntry = (props: { uuid?: string }) => {
  const queryClient = useQueryClient();
  return useQuery(
    ['entry', { uuid: props.uuid }],
    () => getEntry({ uuid: props.uuid! }),
    {
      enabled: !!props.uuid,
      initialData: queryClient
        .getQueryData<InfiniteData<Entry>>([
          'entries',
          { keyword: queryClient.getQueryData('currentKeyword') },
        ])
        ?.pages.flat()
        .find((entry) => entry.uuid === props.uuid),
    }
  );
};
