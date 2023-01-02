import Router from 'express';
import controller from '../controllers/authController.js'
import { check } from 'express-validator';
import { tokenValidation, roleValidation } from '../middleware.js'

const router = new Router();

router.post('/registration', [
  check('username', 'Username can not be blank').notEmpty(),
  check('password', 'Password can not be blank').notEmpty(),
  check('password', 'Password must be 4-10 symbols').isLength({ min: 4, max: 10 })
], controller.registration);
router.post('/login', controller.login);
router.get('/users', roleValidation(['ADMIN']), controller.getUsers);

export default router;