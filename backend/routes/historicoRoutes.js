import express from 'express';
import { 
    getHistorico, 
    addRegistro, 
    getRegistroByTimestamp,
    clearHistorico
} from '../controllers/historicoController.js';

const router = express.Router();

router.get('/', getHistorico);

router.post('/', addRegistro);

router.get('/:timestamp', getRegistroByTimestamp);

router.delete('/', clearHistorico);

export default router;