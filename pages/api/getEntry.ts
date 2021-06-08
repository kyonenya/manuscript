import { GetEntry, GetEntryRequest } from '../../domain/entryUseCase';
import { apiFactory } from '../../infra/apiFactory';
import { selectOne } from '../../infra/entryRepository';

const getEntry: GetEntry = (input) => selectOne(input);

export default apiFactory(getEntry, GetEntryRequest);
