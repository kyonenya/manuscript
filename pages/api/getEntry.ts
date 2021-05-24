import { NextApiHandler } from 'next';
import { GetEntry, GetEntryRequest } from '../../app/entryUseCase';
import { readOne } from '../../infra/entryRepository';

const getEntry: GetEntry = (input) => {
  return readOne(input);
};

const handler: NextApiHandler = async (req, res) => {
  const parsed = GetEntryRequest.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });
  const entry = await getEntry(parsed.data);
  return res.json(entry);
};

export default handler;
