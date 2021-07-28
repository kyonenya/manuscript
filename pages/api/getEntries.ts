import { GetEntries, GetEntriesRequest } from '../../domain/entryUseCase';
import { apiFactory } from '../../infra/apiFactory';
import { readByKeyword, readByTag } from '../../infra/entryRepository';

const getEntries: GetEntries = (input) => {
  if (input.tag) return readByTag({ tag: input.tag, ...input });
  return readByKeyword(input);
};

export default apiFactory(getEntries, GetEntriesRequest);
