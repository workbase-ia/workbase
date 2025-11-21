import { Router } from 'express';
import { getConvitesPendentes, aceitarConvite, ignorarConvite, enviarConvite } from '../controllers/conexoesController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/pendentes', protect, getConvitesPendentes);
router.post('/aceitar/:id', protect, aceitarConvite);
router.post('/ignorar/:id', protect, ignorarConvite);
router.post('/convidar/:id', protect, enviarConvite); 

export default router;