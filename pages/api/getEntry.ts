import { NextApiHandler, NextApiRequest } from 'next';
import { readOne } from '../../infra/entryRepository';
import { z } from 'zod';

const Request = z.object({
  uuid: z.string(),
});
type Request = z.infer<typeof Request>

const handler: NextApiHandler = async (req, res) => {
  const parsed = Request.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error })
  const entry = await readOne(parsed.data);
  return res.json(entry);
};

export default handler;
