import { SQL } from './postgres';

export const insertAll = (props: {
  tags: string[] | null;
  uuid: string;
}): SQL | null => {
  if (!props.tags) return null;
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

export const deleteAll = (props: { uuid: string }): SQL => {
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