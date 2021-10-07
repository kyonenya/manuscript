import { CreateEntries, CreateEntriesRequest } from '../../domain/entryUseCase';
import { apiFactory } from '../../infra/apiFactory';
import { createMany } from '../../infra/entryRepository';

const createEntries: CreateEntries = async (input) => {
  await createMany(input);
};

export const config = {
  api: {
    bodyParser: { sizeLimit: '100mb' },
  },
};

export default apiFactory(createEntries, CreateEntriesRequest);
