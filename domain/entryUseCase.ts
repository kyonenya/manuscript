import { z } from 'zod';
import { Entry } from './Entry';
import { fetcher } from '../infra/fetcher';

/**
 * searchEntries
 */
export const SearchEntriesRequest = z.object({
  keyword: z.string(),
  limit: z.number(),
  offset: z.number(),
});
type SearchEntriesInput = z.infer<typeof SearchEntriesRequest>;

export type SearchEntries = (input: SearchEntriesInput) => Promise<Entry[]>;

export const searchEntries = fetcher<SearchEntries>('/api/searchEntries');

/**
 * getEntry
 */
export const GetEntryRequest = z.object({
  uuid: z.string(),
});
type GetEntryInput = z.infer<typeof GetEntryRequest>;

export type GetEntry = (input: GetEntryInput) => Promise<Entry>;

export const getEntry = fetcher<GetEntry>('/api/getEntry');
