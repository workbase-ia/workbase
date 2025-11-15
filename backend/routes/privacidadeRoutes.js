import express from 'express';
import privacidadeController from '../controllers/privacidadeController.js';

const router = express.Router();

router.get('/status', privacidadeController.getConsentimentoStatus);

router.post('/consentimento/ativar', privacidadeController.ativarConsentimento);

router.post('/consentimento/revogar', privacidadeController.revogarConsentimento);

router.delete('/excluir-dados', privacidadeController.solicitarExclusao);

export default router;