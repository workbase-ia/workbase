import { Router } from 'express';
import { getPerfilById, updateMeuPerfil } from '../controllers/perfilController.js';
import { protect } from '../middleware/authMiddleware.js'; 

const router = Router();

router.get('/:id', getPerfilById);
router.put('/me', protect, updateMeuPerfil);

export default router;