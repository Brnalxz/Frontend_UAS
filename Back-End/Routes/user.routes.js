const express = require('express');
const { signup, login } = require('../Controller/user.controller');

const router = express.Router();

// Route untuk signup
router.post('/signup', signup);

// Route untuk login
router.post('/login', login);

module.exports = router;
