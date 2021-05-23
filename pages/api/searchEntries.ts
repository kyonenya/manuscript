import { NextApiHandler } from 'next';
import { z } from 'zod';
import { searchKeyword } from '../../infra/entryRepository';

const Request = z.object({
  keyword: z.string().default(''),
  limit: z.number(),
  offset: z.number().default(0),
});
type Request = z.infer<typeof Request>;

const handler: NextApiHandler = async (req, res) => {
  const parsed = Request.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });
  const entries = await searchKeyword(parsed.data);
  await res.json(entries);
};

export default handler;
