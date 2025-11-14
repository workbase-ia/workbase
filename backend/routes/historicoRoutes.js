import { Router } from 'express';
import { getHistorico, gerarRelatorioPDF } from '../controllers/historicoController.js'; 

const router = Router();

router.get('/', getHistorico);
router.get('/relatorio-pdf', gerarRelatorioPDF);

export default router;