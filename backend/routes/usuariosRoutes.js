import { Router } from 'express';
import { getUser } from '../controllers/usuariosController.js';

const router = Router();

router.get('/:id', getUser);

export default router;
