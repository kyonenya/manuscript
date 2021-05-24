import { z } from 'zod';
import { Entry } from '../app/Entry';
import * as entryRepository from '../infra/entryRepository';

/**
 * getEntry
 */
export const getEntryEndpoint = '/api/getEntry';

export const GetEntryRequest = z.object({
  uuid: z.string(),
});
type GetEntryRequest = z.infer<typeof GetEntryRequest>;

export type GetEntry = (req: GetEntryRequest) => Promise<Entry>;

export const getEntry: GetEntry = (input) => {
  return entryRepository.readOne(input);
};
