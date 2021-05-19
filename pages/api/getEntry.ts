import { NextApiHandler, NextApiRequest } from 'next';
import { readOne } from '../../infra/entryRepository';

const validateRequest = (reqBody: NextApiRequest['body']) => {
  return {
    uuid: reqBody.uuid.toString(),
  };
};

const handler: NextApiHandler = async (req, res) => {
  const entry = await readOne(validateRequest(req.body));
  await res.json(entry);
};

export default handler;
