import { GetEntry, GetEntryRequest } from '../../domain/entryUseCase';
import { apiFactory } from '../../infra/apiFactory';
import { readOne } from '../../infra/entryRepository';

const getEntry: GetEntry = (input) => readOne(input);

export default apiFactory(getEntry, GetEntryRequest);
