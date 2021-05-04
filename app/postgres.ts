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

export const mutate = async (...props: query[]): Promise<void> => {
  const client = await getClient();
  await client.query('BEGIN');
  try {
    await Promise.all(props.map(([sql, params]) => client.query(sql, params)));
  } catch (err) {
    await client.query('ROLLBACK');
    throw new Error(err);
  }
  await client.query('COMMIT');
};
