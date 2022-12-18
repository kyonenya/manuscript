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

/** deleteAllEntries */
export type DeleteAllEntries = () => Promise<void>;

const deleteAllEntries = fetcher<DeleteAllEntries>('/api/deleteAllEntries');

export const useDeleteAllEntriesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteAllEntries, {
    onSuccess: () => queryClient.invalidateQueries(queryKey.entries),
  });
};
