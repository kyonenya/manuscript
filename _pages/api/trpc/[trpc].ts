import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import * as entryRepository from '../../../infra/entryRepository';
import { router, publicProcedure } from '../../../infra/trpc';

const entryObject = z.object({
  text: z.string(),
  starred: z.boolean(),
  uuid: z.string(),
  tags: z.array(z.string()),
  createdAt: z.string(),
  modifiedAt: z.string(),
});

export const appRouter = router({
  getEntry: publicProcedure
    .input(z.object({ uuid: z.string() }))
    .query(async ({ input }) => await entryRepository.readOne(input)),
  getEntries: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        keyword: z.string().optional(),
        tag: z.string().optional(),
        cursor: z.number().default(0), // pageParam (auto-generated)
      })
    )
    .query(async ({ input }) => {
      const offset = input.cursor * input.limit;
      if (input.tag)
        return await entryRepository.readMany({
          ...input,
          tag: input.tag,
          offset,
        });
      return await entryRepository.readMany({ ...input, offset });
    }),

  getTagList: publicProcedure.query(
    async () => await entryRepository.readTagList()
  ),
  createEntries: publicProcedure
    .input(z.object({ entries: z.array(entryObject) }))
    .mutation(async ({ input }) => await entryRepository.createMany(input)),
  updateEntry: publicProcedure
    .input(z.object({ entry: entryObject }))
    .mutation(async ({ input }) => await entryRepository.updateOne(input)),
  deleteEntry: publicProcedure
    .input(z.object({ uuid: z.string() }))
    .mutation(async ({ input }) => await entryRepository.deleteOne(input)),
  deleteAllEntries: publicProcedure.mutation(
    async () => await entryRepository.deleteAll()
  ),
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});

export const config = {
  api: {
    bodyParser: { sizeLimit: '100mb' },
  },
};
