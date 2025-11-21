import { Router } from 'express';
import { enviarMensagem } from '../controllers/mensagensController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/enviar/:id', protect, enviarMensagem);

export default router;