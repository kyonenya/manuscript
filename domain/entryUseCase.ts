import { useQuery, useMutation, QueryClient } from 'react-query';
import { z } from 'zod';
import { fetcher } from '../infra/fetcher';
import { entriesQueue } from '../infra/queue';
import { Entry } from './Entry';

const entryObject = z.object({
  text: z.string(),
  starred: z.boolean(),
  uuid: z.string(),
  tags: z.array(z.string()),
  createdAt: z.string(),
  modifiedAt: z.string(),
});

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

export const getEntries = fetcher<GetEntries>('/api/getEntries');

/** getEntry */
export const GetEntryRequest = z.object({ uuid: z.string() });
export type GetEntryInput = z.infer<typeof GetEntryRequest>;

export type GetEntry = (input: GetEntryInput) => Promise<Entry | undefined>;

export const getEntry = fetcher<GetEntry>('/api/getEntry');

/** getTagList */
export type GetTagList = () => Promise<string[]>;

const getTagList = fetcher<GetTagList>('/api/getTagList');

export const useTagListQuery = () => useQuery(['tagList'], () => getTagList());

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

export const useCreateEntriesMutation = (queryClient: QueryClient) =>
  useMutation((input: CreateEntriesInput) => createEntriesQueued(input), {
    onSuccess: () => queryClient.invalidateQueries('entries'),
  });

/** updateEntry */
export const UpdateEntryRequest = z.object({ entry: entryObject });
export type UpdateEntryInput = z.infer<typeof UpdateEntryRequest>;

export type UpdateEntry = (input: UpdateEntryInput) => Promise<void>;

const updateEntry = fetcher<UpdateEntry>('/api/updateEntry');

export const useUpdateEntryMutation = (queryClient: QueryClient) =>
  useMutation((input: UpdateEntryInput) => updateEntry(input), {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['entry', { uuid: variables.entry.uuid }]);
      queryClient.invalidateQueries('entries');
    },
  });

/** deleteEntry */
export const DeleteEntryRequest = z.object({ uuid: z.string() });
export type DeleteEntryInput = z.infer<typeof DeleteEntryRequest>;

export type DeleteEntry = (input: DeleteEntryInput) => Promise<void>;

const deleteEntry = fetcher<DeleteEntry>('/api/deleteEntry');

export const useDeleteEntryMutation = (queryClient: QueryClient) =>
  useMutation((input: DeleteEntryInput) => deleteEntry(input), {
    onSuccess: () => queryClient.invalidateQueries('entries'),
  });

/** deleteAllEntries */
export type DeleteAllEntries = () => Promise<void>;

const deleteAllEntries = fetcher<DeleteAllEntries>('/api/deleteAllEntries');

export const useDeleteAllEntriesMutation = (queryClient: QueryClient) =>
  useMutation(deleteAllEntries, {
    onSuccess: () => queryClient.invalidateQueries('entries'),
  });
