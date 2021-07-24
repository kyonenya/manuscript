import { z } from 'zod';
import { fetcher } from '../infra/fetcher';
import { Entry } from './Entry';

/**
 * Query
 */
/** searchEntries */
export const SearchEntriesRequest = z.object({
  keyword: z.string(),
  limit: z.number(),
  offset: z.number(),
});
type SearchEntriesInput = z.infer<typeof SearchEntriesRequest>;

export type SearchEntries = (input: SearchEntriesInput) => Promise<Entry[]>;

export const searchEntries = fetcher<SearchEntries>('/api/searchEntries');

/** getEntry */
export const GetEntryRequest = z.object({
  uuid: z.string(),
});
type GetEntryInput = z.infer<typeof GetEntryRequest>;

export type GetEntry = (input: GetEntryInput) => Promise<Entry | undefined>;

export const getEntry = fetcher<GetEntry>('/api/getEntry');

/** getTagList */
export type GetTagList = () => Promise<string[]>;

export const getTagList = fetcher<GetTagList>('/api/getTagList');

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
type UpdateEntryInput = z.infer<typeof UpdateEntryRequest>;

export type UpdateEntry = (input: UpdateEntryInput) => Promise<void>;

export const updateEntry = fetcher<UpdateEntry>('/api/updateEntry');

/** deleteEntry */
export const DeleteEntryRequest = z.object({
  uuid: z.string(),
});
type DeleteEntryInput = z.infer<typeof DeleteEntryRequest>;

export type DeleteEntry = (input: DeleteEntryInput) => Promise<void>;

export const deleteEntry = fetcher<DeleteEntry>('/api/deleteEntry');
