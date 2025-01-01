import { Prisma } from '@prisma/client';
import { Entry as PrismaEntry, Tag, PrismaPromise } from '@prisma/client';
import { Entry, newEntry, extractTagHistory } from '../domain/Entry';
import { entriesTagToABs } from '../domain/Tag';
import { prisma } from './prisma';

const toEntry = (row: PrismaEntry & { tags: Tag[] }): Entry =>
  newEntry({
    text: row.text,
    starred: row.starred,
    uuid: row.uuid,
    tags: row.tags?.map((tag) => tag.name),
    createdAt: row.created_at.toISOString(),
    modifiedAt: row.modified_at.toISOString(),
  });

/**
 * Query
 */
export const readMany = async (props: {
  tag?: string;
  keyword?: string;
  since?: string;
  until?: string;
  limit: number;
  offset?: number;
}): Promise<Entry[]> => {
  const rows = await prisma.entry.findMany({
    where: {
      ...(props.keyword ? { text: { contains: props.keyword } } : {}),
      ...(props.tag ? { tags: { some: { name: { equals: props.tag } } } } : {}),
      ...(props.since || props.until
        ? {
            created_at: {
              ...(props.since ? { gte: props.since } : {}),
              ...(props.until ? { lt: props.until } : {}),
            },
          }
        : {}),
    },
    take: props.limit,
    skip: props.offset,
    orderBy: { created_at: 'desc' },
    include: { tags: true },
  });
  return rows.map((row) => toEntry(row));
};

export const readOne = async (props: {
  uuid: string;
}): Promise<Entry | undefined> => {
  const row = await prisma.entry.findUnique({
    where: { uuid: props.uuid.toUpperCase() },
    include: { tags: true },
  });
  return row ? toEntry(row) : undefined;
};

export async function readAllUuids(): Promise<string[]> {
  const entries = await prisma.entry.findMany({
    select: { uuid: true }, // uuid only
  });
  return entries.map((entry) => entry.uuid);
}

export const readTagList = async (): Promise<string[]> => {
  const rows = await prisma.tag.findMany({});
  return rows.map((row) => row.name);
};

export const readEntriesCount = async (): Promise<number> => {
  return await prisma.entry.count();
};

/**
 * Mutation
 */
export const createOne = async (props: { entry: Entry }): Promise<Entry> => {
  const { createdAt, modifiedAt, tags, ...rest } = props.entry;
  const row = await prisma.entry.create({
    data: {
      ...rest,
      created_at: createdAt,
      modified_at: modifiedAt,
      tags: {
        connectOrCreate: tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
    include: { tags: true },
  });
  return toEntry(row);
};

export const createMany = async (props: {
  entries: Entry[];
}): Promise<number[]> => {
  await prisma.tag.createMany({
    data: extractTagHistory(props.entries).map((tag) => ({ name: tag })),
  });
  const tags = await prisma.tag.findMany({});

  const createEntry = prisma.entry.createMany({
    data: props.entries.map(
      ({ createdAt, modifiedAt, tags: _tags, ...rest }) => ({
        ...rest,
        created_at: createdAt,
        modified_at: modifiedAt,
      })
    ),
  });
  const ABs = entriesTagToABs({ entries: props.entries, tags });
  const connectEntriesToTags =
    ABs.length > 0
      ? prisma.$executeRaw`
    INSERT INTO "_EntryToTag" ("A", "B")
    VALUES ${Prisma.join(ABs.map((ab) => Prisma.sql`(${Prisma.join(ab)})`))}
    ON CONFLICT DO NOTHING;`
      : undefined;
  const [bp, tagsCount] = await prisma.$transaction(
    [createEntry, connectEntriesToTags].filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (v): v is PrismaPromise<any> => !!v
    )
  );
  return [bp.count, tagsCount ?? 0];
};

const disconnectTags = async (props: {
  uuid: string;
}): Promise<PrismaEntry & { tags: Tag[] }> => {
  return await prisma.entry.update({
    where: { uuid: props.uuid.toUpperCase() },
    data: { tags: { set: [] } },
    include: { tags: true },
  });
};

export const updateOne = async (props: { entry: Entry }): Promise<Entry> => {
  const { createdAt, modifiedAt, tags, ...rest } = props.entry;
  await disconnectTags({ uuid: props.entry.uuid.toUpperCase() });
  const row = await prisma.entry.update({
    where: { uuid: props.entry.uuid.toUpperCase() },
    data: {
      ...rest,
      created_at: createdAt,
      modified_at: modifiedAt,
      tags: {
        connectOrCreate: tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
    include: { tags: true },
  });
  return toEntry(row);
};

export const deleteOne = async (props: { uuid: string }): Promise<Entry> => {
  await disconnectTags(props);
  const row = await prisma.entry.delete({
    where: { uuid: props.uuid.toUpperCase() },
    include: { tags: true },
  });
  return toEntry(row);
};

export const deleteAll = async (): Promise<number[]> => {
  const batchPayloads = await prisma.$transaction([
    prisma.entry.deleteMany(),
    prisma.tag.deleteMany(),
  ]);
  return batchPayloads.map((bp) => bp.count);
};
