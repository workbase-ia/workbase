import { Router } from 'express';
import { getPosts, likePost, addComment, getComments } from '../controllers/postsController.js';
import authMiddleware from '../middleware/authMiddleware.js';



const router = Router();

router.get('/', getPosts);
router.post('/:postId/like', likePost);
router.post('/:postId/comment', addComment);
router.get('/:postId/comments', getComments);

export default router;
