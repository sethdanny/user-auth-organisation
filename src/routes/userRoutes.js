const express = require('express');
const { getUserById } = require('../controllers/userController');
const authenticate = require('../middleware/authenticate.js');

const router = express.Router();

router.get('/:id', authenticate, getUserById);

module.exports = router;
