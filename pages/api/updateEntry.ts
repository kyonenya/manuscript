import { UpdateEntry, UpdateEntryRequest } from '../../domain/entryUseCase';
import { apiFactory } from '../../infra/apiFactory';
import { updateOne } from '../../infra/entryRepository';

const updateEntry: UpdateEntry = async (input) => {
  await updateOne(input);
};

export default apiFactory(updateEntry, UpdateEntryRequest);
