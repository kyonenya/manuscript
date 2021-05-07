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

export const selectOne = (props: { uuid: string }): SQL => {
  const text = `
    SELECT
      entries.*
      ,STRING_AGG(tags.tag, ',') AS taglist
    FROM entries
      LEFT JOIN tags
        ON entries.uuid = tags.uuid
    GROUP BY
      entries.uuid
    HAVING
      entries.uuid = $1
    ;`;
  const values = [props.uuid];
  return { text, values };
};

export const selectByKeyword = (props: {
  keyword: string;
  limit: number;
}): SQL => {
  const text = `
    SELECT
      entries.*
      ,STRING_AGG(tags.tag, ',') AS taglist
    FROM
      entries
      LEFT JOIN
        tags
      ON entries.uuid = tags.uuid
    GROUP BY
      entries.uuid
    HAVING entries.text LIKE '%' || $1 || '%'
    ORDER BY
      entries.created_at DESC
    LIMIT $2;`;
  const values = [props.keyword, props.limit];
  return { text, values };
};

export const selectByTag = (props: { tag: string; limit: number }): SQL => {
  const text = `
    SELECT
      entries.*
      ,STRING_AGG(tags.tag, ',') AS taglist
    FROM
      entries
      LEFT JOIN
        tags
      ON entries.uuid = tags.uuid
    GROUP BY
      entries.uuid
    HAVING entries.uuid IN(
      SELECT
        uuid
      FROM
        tags
      WHERE
        tag = $1
    )
    ORDER BY
      entries.created_at DESC
    LIMIT $2
    ;`;
  const values = [props.tag, props.limit];
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

export const updateOne = (props: { entry: Entry }): SQL => {
  const { entry } = props;
  const text = `
    UPDATE
      entries
    SET
      text = $1
      ,starred = $2
    WHERE
      uuid = $3
    ;`;
  const values = [entry.text, entry.starred, entry.uuid];
  return { text, values };
};

export const deleteOne = (props: { uuid: string }): SQL => {
  const text = `
    DELETE
    FROM
      entries
    WHERE
      uuid = $1
    ;`;
  const values = [props.uuid];
  return { text, values };
};
