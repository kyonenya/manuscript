import { z } from 'zod';
import { Entry } from '../app/Entry';
import { readOne } from '../infra/entryRepository';

export const GetEntryRequest = z.object({
  uuid: z.string(),
});
export type GetEntryRequest = z.infer<typeof GetEntryRequest>;

export const getEntry = (input: GetEntryRequest): Promise<Entry> => {
  return readOne(input);
};
