import { Router } from 'express';
import { 
  getConsentimentoStatus, 
  ativarConsentimento, 
  revogarConsentimento, 
  solicitarExclusao 
} from '../controllers/privacidadeController.js';

const router = Router();

router.get('/status', getConsentimentoStatus);
router.post('/consentimento/ativar', ativarConsentimento);
router.post('/consentimento/revogar', revogarConsentimento);
router.delete('/excluir-dados', solicitarExclusao);

export default router;