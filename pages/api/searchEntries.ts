import { SearchEntries, SearchEntriesRequest } from '../../domain/entryUseCase';
import { apiFactory } from '../../infra/apiFactory';
import { selectByKeyword } from '../../infra/entryRepository';

const searchEntries: SearchEntries = (input) => selectByKeyword(input);

export default apiFactory(searchEntries, SearchEntriesRequest);
