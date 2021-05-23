import { z } from 'zod';
import { Entry } from '../app/Entry';
import { readOne } from '../infra/entryRepository';

export const getEntryRequest = z.object({
  uuid: z.string(),
});
type getEntryInput = z.infer<typeof getEntryRequest>;

export const getEntry = (input: getEntryInput): Promise<Entry> => {
  return readOne(input);
};
