import { GetTagList } from '../../domain/entryUseCase';
import { apiFactory } from '../../infra/apiFactory';
import { readTagList } from '../../infra/entryRepository';

const getTagList: GetTagList = () => readTagList();

export default apiFactory(getTagList);
