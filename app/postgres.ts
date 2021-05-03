import { Pool, PoolClient, QueryConfig, QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

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

export const execute = async <T>([sql, params]: [
  sql: string,
  params: unknown[],
]): Promise<T> => {
  const client = await getClient();
  const queryResult = await client.query(sql, params);
  return queryResult.rows;
};

export const begin = async (): Promise<void> => {
  const client = await getClient();
  client.query('BEGIN');
}
//  const commit = (): void => {
//    client.query('COMMIT');
//  };
//  const rollback = (): void => {
//    client.query('ROLLBACK');
//  };
