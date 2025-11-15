import { Router } from 'express';
import { buscarVagas } from '../controllers/vagasController.js';

const router = Router();

router.get('/', buscarVagas); 

export default router;