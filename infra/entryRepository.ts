import { Prisma } from '@prisma/client';
import { Entry as PrismaEntry, Tag, PrismaPromise } from '@prisma/client';
import { Entry, newEntry, tagHistory } from '../domain/Entry';
import { entriesTagToABs } from '../domain/Tag';
import { prisma } from './prisma';

const toEntry = (row: PrismaEntry & { tags: Tag[] }): Entry =>
  newEntry({
    text: row.text,
    starred: row.starred,
    uuid: row.uuid,
    tags: row.tags?.map((tag) => tag.name),
    createdAt: row.created_at,
    modifiedAt: row.modified_at,
  });

/**
 * Query
 */
export const readMany = async (props: {
  limit: number;
  offset?: number;
}): Promise<Entry[]> => {
  const rows = await prisma.entry.findMany({
    take: props.limit,
    skip: props.offset,
    orderBy: { created_at: 'desc' },
    include: { tags: true },
  });
  return rows.filter((row) => row != null).map((row) => toEntry(row));
};

export const readByKeyword = async (props: {
  keyword?: string;
  limit: number;
  offset?: number;
}): Promise<Entry[]> => {
  const rows = await prisma.entry.findMany({
    where: { text: { contains: props.keyword } },
    take: props.limit,
    skip: props.offset,
    orderBy: { created_at: 'desc' },
    include: { tags: true },
  });
  return rows.map((row) => toEntry(row));
};

export const readByTag = async (props: {
  tag: string;
  keyword?: string;
  limit: number;
  offset?: number;
}): Promise<Entry[]> => {
  const rows = await prisma.entry.findMany({
    where: {
      text: { contains: props.keyword },
      tags: { some: { name: { equals: props.tag } } },
    },
    take: props.limit,
    skip: props.offset,
    orderBy: { created_at: 'desc' },
    include: { tags: true },
  });
  return rows.map((row) => toEntry(row));
};

export const readByDate = async (props: {
  since?: Date;
  until?: Date;
  limit: number;
  offset?: number;
}): Promise<Entry[]> => {
  const rows = await prisma.entry.findMany({
    where: {
      created_at: {
        gte: props.since,
        lt: props.until,
      },
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
    where: { uuid: props.uuid },
    include: { tags: true },
  });
  return row ? toEntry(row) : undefined;
};

export const readTagList = async () => {
  const rows = await prisma.tag.findMany({});
  return rows.map((row) => row.name);
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
    data: tagHistory(props.entries).map((tag) => ({ name: tag })),
  });
  const tags = await prisma.tag.findMany({});

  const createEntry = prisma.entry.createMany({
    data: props.entries.map(({ createdAt, modifiedAt, tags, ...rest }) => ({
      ...rest,
      created_at: createdAt,
      modified_at: modifiedAt,
    })),
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
      (v): v is PrismaPromise<any> => !!v
    )
  );
  return [bp.count, tagsCount ?? 0];
};

const disconnectAllTags = async (props: { uuid: string }): Promise<PrismaEntry & { tags: Tag[] }> => {
  return await prisma.entry.update({
    where: { uuid: props.uuid },
    data: { tags: { set: [] } },
    include: { tags: true },
  });
};

export const updateOne = async (props: { entry: Entry }): Promise<Entry> => {
  const { createdAt, modifiedAt, tags, ...rest } = props.entry;
  await disconnectAllTags({ uuid: props.entry.uuid });
  const row = await prisma.entry.update({
    where: { uuid: props.entry.uuid },
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
  await disconnectAllTags(props);
  const row = await prisma.entry.delete({
    where: { uuid: props.uuid },
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
