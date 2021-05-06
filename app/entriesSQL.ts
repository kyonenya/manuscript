import { SQL } from './postgres';
import { Entry } from './Entry';

export const selectAll = (props: { limit: number }): SQL => {
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
  return { text, values };
};

export const insertOne = (props: { entry: Entry }): SQL => {
  const { entry } = props;
  const text = `
    INSERT INTO entries (
      text
      ,starred
      ,uuid
    )
    VALUES (
      $1
      ,$2
      ,$3
    )
    ;`;
  const values = [entry.text, entry.starred, entry.uuid];
  return { text, values };
};
