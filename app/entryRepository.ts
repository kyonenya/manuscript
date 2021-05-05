import { execute, mutate } from './postgres';
import * as entriesQuery from './entriesQuery';
import * as tagsQuery from './tagsQuery';
import { Entry } from './Entry';

type schema = {
  text: string;
  starred: boolean;
  uuid: string;
  taglist: string | null;
  created_at: string;
  modified_at: string;
};

const entryFactory = (row: schema): Entry => {
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
  const rows = await execute<schema>(entriesQuery.selectAll(props));
  return rows.map((row) => entryFactory(row));
};

export const createOne = async (props: {
  entry: Entry;
  shouldCommit?: boolean;
}): Promise<void> => {
  const rowCounts = await mutate(
    [entriesQuery.insertOne(props), tagsQuery.insertAll(props.entry)],
    props.shouldCommit
  );
  console.log(rowCounts);
};
