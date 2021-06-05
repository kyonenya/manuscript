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

/**
 * Mutation
 */
/** deleteEntry */
export const DeleteEntryRequest = z.object({
  uuid: z.string(),
});
type DeleteEntryInput = z.infer<typeof DeleteEntryRequest>;

export type DeleteEntry = (input: DeleteEntryInput) => Promise<void>;

export const deleteEntry = fetcher<DeleteEntry>('/api/deleteEntry');
