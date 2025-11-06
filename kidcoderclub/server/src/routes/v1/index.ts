/**
 * @copyright 2025 KidCoderClub
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { time, timeStamp } from 'console';
import { Router } from 'express';
import { version } from 'os';
const router = Router();

/**
 * Router
 */
import authRouter from '@/routes/v1/auth';

/**
 * Route router
 */
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is live',
    status: 'ok',
    version: '1.0.0',
    docs: 'https://docs.blog-api.codewithsadee.com',
    timeStamp: new Date().toISOString(),
  });
});

router.use('/auth', authRouter);

export default router;
