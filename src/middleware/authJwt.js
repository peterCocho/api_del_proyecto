
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const verifyToken = async (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    const user = await User.findByPk(req.userId);
    if (!user) {
        return res.status(404).send({ message: 'User not found.' });
    }
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized!' });
  }
};

module.exports = { verifyToken };
