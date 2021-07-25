import { useQuery, useMutation } from 'react-query';
import { z } from 'zod';
import { fetcher } from '../infra/fetcher';
import { Entry } from './Entry';

/**
 * Query
 */
/** searchEntries */
export const SearchEntriesRequest = z.object({
  keyword: z.string().optional(),
  limit: z.number(),
  offset: z.number(),
});
export type SearchEntriesInput = z.infer<typeof SearchEntriesRequest>;

export type SearchEntries = (input: SearchEntriesInput) => Promise<Entry[]>;

export const searchEntries = fetcher<SearchEntries>('/api/searchEntries');

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
/** updateEntry */
export const UpdateEntryRequest = z.object({
  text: z.string(),
  starred: z.boolean(),
  uuid: z.string(),
  tags: z.array(z.string()),
  createdAt: z.string(),
  modifiedAt: z.string(),
});
export type UpdateEntryInput = z.infer<typeof UpdateEntryRequest>;

export type UpdateEntry = (input: UpdateEntryInput) => Promise<void>;

export const updateEntry = fetcher<UpdateEntry>('/api/updateEntry');

export const useUpdateEntryMutation = () => {
  return useMutation((input: UpdateEntryInput) => updateEntry(input));
};

/** deleteEntry */
export const DeleteEntryRequest = z.object({
  uuid: z.string(),
});
export type DeleteEntryInput = z.infer<typeof DeleteEntryRequest>;

export type DeleteEntry = (input: DeleteEntryInput) => Promise<void>;

export const deleteEntry = fetcher<DeleteEntry>('/api/deleteEntry');

export const useDeleteEntryMutation = () => {
  return useMutation((input: DeleteEntryInput) => deleteEntry(input));
};
