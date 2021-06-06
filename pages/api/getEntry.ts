import { NextApiHandler } from 'next';
import { GetEntry, GetEntryRequest } from '../../domain/entryUseCase';
import { selectOne } from '../../infra/entryRepository';

const getEntry: GetEntry = (input) => selectOne(input);

const handler: NextApiHandler = async (req, res) => {
  const parsed = GetEntryRequest.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });

  return res.json(await getEntry(parsed.data));
};

export default handler;
