import { Entry, toEntry } from '../domain/Entry';
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
  return toEntry({
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
export const selectMany = async (props: {
  limit: number;
  offset?: number;
}): Promise<Entry[]> => {
  const rows = await query<Schema>(entriesSQL.selectAll(props));
  return rows.map((row) => entryFactory(row));
};

export const selectOne = async (props: {
  uuid: string;
}): Promise<Entry | undefined> => {
  const rows = await query<Schema>(entriesSQL.selectOne(props));
  return rows.length > 0 ? entryFactory(rows[0]) : undefined;
};

export const selectByKeyword = async (props: {
  keyword?: string;
  limit: number;
  offset?: number;
}): Promise<Entry[]> => {
  const rows = await query<Schema>(entriesSQL.selectByKeyword(props));
  return rows.map((row) => entryFactory(row));
};

export const selectByTag = async (props: {
  tag: string;
  keyword?: string;
  limit: number;
  offset?: number;
}): Promise<Entry[]> => {
  const rows = await query<Schema>(entriesSQL.selectByTag(props));
  return rows.map((row) => entryFactory(row));
};

export const selectTagList = async () => {
  const rows = await query<{ tag: string }>(tagsSQL.selectDistinct());
  return rows.map((row) => row.tag);
};

/**
 * Mutation
 */
export const createOne = async (props: { entry: Entry }): Promise<number[]> => {
  return await mutate(
    entriesSQL.insertOne(props),
    tagsSQL.insertAll(props.entry)
  );
};

export const createAll = async (props: {
  entries: Entry[];
}): Promise<number[]> => {
  return await mutate(
    entriesSQL.insertAll(props),
    ...props.entries.map((entry) => tagsSQL.insertAll(entry))
  );
};

export const updateOne = async (props: { entry: Entry }): Promise<number[]> => {
  await mutate(tagsSQL.deleteAll(props.entry));
  return await mutate(
    entriesSQL.updateOne(props),
    tagsSQL.insertAll(props.entry)
  );
};

export const deleteOne = async (props: { uuid: string }): Promise<number[]> => {
  return await mutate(tagsSQL.deleteAll(props), entriesSQL.deleteOne(props));
};
