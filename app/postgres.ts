import { Pool, QueryConfig, QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

const client = await pool.connect();

export const execute = (...queries: QueryConfig[]) => {
  return Promise.all(queries.map((q) => client.query(q)));
};

export const begin = client.query('BEGIN');

export const commit = client.query('COMMIT');
