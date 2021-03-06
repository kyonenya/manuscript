import { Entry } from '../domain/Entry';
import { SQL } from './postgres';

export const selectMany = (props: { limit: number; offset?: number }): SQL => {
  const text = `
    SELECT
      entries.*
      ,STRING_AGG(tags.tag, ',') AS taglist
    FROM
      entries
      LEFT JOIN tags
        ON  entries.uuid = tags.uuid
    GROUP BY
      entries.uuid
    ORDER BY
      entries.created_at DESC
    LIMIT $1 OFFSET $2
    ;`;
  const values = [props.limit, props.offset ?? 0];
  return { text, values };
};

export const selectByKeyword = (props: {
  keyword?: string;
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
      ON  entries.uuid = tags.uuid
    GROUP BY
      entries.uuid
    HAVING entries.text LIKE '%' || $1 || '%'
    ORDER BY
      entries.created_at DESC
    LIMIT $2 OFFSET $3
    ;`;
  const values = [props.keyword ?? '', props.limit, props.offset ?? 0];
  return { text, values };
};

export const selectByTag = (props: {
  tag: string;
  keyword?: string;
  limit: number;
  offset?: number;
}): SQL => {
  const text = `
    SELECT
      entries.*,
      STRING_AGG(tags.tag, ',') AS taglist
    FROM
      entries
      LEFT JOIN
        tags
      ON  entries.uuid = tags.uuid
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
    AND entries.text LIKE '%' || $2 || '%'
    ORDER BY
      entries.created_at DESC
    LIMIT $3 OFFSET $4
    ;`;
  const values = [
    props.tag,
    props.keyword ?? '',
    props.limit,
    props.offset ?? 0,
  ];
  return { text, values };
};

export const selectByDate = (props: {
  since?: Date;
  until?: Date;
  limit: number;
  offset?: number;
}): SQL => {
  const text = `
    SELECT
      entries.*,
      STRING_AGG(tags.tag, ',') AS taglist
    FROM
      entries
      LEFT JOIN
        tags
      ON  entries.uuid = tags.uuid
    GROUP BY
      entries.uuid
    HAVING entries.created_at BETWEEN $1 AND $2
    ORDER BY
      entries.created_at DESC
    LIMIT $3 OFFSET $4
    ;`;
  const values = [
    props.since ?? new Date(1970, 1, 1),
    props.until ?? new Date(),
    props.limit,
    props.offset ?? 0,
  ];
  return { text, values };
};

export const selectOne = (props: { uuid: string }): SQL => {
  const text = `
    SELECT
      entries.*
      ,STRING_AGG(tags.tag, ',') AS taglist
    FROM entries
      LEFT JOIN tags
        ON  entries.uuid = tags.uuid
    GROUP BY
      entries.uuid
    HAVING
      entries.uuid = $1
    ;`;
  const values = [props.uuid.toUpperCase()];
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

export const insertMany = (props: { entries: Entry[] }): SQL => {
  const text = `
    INSERT INTO entries (
      text
      ,starred
      ,uuid
      ,created_at
      ,modified_at
    )
    VALUES ${props.entries
      .map(
        (_, i) => `(
      $${1 + i * 5}
      ,$${2 + i * 5}
      ,$${3 + i * 5}
      ,$${4 + i * 5}
      ,$${5 + i * 5}
    )`
      )
      .join(', ')}
    ;`;
  const values = props.entries
    .map((entry) => [
      entry.text,
      entry.starred,
      entry.uuid,
      entry.createdAt,
      entry.modifiedAt,
    ])
    .flat();
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

export const deleteAll = (): SQL => {
  const text = `
    DELETE
    FROM
      entries
    ;`;
  return { text };
};
