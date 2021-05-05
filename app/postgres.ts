import { Pool, PoolClient, QueryConfig, QueryResult, QueryResultRow } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export type TQuery = [sql: string, params?: (string | number | boolean)[]];

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

export const execute = async <T>([sql, params]: TQuery): Promise<T[]> => {
  const client = await getClient();
  const queryResult = await client.query(sql, params);
  return queryResult.rows;
};

export const mutate = async (
  queries: (TQuery | null)[],
  noTransaction = false
): Promise<number[]> => {
  const client = await getClient();
  if (process.env.NODE_ENV !== 'test') {
    noTransaction = true;
  }
  if (!noTransaction) await client.query('BEGIN');
  try {
    const queryResults = await Promise.all(
      queries
        .filter((query): query is TQuery => query !== null)
        .map(([sql, params]) => client.query(sql, params))
    );
    if (!noTransaction) await client.query('COMMIT');
    return queryResults.map((row) => row.rowCount);
  } catch (err) {
    await client.query('ROLLBACK');
    throw new Error(err);
  }
};

export const begin = async (): Promise<void> => {
  await execute(['BEGIN']);
};

export const rollback = async (): Promise<void> => {
  await execute(['ROLLBACK']);
};
