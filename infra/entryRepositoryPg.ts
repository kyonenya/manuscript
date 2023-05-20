import { Entry, newEntry } from '../domain/Entry';
import * as entriesSQL from './entriesSQL';
import { query, mutate } from './postgres';
import * as tagsSQL from './tagsSQL';

type Schema = {
  text: string;
  starred: boolean;
  uuid: string;
  taglist: string | null;
  created_at: Date;
  modified_at: Date;
};

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
  const rows = await query<Schema>(entriesSQL.selectOne(props));
  return rows.length > 0 ? entryFactory(rows[0]) : undefined;
};

export const readTagList = async () => {
  const rows = await query<{ tag: string }>(tagsSQL.selectDistinct());
  return rows.map((row) => row.tag);
};

/**
 * Mutation
 */
export const createOne = async (props: { entry: Entry }): Promise<number[]> => {
  return await mutate(
    entriesSQL.insertOne(props),
    tagsSQL.insertMany(props.entry)
  );
};

export const createMany = async (props: {
  entries: Entry[];
}): Promise<number[]> => {
  return await mutate(
    entriesSQL.insertMany(props),
    ...props.entries.map((entry) => tagsSQL.insertMany(entry))
  );
};

export const updateOne = async (props: { entry: Entry }): Promise<number[]> => {
  await mutate(tagsSQL.deleteMany(props.entry));
  return await mutate(
    entriesSQL.updateOne(props),
    tagsSQL.insertMany(props.entry)
  );
};

export const deleteOne = async (props: { uuid: string }): Promise<number[]> => {
  return await mutate(tagsSQL.deleteMany(props), entriesSQL.deleteOne(props));
};

export const deleteAll = async (): Promise<number[]> => {
  return await mutate(tagsSQL.deleteAll(), entriesSQL.deleteAll());
};
