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
  .query('getEntry', {
    input: z.object({ uuid: z.string() }),
    resolve: async ({ input }) => await entryRepository.readOne(input),
  })
  .query('getEntries', {
    input: z.object({
      limit: z.number(),
      keyword: z.string().optional(),
      tag: z.string().optional(),
      cursor: z.number().default(0), // pageParam (auto-generated)
    }),
    resolve: async ({ input }) => {
      const offset = input.cursor * input.limit;
      if (input.tag)
        return await entryRepository.readByTag({
          ...input,
          tag: input.tag,
          offset,
        });
      return await entryRepository.readByKeyword({ ...input, offset });
    },
  })
  .query('getTagList', {
    resolve: async () => await entryRepository.readTagList(),
  })
  .mutation('createEntries', {
    input: z.object({ entries: z.array(entryObject) }),
    resolve: async ({ input }) => await entryRepository.createMany(input),
  })
  .mutation('updateEntry', {
    input: z.object({ entry: entryObject }),
    resolve: async ({ input }) => await entryRepository.updateOne(input),
  })
  .mutation('deleteEntry', {
    input: z.object({ uuid: z.string() }),
    resolve: async ({ input }) => await entryRepository.deleteOne(input),
  })
  .mutation('deleteAllEntries', {
    resolve: async () => await entryRepository.deleteAll(),
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});

export const config = {
  api: {
    bodyParser: { sizeLimit: '100mb' },
  },
};
