import { Pool, PoolClient, QueryConfig, QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

export const getClient: () => Promise<PoolClient> = (() => {
  let client: PoolClient;
  return async () => {
    if (!client) {
      client = await pool.connect();
    }
    return client;
  }
})();

export const useClient = async () => {
  const client = await getClient();

  const execute = (query: QueryConfig): Promise<QueryResult> => client.query(query);
  const begin = (): void => {
    client.query('BEGIN');
  }
  const commit = (): void => {
    client.query('COMMIT');
  };
  const rollback = (): void => {
    client.query('ROLLBACK');
  };
  return { execute, begin, commit };
};
