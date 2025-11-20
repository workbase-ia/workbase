import { Router } from 'express';
import { getAllUsuarios } from '../controllers/usuariosController.js';

const router = Router();

router.get('/', getAllUsuarios);

export default router;
