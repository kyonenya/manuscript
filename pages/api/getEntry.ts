import { NextApiHandler } from 'next';
import { getEntry, GetEntryRequest } from '../../app/entryUseCase';

const handler: NextApiHandler = async (req, res) => {
  const parsed = GetEntryRequest.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });
  const entry = await getEntry(parsed.data);
  return res.json(entry);
};

export default handler;
