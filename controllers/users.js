import {v4 as uuidv4} from 'uuid';

let users = [];

export const allUsers = (req, res) => {
  res.send(users);
};

export const showUser = (req, res) => {
  const { id } = req.params;
  const findUser = users.find((user) => {user.id == id});
  res.send(findUser);
};

export const createUser = (req, res) => {
  const user = req.body;
  users.push({ id: uuidv4(), ...user });
  res.send('successfully');
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  const findUser = users.find((user) => {user.id == id});

  if (firstName) findUser.firstName = firstName;
  if (lastName) findUser.lastName = lastName;
  if (age) findUser.age = age;

  res.send('successfully');
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => {user.id != id});
  res.send('successfully');
};