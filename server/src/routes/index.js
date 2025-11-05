import { Router } from 'express';
import authRouter from './auth.js';
import coursesRouter from './courses.js';
import contactRouter from './contact.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Bytes of Knowledge Academy API' });
});

router.use('/auth', authRouter);
router.use('/courses', coursesRouter);
router.use('/contact', contactRouter);

export default router;


