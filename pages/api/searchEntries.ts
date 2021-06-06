import { NextApiHandler } from 'next';
import { SearchEntries, SearchEntriesRequest } from '../../domain/entryUseCase';
import { selectByKeyword } from '../../infra/entryRepository';

const searchEntries: SearchEntries = (input) => selectByKeyword(input);

const handler: NextApiHandler = async (req, res) => {
  const parsed = SearchEntriesRequest.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });

  await res.json(await searchEntries(parsed.data));
};

export default handler;
