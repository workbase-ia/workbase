import { Router } from 'express';
import { analisar } from '../controllers/ambienteController.js';

const router = Router();


router.post('/analisar', analisar);

export default router;