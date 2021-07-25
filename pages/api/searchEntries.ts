import { SearchEntries, SearchEntriesRequest } from '../../domain/entryUseCase';
import { apiFactory } from '../../infra/apiFactory';
import { selectByKeyword, selectByTag } from '../../infra/entryRepository';

const searchEntries: SearchEntries = (input) => {
  if (input.tag) return selectByTag({ tag: input.tag, ...input });
  return selectByKeyword(input);
};

export default apiFactory(searchEntries, SearchEntriesRequest);
