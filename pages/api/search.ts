import { NextApiHandler, NextApiRequest } from 'next';
import { findByKeyword } from '../../app/entryRepository';

const validateRequest = (reqBody: NextApiRequest['body']) => {
  return {
    keyword: reqBody.keyword.toString(),
    limit: parseInt(reqBody.limit.toString(), 10),
    offset: parseInt(reqBody.offset?.toString() ?? 0, 10),
  };
};

const handler: NextApiHandler = async (req, res) => {
  const entries = await findByKeyword(validateRequest(req.body));
  await res.json(entries);
};

export default handler;
