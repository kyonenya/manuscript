import { execute } from "./postgres";

export const selectAll = async (props: { limit: number }): Promise<any> => {
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
  const queryResult = await execute({ text, values });
  console.log(queryResult);
  // return queryResult.rows.map((row) => entitize(row));
};
