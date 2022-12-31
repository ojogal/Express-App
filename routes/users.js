import express from 'express';
import {v4 as uuidv4} from 'uuid';

const router = express.Router();

let users = [];

router.get('/', (req, res) => {
  res.send(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const findUser = users.find((user) => {user.id == id});
  res.send(findUser);
});

router.post('/', (req, res) => {
  const user = req.body;
  users.push({ ...user, id: uuidv4() });
  res.send('successfully');
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, LastName, age } = req.body;
  const findUser = users.find((user) => {user.id == id});

  if (firstName) findUser.firstName = firstName;
  if (lastName) findUser.lastName = lastName;
  if (age) findUser.age = age;

  res.send('successfully');
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => {user.id != id});
  res.send('successfully');
});

export default router;