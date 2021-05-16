import dotenv from 'dotenv';
import { Pool, PoolClient, QueryConfig, QueryResult, QueryResultRow } from 'pg';

dotenv.config();

export type SQL = {
  text: string;
  values?: (string | number | boolean)[];
};

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
  };
})();

export const query = async <T>(sql: SQL): Promise<T[]> => {
  const client = await getClient();
  const queryResult = await client.query(sql);
  return queryResult.rows;
};

export const mutate = async (...sqls: (SQL | null)[]): Promise<number[]> => {
  const client = await getClient();
  const transacts = process.env.NODE_ENV === 'test' ? false : true;
  if (transacts) await client.query('BEGIN');
  try {
    const queryResults = await Promise.all(
      sqls
        .filter((sql): sql is SQL => sql !== null)
        .map((sql) => client.query(sql))
    );
    if (transacts) await client.query('COMMIT');
    return queryResults.map((row) => row.rowCount);
  } catch (err) {
    if (transacts) await client.query('ROLLBACK');
    throw new Error(err);
  }
};

export const begin = async (): Promise<void> => {
  await query({ text: 'BEGIN' });
};

export const rollback = async (): Promise<void> => {
  await query({ text: 'ROLLBACK' });
};
