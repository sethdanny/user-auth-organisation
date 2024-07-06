const jwt = require('jsonwebtoken');
const { User } = require('../models');
const dotenv = require('dotenv');

dotenv.config();

const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'Bad request',
      message: 'Authentication failed: Token missing or malformed',
      statusCode: 401
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(payload.userId);

    if (!user) {
      return res.status(401).json({
        status: 'Bad request',
        message: 'Authentication failed: User not found',
        statusCode: 401
      });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      status: 'Bad request',
      message: 'Authentication failed',
      statusCode: 401
    });
  }
};

module.exports = authenticate;
