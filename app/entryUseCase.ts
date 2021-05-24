import { z } from 'zod';
import { Entry } from '../app/Entry';
import { fetcher } from '../infra/fetcher';

/**
 * getEntry
 */
export const GetEntryRequest = z.object({
  uuid: z.string(),
});
type GetEntryInput = z.infer<typeof GetEntryRequest>;

export type GetEntry = (input: GetEntryInput) => Promise<Entry>;

export const getEntry = fetcher<GetEntry>('/api/getEntry');
