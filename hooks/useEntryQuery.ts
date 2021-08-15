/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery, useQueryClient, InfiniteData } from 'react-query';
import { Entry } from '../domain/Entry';
import { getEntry, GetEntryInput } from '../domain/entryUseCase';

export const useEntryQuery = (props: Partial<GetEntryInput>) => {
  const queryClient = useQueryClient();

  return useQuery(
    ['entry', { uuid: props.uuid }],
    () =>
      getEntry({
        uuid: props.uuid!,
      }),
    {
      enabled: !!props.uuid,
      initialData: queryClient
        .getQueryData<InfiniteData<Entry>>([
          'entries',
          { keyword: queryClient.getQueryData('currentSearchStr') },
        ])
        ?.pages.flat()
        .find((entry) => entry.uuid === props.uuid),
    }
  );
};
