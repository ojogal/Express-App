import User from '../models/User.js';
import Role from '../models/Role.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { key } from '../config.js';

const generatedAccessToken = (id, roles) => {
  const payload = {
    id,
    roles
  };
  return jwt.sign(payload, key.secret, { expiresIn: '24h' })
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Registration error', errors })
      };

      const { username, password } = req.body;
      const candidate = await User.findOne({ username });

      if (candidate) {
        return res.status(400).json({ message: 'User already exists' })
      };

      const hashPass = bcrypt.hashSync(password, 11);
      const userRole = await Role.findOne({ value: 'USER' });
      const user = new User({ username, password: hashPass, roles: userRole.value });
      await user.save();
      return res.json({ message: 'User registered successfully' });
    } catch (e) {
        console.log(e);
      res.status(400).json({ message: 'Registration error' });
    }
  };

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      
      if (!user) {
        res.status(400).json({ message: 'User not found' })
      };
      
      const validPass = bcrypt.compareSync(password, user.password);

      if (!validPass) {
        res.status(400).json({ message: 'Invalid password' })
      };

      const token = generatedAccessToken(user._id, user.roles);

      return res.json({token})
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Login error' });
    }
  };

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      
    }
  };
}

export default new authController;