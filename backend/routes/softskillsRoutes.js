import express from 'express';
import softskillsController from '../controllers/softskillsController.js';

const router = express.Router();

router.get('/glossario', softskillsController.getGlossario);

router.get('/softskill-do-dia', softskillsController.getSoftSkillDoDia);

export default router;