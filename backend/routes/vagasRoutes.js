import { Router } from 'express';
import { buscarVagas } from '../controllers/vagasController.js';
// (Você pode adicionar o 'protect' aqui se quiser que só usuários logados vejam vagas)
// import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// GET /api/vagas
router.get('/', buscarVagas); 

export default router;