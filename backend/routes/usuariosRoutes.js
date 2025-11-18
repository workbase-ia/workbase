import { Router } from 'express';
import { getUser, getSuggestedProfiles } from '../controllers/usuariosController.js';

const router = Router();

router.get('/suggested-profiles', getSuggestedProfiles);
router.get('/:id', getUser);


export default router;
