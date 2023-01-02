import colors from 'colors';
import jwt from 'jsonwebtoken';
import { key } from './config.js';

export function requestTime(req, res, next) {
  req.requestTime = Date.now();
  next();
};

export function logger(req, res, next) {
  console.log(colors.bgBlue.red(`req.time: ${req.requestTime}`));
  next();
};

export function tokenValidation(req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
    return res.status(403).json({ message: 'User not authorized' })
    };

    const decodedData = jwt.verify(token, key.secret);
    req.user = decodedData;
    next()
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: 'User not authorized' })
  }
};

export function roleValidation(roles) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next()
    }
  
    try {
      const token = req.headers.authorization.split(' ')[1];
  
      if (!token) {
      return res.status(403).json({ message: 'User not authorized' })
      };

      const { roles: userRoles } = token.verify(token, key.secret);
      let hasRole = false;

      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true
        }
      });

      if (!hasRole) {
        return res.status(403).json({ message: 'You have no permission' })
      }

      next()
    } catch (e) {
      console.log(e);
      return res.status(403).json({ message: 'User not authorized' })
    }
  }
}