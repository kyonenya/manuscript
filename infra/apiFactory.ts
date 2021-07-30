/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiHandler } from 'next';
import { z } from 'zod';

export const apiFactory = (
  usecase: (input?: any /* Input */) => Promise<any /* Output */>,
  request?: z.ZodTypeAny /* Input */
): NextApiHandler => {
  const handler: NextApiHandler = async (req, res) => {
    if (!request) {
      const result = await usecase();
      return res.json(result ?? { ok: true });
    }
    const parsed = request.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error });
    const result /* Output */ = await usecase(parsed.data /* Input */);
    return res.json(result ?? { ok: true });
  };
  return handler;
};
