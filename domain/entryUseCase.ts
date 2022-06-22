import { useState } from 'react';
import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
  InfiniteData,
} from 'react-query';
import { z } from 'zod';
import { fetcher } from '../infra/fetcher';
import { entriesQueue } from '../infra/queue';
import { Entry } from './Entry';
import { SearchQuery } from './SearchQuery';

const queryKey = {
  currentSearch: 'currentSearch',
  entries: 'entries',
  searchedEntries: ({ keyword, tag }: { keyword?: string; tag?: string }) => [
    'entries',
    { keyword, tag },
  ],
  entry: (uuid: string | undefined) => ['entry', { uuid }],
  tagList: 'tagList',
};

const entryObject = z.object({
  text: z.string(),
  starred: z.boolean(),
  uuid: z.string(),
  tags: z.array(z.string()),
  createdAt: z.string(),
  modifiedAt: z.string(),
});

/** currentSearchStr */
export const useCurrentSearchStr = () => {
  const queryClient = useQueryClient();
  const [searchStr, setSearchStr] = useState<string | undefined>(
    queryClient.getQueryData<string>(queryKey.currentSearch)
  );
  const setCurrentSearchStr = (rawStr: string | undefined) => {
    const searchStr = rawStr === '' ? undefined : rawStr;
    setSearchStr(searchStr);
    queryClient.setQueryData(queryKey.currentSearch, searchStr);
  };

  return { searchStr, setSearchStr: setCurrentSearchStr };
};

/**
 * Query
 */
/** getEntries */
export const GetEntriesRequest = z.object({
  keyword: z.string().optional(),
  tag: z.string().optional(),
  limit: z.number(),
  offset: z.number(),
});
export type GetEntriesInput = z.infer<typeof GetEntriesRequest>;
export type GetEntries = (input: GetEntriesInput) => Promise<Entry[]>;

const getEntries = fetcher<GetEntries>('/api/getEntries');

export const useEntriesQuery = (props: {
  searchQuery: SearchQuery | undefined;
  limit: number;
}) => {
  const { keyword, tag } = props.searchQuery ?? {};
  return useInfiniteQuery(
    queryKey.searchedEntries({ keyword, tag }),
    ({ pageParam = 0 }) =>
      getEntries({
        keyword,
        tag,
        limit: props.limit,
        offset: pageParam * props.limit,
      }),
    { getNextPageParam: (lastPage, pages) => pages.length }
  );
};

/** getEntry */
export const GetEntryRequest = z.object({ uuid: z.string() });
export type GetEntryInput = z.infer<typeof GetEntryRequest>;
export type GetEntry = (input: GetEntryInput) => Promise<Entry | undefined>;

const getEntry = fetcher<GetEntry>('/api/getEntry');

export const useEntryQuery = (props: Partial<GetEntryInput>) => {
  const queryClient = useQueryClient();
  return useQuery(
    queryKey.entry(props.uuid),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => getEntry({ uuid: props.uuid! }), // non-null because enabled
    {
      enabled: !!props.uuid,
      initialData: queryClient
        .getQueryData<InfiniteData<Entry>>(
          queryKey.searchedEntries({
            keyword: queryClient.getQueryData(queryKey.currentSearch),
          })
        )
        ?.pages.flat()
        .find((entry) => entry.uuid === props.uuid),
    }
  );
};

/** getTagList */
export type GetTagList = () => Promise<string[]>;

const getTagList = fetcher<GetTagList>('/api/getTagList');

export const useTagListQuery = () =>
  useQuery(queryKey.tagList, () => getTagList());

/**
 * Mutation
 */
/** createEntries */
export const CreateEntriesRequest = z.object({ entries: z.array(entryObject) });
export type CreateEntriesInput = z.infer<typeof CreateEntriesRequest>;
export type CreateEntries = (input: CreateEntriesInput) => Promise<void>;

const createEntries = fetcher<CreateEntries>('/api/createEntries');

export const createEntriesQueued = async (input: CreateEntriesInput) =>
  await entriesQueue({
    func: createEntries,
    entries: input.entries,
    each: 300,
    concurrency: 4,
  });

export const useCreateEntriesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (input: CreateEntriesInput) => createEntriesQueued(input),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey.entries),
    }
  );
};

/** updateEntry */
export const UpdateEntryRequest = z.object({ entry: entryObject });
export type UpdateEntryInput = z.infer<typeof UpdateEntryRequest>;
export type UpdateEntry = (input: UpdateEntryInput) => Promise<void>;

const updateEntry = fetcher<UpdateEntry>('/api/updateEntry');

export const useUpdateEntryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((input: UpdateEntryInput) => updateEntry(input), {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(variables.entry.uuid);
      queryClient.invalidateQueries(queryKey.entries);
    },
  });
};

/** deleteEntry */
export const DeleteEntryRequest = z.object({ uuid: z.string() });
export type DeleteEntryInput = z.infer<typeof DeleteEntryRequest>;
export type DeleteEntry = (input: DeleteEntryInput) => Promise<void>;

const deleteEntry = fetcher<DeleteEntry>('/api/deleteEntry');

export const useDeleteEntryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((input: DeleteEntryInput) => deleteEntry(input), {
    onSuccess: () => queryClient.invalidateQueries(queryKey.entries),
  });
};

/** deleteAllEntries */
export type DeleteAllEntries = () => Promise<void>;

const deleteAllEntries = fetcher<DeleteAllEntries>('/api/deleteAllEntries');

export const useDeleteAllEntriesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteAllEntries, {
    onSuccess: () => queryClient.invalidateQueries(queryKey.entries),
  });
};
