import { NextApiHandler } from 'next';
import { DeleteEntry, DeleteEntryRequest } from '../../domain/entryUseCase';
import { deleteOne } from '../../infra/entryRepository';

const deleteEntry: DeleteEntry = async (input) => {
  await deleteOne(input);
};

const handler: NextApiHandler = async (req, res) => {
  const parsed = DeleteEntryRequest.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });

  return res.json(await deleteEntry(parsed.data));
};

export default handler;
