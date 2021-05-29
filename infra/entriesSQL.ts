import { Entry } from '../domain/Entry';
import { SQL } from './postgres';

export const selectAll = (props: { limit: number; offset?: number }): SQL => {
  const text = `
    SELECT
      entries.*
      ,STRING_AGG(tags.tag, ',') AS taglist
    FROM
      entries
      LEFT JOIN tags
        ON entries.uuid = tags.uuid
    GROUP BY
      entries.uuid
    ORDER BY
      entries.created_at DESC
    LIMIT $1 OFFSET $2
    ;`;
  const values = [props.limit, props.offset ?? 0];
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
  offset?: number;
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
    LIMIT $2 OFFSET $3;`;
  const values = [props.keyword, props.limit, props.offset ?? 0];
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
      ,created_at
      ,modified_at
    )
    VALUES (
      $1
      ,$2
      ,$3
      ,$4
      ,$5
    )
    ;`;
  const values = [
    entry.text,
    entry.starred,
    entry.uuid,
    entry.createdAt,
    entry.modifiedAt,
  ];
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
      ,created_at = $3
      ,modified_at = $4
    WHERE
      uuid = $5
    ;`;
  const values = [
    entry.text,
    entry.starred,
    entry.createdAt,
    entry.modifiedAt,
    entry.uuid,
  ];
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
