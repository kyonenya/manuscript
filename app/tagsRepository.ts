// import { execute } from './postgres';
export const a = 1;

// export const insertAll = async (tags: string[] | null, uuid: string): Promise<void> => {
//   if (!tags) return;
//   const sql = `
//     INSERT INTO tags (
//       uuid
//       ,tag
//     )
//     VALUES ${tags
//       .map(
//         (_, i) => `(
//       $1
//       ,$${2 + i}
//     )`
//       )
//       .join(', ')}
//     ;`;
//   const params = [uuid, ...tags];
//   const queryResult = await execute({ sql, params });
//   if (queryResult.rowCount !== tags.length)
//     throw new Error('unexpected rowCount');
// };
