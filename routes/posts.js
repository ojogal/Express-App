import Router from 'express';
import PostController from '../controllers/postController.js';

const router = new Router();

router.get('/posts', PostController.index);
router.get('/posts/:id', PostController.show);
router.post('/posts', PostController.create);
router.put('/posts', PostController.update);
router.delete('/posts/:id', PostController.destroy);

export default router;