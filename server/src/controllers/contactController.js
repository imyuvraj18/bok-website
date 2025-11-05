import pool from '../db/pool.js';

export async function submitContact(req, res, next) {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      res.status(400);
      throw new Error('name, email and message are required');
    }

    await pool.query(
      'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
}


