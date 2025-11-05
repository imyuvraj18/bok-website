import fs from 'fs';
import path from 'path';
import url from 'url';
import dotenv from 'dotenv';
import pool from './pool.js';

dotenv.config();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const filePath = path.join(__dirname, 'migrations', '001_init.sql');
  const sql = fs.readFileSync(filePath, 'utf8');

  console.log('Running migration 001_init.sql...');
  const conn = await pool.getConnection();
  try {
    await conn.query(sql);
    console.log('Migration completed.');
  } finally {
    conn.release();
    await pool.end();
  }
}

run().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});


