const express = require('express');
const router = express.Router();
const privacidadeController = require('../controllers/privacidadeController');

router.get('/status', privacidadeController.getConsentimentoStatus);

router.post('/consentimento/ativar', privacidadeController.ativarConsentimento);

router.post('/consentimento/revogar', privacidadeController.revogarConsentimento);

router.delete('/excluir-dados', privacidadeController.solicitarExclusao);

module.exports = router;
