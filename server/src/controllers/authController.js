import { findUserByEmail, createUser, verifyPassword, generateToken } from '../services/userService.js';

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('name, email and password are required');
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      res.status(409);
      throw new Error('Email already registered');
    }

    const user = await createUser({ name, email, password });
    const token = generateToken(user);
    res.status(201).json({ token, user });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      res.status(400);
      throw new Error('email and password are required');
    }

    const user = await findUserByEmail(email);
    if (!user) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    const ok = await verifyPassword(password, user.password_hash);
    if (!ok) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
}


