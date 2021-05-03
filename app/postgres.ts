import { Pool, PoolClient, QueryConfig, QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

const client = await pool.connect();

export const execute = (...query: QueryConfig[]) => {
};
