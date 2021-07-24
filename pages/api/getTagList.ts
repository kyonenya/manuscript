import { GetTagList } from '../../domain/entryUseCase';
import { apiFactory } from '../../infra/apiFactory';
import { selectTagList } from '../../infra/entryRepository';

const getTagList: GetTagList = () => selectTagList();

export default apiFactory(getTagList);
