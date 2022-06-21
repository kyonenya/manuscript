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
export const GetEntryRequest = z.object({
  uuid: z.string(),
});
export type GetEntryInput = z.infer<typeof GetEntryRequest>;

export type GetEntry = (input: GetEntryInput) => Promise<Entry | undefined>;

export const getEntry = fetcher<GetEntry>('/api/getEntry');

/** getTagList */
export type GetTagList = () => Promise<string[]>;

export const getTagList = fetcher<GetTagList>('/api/getTagList');

export const useTagListQuery = () => useQuery(['tagList'], () => getTagList());

/**
 * Mutation
 */
/** createEntries */
export const CreateEntriesRequest = z.object({ entries: z.array(entryObject) });
export type CreateEntriesInput = z.infer<typeof CreateEntriesRequest>;

export type CreateEntries = (input: CreateEntriesInput) => Promise<void>;

export const createEntries = fetcher<CreateEntries>('/api/createEntries');

//export const useCreateEntriesMutation = () =>
//  useMutation((input: CreateEntriesInput) => createEntries(input));

/** createEntriesQueue */
export const CreateEntriesQueueRequest = CreateEntriesRequest;
export type CreateEntriesQueueInput = CreateEntriesInput;

export type CreateEntriesQueue = CreateEntries;

export const createEntriesQueue = async (input: CreateEntriesQueueInput) =>
  await entriesQueue({
    func: fetcher<CreateEntriesQueue>('/api/createEntries'),
    entries: input.entries,
    each: 300,
    concurrency: 3,
  });

export const useCreateEntriesQueueMutation = () =>
  useMutation((input: CreateEntriesQueueInput) => createEntriesQueue(input));

/** updateEntry */
export const UpdateEntryRequest = z.object({ entry: entryObject });
export type UpdateEntryInput = z.infer<typeof UpdateEntryRequest>;

export type UpdateEntry = (input: UpdateEntryInput) => Promise<void>;

export const updateEntry = fetcher<UpdateEntry>('/api/updateEntry');

export const useUpdateEntryMutation = (queryClient: QueryClient) =>
  useMutation((input: UpdateEntryInput) => updateEntry(input), {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['entry', { uuid: variables.entry.uuid }]);
      queryClient.invalidateQueries('entries');
    },
  });

/** deleteEntry */
export const DeleteEntryRequest = z.object({
  uuid: z.string(),
});
export type DeleteEntryInput = z.infer<typeof DeleteEntryRequest>;

export type DeleteEntry = (input: DeleteEntryInput) => Promise<void>;

export const deleteEntry = fetcher<DeleteEntry>('/api/deleteEntry');

export const useDeleteEntryMutation = (queryClient: QueryClient) =>
  useMutation((input: DeleteEntryInput) => deleteEntry(input), {
    onSuccess: () => queryClient.invalidateQueries('entries'),
  });

/** deleteAllEntries */
export type DeleteAllEntries = () => Promise<void>;

export const deleteAllEntries = fetcher<DeleteAllEntries>(
  '/api/deleteAllEntries'
);

export const useDeleteAllEntriesMutation = (queryClient: QueryClient) =>
  useMutation(deleteAllEntries, {
    onSuccess: () => queryClient.invalidateQueries('entries'),
  });
