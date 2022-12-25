import { Entry, newEntry } from '../domain/Entry';
import * as entriesSQL from './entriesSQL';
import { query, mutate } from './postgres';
import * as tagsSQL from './tagsSQL';
import { prisma } from './prisma';
import { Entry as PrismaEntry, Tag } from '@prisma/client';

type Schema = {
  text: string;
  starred: boolean;
  uuid: string;
  taglist: string | null;
  created_at: Date;
  modified_at: Date;
};

type Entry2 = PrismaEntry & { tags: Tag[] };

const toEntry = (
  row: (PrismaEntry & { tags?: Tag[] }) | null
): Entry | undefined =>
  row
    ? newEntry({
        text: row.text,
        starred: row.starred,
        uuid: row.uuid,
        tags: row.tags?.map((tag) => tag.name),
        createdAt: row.created_at,
        modifiedAt: row.modified_at,
      })
    : undefined;

const entryFactory = (row: Schema): Entry => {
  return newEntry({
    text: row.text,
    starred: row.starred,
    uuid: row.uuid,
    tags: row.taglist?.split(',') ?? [],
    createdAt: row.created_at,
    modifiedAt: row.modified_at,
  });
};

/**
 * Query
 */
export const readMany = async (props: {
  limit: number;
  offset?: number;
}): Promise<Entry[]> => {
  const rows = await query<Schema>(entriesSQL.selectMany(props));
  return rows.map((row) => entryFactory(row));
};

export const readByKeyword = async (props: {
  keyword?: string;
  limit: number;
  offset?: number;
}): Promise<Entry[]> => {
  const rows = await query<Schema>(entriesSQL.selectByKeyword(props));
  return rows.map((row) => entryFactory(row));
};

export const readByTag = async (props: {
  tag: string;
  keyword?: string;
  limit: number;
  offset?: number;
}): Promise<Entry[]> => {
  const rows = await query<Schema>(entriesSQL.selectByTag(props));
  return rows.map((row) => entryFactory(row));
};

export const readByDate = async (props: {
  since?: Date;
  until?: Date;
  limit: number;
  offset?: number;
}): Promise<Entry[]> => {
  const rows = await query<Schema>(entriesSQL.selectByDate(props));
  return rows.map((row) => entryFactory(row));
};

export const readOne = async (props: {
  uuid: string;
}): Promise<Entry | undefined> => {
  const row = await prisma.entry.findUnique({
    where: { uuid: props.uuid },
    include: { tags: true },
  });
  return toEntry(row);
};

export const readTagList = async () => {
  const rows = await prisma.tag.findMany({});
  return rows.map((row) => row.name);
};

/**
 * Mutation
 */
export const createOne = async (props: {
  entry: Entry;
}): Promise<Entry | undefined> => {
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
  });
  return toEntry(row);
};

export const createMany = async (props: {
  entries: Entry[];
}): Promise<number[]> => {
  return await mutate(
    entriesSQL.insertMany(props),
    ...props.entries.map((entry) => tagsSQL.insertMany(entry))
  );
};

const disconnectAllTags = async (props: { uuid: string }): Promise<Entry2> => {
  return await prisma.entry.update({
    where: { uuid: props.uuid },
    data: { tags: { set: [] } },
    include: { tags: true },
  });
};

export const updateOne = async (props: { entry: Entry }): Promise<any> => {
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
  });
  return toEntry(row);
};

export const deleteOne = async (props: { uuid: string }): Promise<number[]> => {
  await disconnectAllTags(props);
  await prisma.entry.delete({ where: { uuid: props.uuid } });
  return [1];
};

export const deleteAll = async (): Promise<number[]> => {
  const batchPayloads = await prisma.$transaction([
    prisma.entry.deleteMany(),
    prisma.tag.deleteMany(),
  ]);
  return batchPayloads.map((bp) => bp.count);
};
