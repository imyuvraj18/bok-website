import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db/pool.js';

export async function findUserByEmail(email) {
  const [rows] = await pool.query('SELECT id, name, email, password_hash, created_at FROM users WHERE email = ?', [email]);
  return rows[0] || null;
}

export async function createUser({ name, email, password }) {
  const passwordHash = await bcrypt.hash(password, 10);
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
    [name, email, passwordHash]
  );
  return { id: result.insertId, name, email };
}

export async function verifyPassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash);
}

export function generateToken(user) {
  const secret = process.env.JWT_SECRET || 'dev-secret';
  return jwt.sign({ sub: user.id, email: user.email, name: user.name }, secret, { expiresIn: '7d' });
}


