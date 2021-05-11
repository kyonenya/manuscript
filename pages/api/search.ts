import { NextApiHandler } from 'next';
import { findByKeyword } from '../../app/entryRepository';

const handler: NextApiHandler = async (req, res) => {
  const keyword = decodeURIComponent(req.query.q.toString());
  const limit = parseInt(req.query.limit.toString(), 10);
  const entries = await findByKeyword({ keyword, limit });
  await res.json(entries);
};

export default handler;
