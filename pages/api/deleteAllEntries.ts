import { DeleteAllEntries } from '../../domain/entryUseCase';
import { apiFactory } from '../../infra/apiFactory';
import { deleteAll } from '../../infra/entryRepository';

const deleteAllEntries: DeleteAllEntries = async () => {
  await deleteAll();
};

export default apiFactory(deleteAllEntries);
