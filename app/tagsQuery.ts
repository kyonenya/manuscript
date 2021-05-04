export const createOne = (props: {
  tags: string[] | null;
  uuid: string;
}) => {
  if (!props.tags) return;
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
