import { Router } from 'express';
import { listCourses } from '../controllers/coursesController.js';

const router = Router();

router.get('/', listCourses);

export default router;


