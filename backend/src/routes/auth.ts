import { Router, Request, Response } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

// Rota de health check
router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

router.post('/register', (req: Request, res: Response) => { register(req, res); });
router.post('/login', (req: Request, res: Response) => { login(req, res); });

export default router; 