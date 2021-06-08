import { DeleteEntry, DeleteEntryRequest } from '../../domain/entryUseCase';
import { apiFactory } from '../../infra/apiFactory';
import { deleteOne } from '../../infra/entryRepository';

const deleteEntry: DeleteEntry = async (input) => {
  await deleteOne(input);
};

export default apiFactory(deleteEntry, DeleteEntryRequest);
