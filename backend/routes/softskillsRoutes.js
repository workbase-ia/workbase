const express = require('express');
const router = express.Router();
const softskillsController = require('../controllers/softskillsController');

router.get('/glossario', softskillsController.getGlossario);

router.get('/softskill-do-dia', softskillsController.getSoftSkillDoDia);

module.exports = router;
