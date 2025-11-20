import { Router } from 'express';
import { getPerfilById, updateMeuPerfil } from '../controllers/perfilController.js';
import authMiddleware from '../middleware/authMiddleware.js';


const router = Router();

router.get('/:id', getPerfilById);
router.put('/me', authMiddleware, updateMeuPerfil);

export default router;