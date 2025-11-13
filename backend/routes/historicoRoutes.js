const express = require('express');
const router = express.Router();
const historicoController = require('../controllers/historicoController');


router.get('/', historicoController.getHistorico);


router.get('/relatorio-pdf', historicoController.gerarRelatorioPDF);

module.exports = router;
