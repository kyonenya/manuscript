import { query } from './postgres';
import { Entry } from './Entry';

export const selectAll = (props: { limit: number }): query => {
  const sql = `
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
  const params = [props.limit];
  return [sql, params];
};
