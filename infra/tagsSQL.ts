import { SQL } from './postgres';

export const selectDistinct = (): SQL => {
  const text = `
    SELECT DISTINCT
      tag
    FROM
      tags
  ;`;
  return { text };
};

export const insertMany = (props: {
  tags: string[];
  uuid: string;
}): SQL | null => {
  if (props.tags.length < 1) return null;
  const text = `
    INSERT INTO tags (
      uuid
      ,tag
    )
    VALUES ${props.tags
      .map(
        (_, i) => `(
      $1
      ,$${2 + i}
    )`
      )
      .join(', ')}
    ;`;
  const values = [props.uuid, ...props.tags];
  return { text, values };
};

export const deleteMany = (props: { uuid: string }): SQL => {
  const text = `
    DELETE
    FROM
      tags
    WHERE
      uuid = $1
    ;`;
  const values = [props.uuid];

  return { text, values };
};
