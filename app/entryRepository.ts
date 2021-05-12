import dayjs from 'dayjs';
import { query, mutate } from './postgres';
import * as entriesSQL from './entriesSQL';
import * as tagsSQL from './tagsSQL';
import { Entry, toEntry } from './Entry';

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
    tags: row.taglist?.split(',') ?? null,
    createdAt: row.created_at,
    modifiedAt: row.modified_at,
  });
};

export const readMany = async (props: {
  limit: number;
  offset?: number;
}): Promise<Entry[]> => {
  const rows = await query<Schema>(entriesSQL.selectAll(props));
  return rows.map((row) => entryFactory(row));
};

export const findByKeyword = async (props: {
  keyword: string;
  limit: number;
  offset?: number;
}): Promise<Entry[]> => {
  const rows = await query<Schema>(entriesSQL.selectByKeyword(props));
  return rows.map((row) => entryFactory(row));
};

export const createOne = async (props: { entry: Entry }): Promise<number[]> => {
  return await mutate(
    entriesSQL.insertOne(props),
    tagsSQL.insertAll(props.entry)
  );
};
