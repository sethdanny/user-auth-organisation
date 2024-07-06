const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const dotenv = require('dotenv');

dotenv.config()

const authenticate = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({
    status: 'Bad request',
    message: 'Authentication failed',
    statusCode: 401
    });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(payload.userId);
    next();
  } catch (err) {
    return res.status(401).json({
        status: 'Bad request',
        message: 'Authentication failed',
        statusCode: 401
    });
  }
};

module.exports = authenticate;
