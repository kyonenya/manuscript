import { execute } from "./postgres";
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
  const text = `
    SELECT
      entries.*
      ,STRING_AGG(tags.tag, ',') AS taglist
    FROM entries
      LEFT JOIN tags
        ON entries.uuid = tags.uuid
    GROUP BY
      entries.uuid
    ORDER BY
      entries.created_at DESC
    LIMIT
      $1
    ;`;
  const values = [props.limit];
  const rows = await execute<schema>([text, values]);
  return rows.map((row) => entryFactory(row));
};
