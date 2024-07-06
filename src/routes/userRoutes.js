const express = require('express');
const { getUserById } = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/:id', authenticate, getUserById);

module.exports = router;
