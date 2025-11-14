import { Router } from 'express';
import { 
  getGlossario, 
  getSoftSkillDoDia 
} from '../controllers/softskillsController.js';

const router = Router();

router.get('/glossario', getGlossario);
router.get('/softskill-do-dia', getSoftSkillDoDia);

export default router;