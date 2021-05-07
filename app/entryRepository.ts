import { query, mutate } from './postgres';
import * as entriesSQL from './entriesSQL';
import * as tagsSQL from './tagsSQL';
import { Entry } from './Entry';

type Schema = {
  text: string;
  starred: boolean;
  uuid: string;
  taglist: string | null;
  created_at: string;
  modified_at: string;
};

const entryFactory = (row: Schema): Entry => {
  return new Entry({
    text: row.text,
    starred: row.starred,
    uuid: row.uuid,
    tags: row.taglist?.split(',') ?? null,
    createdAt: row.created_at,
    modifiedAt: row.modified_at,
  });
};

export const selectAll = async (props: { limit: number }): Promise<Entry[]> => {
  const rows = await query<Schema>(entriesSQL.selectAll(props));
  return rows.map((row) => entryFactory(row));
};

export const createOne = async (props: { entry: Entry }): Promise<number[]> => {
  return await mutate(
    entriesSQL.insertOne(props),
    tagsSQL.insertAll(props.entry)
  );
};
