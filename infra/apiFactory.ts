/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiHandler } from 'next';
import { z } from 'zod';

export const apiFactory = (
  usecase: (input: any /* Input */) => any /* Output */,
  request: z.ZodObject<any /* Input */>
): NextApiHandler => {
  const handler: NextApiHandler = async (req, res) => {
    const parsed = request.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error });
    return res.json((await usecase(parsed.data /* Input */)) ?? { ok: true });
  };
  return handler;
};
