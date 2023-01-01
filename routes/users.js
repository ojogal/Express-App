import express from 'express';
import {
  allUsers, 
  showUser, 
  createUser, 
  updateUser, 
  deleteUser
} from '../controllers/users.js';

const router = express.Router();

router.get('/', allUsers);

router.get('/:id', showUser);

router.post('/', createUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;