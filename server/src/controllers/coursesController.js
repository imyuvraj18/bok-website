import pool from '../db/pool.js';

export async function listCourses(req, res, next) {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, category, grade_range, description, duration_weeks, price_lkr, active FROM courses WHERE active = 1 ORDER BY category, name'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}


