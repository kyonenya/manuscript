import { Pool, PoolClient, QueryConfig, QueryResult, QueryResultRow } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export type query = [
  sql: string,
  params: (string | number | boolean)[],
];

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

const getClient: () => Promise<PoolClient> = (() => {
  let client: PoolClient;
  return async () => {
    if (!client) {
      client = await pool.connect();
    }
    return client;
  }
})();

export const execute = async <T>([sql, params]: query): Promise<T[]> => {
  const client = await getClient();
  const queryResult = await client.query(sql, params);
  return queryResult.rows;
};

export const mutate = async (props: (query | null)[]): Promise<number[]> => {
  const client = await getClient();
  await client.query('BEGIN');
  try {
    const queryResults = await Promise.all(
      props
        .filter((prop): prop is query => prop != null)
        .map(([sql, params]) => client.query(sql, params))
    );
    await client.query('COMMIT');
    return queryResults.map((row) => row.rowCount);
  } catch (err) {
    await client.query('ROLLBACK');
    throw new Error(err);
  }
};
