import { query } from './postgres';

export const insertAll = (props: {
  tags: string[] | null;
  uuid: string;
}): query | null => {
  if (!props.tags) return null;
  const sql = `
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
  const params = [props.uuid, ...props.tags];
  return [sql, params];
};
