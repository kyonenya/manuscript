import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import * as entryRepository from '../../../infra/entryRepository';

const entryObject = z.object({
  text: z.string(),
  starred: z.boolean(),
  uuid: z.string(),
  tags: z.array(z.string()),
  createdAt: z.string(),
  modifiedAt: z.string(),
});

export const appRouter = trpc
  .router()
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      };
    },
  })
  .query('getEntry', {
    input: z.object({ uuid: z.string() }),
    resolve: ({ input }) => entryRepository.readOne(input),
  });

// export type definition of API
export type AppRouter = typeof appRouter;
// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
