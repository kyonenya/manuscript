import { useQuery, useQueryClient, InfiniteData } from 'react-query';
import { Entry } from '../domain/Entry';
import { getEntry, GetEntryInput } from '../domain/entryUseCase';

export const useEntryQuery = (props: GetEntryInput) => {
  const queryClient = useQueryClient();
  return useQuery(['entry', { uuid: props.uuid }], () => getEntry(props), {
    initialData: queryClient
      .getQueryData<InfiniteData<Entry>>([
        'entries',
        { keyword: queryClient.getQueryData('currentSearchStr') }, // TODO: query key
      ])
      ?.pages.flat()
      .find((entry) => entry.uuid === props.uuid),
  });
};
