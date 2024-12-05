const express = require('express');
const isAdmin = require('../Middleware/adminMiddleware');
const router = express.Router();

// Admin Dashboard Route (Protected)
router.get('/dashboard', isAdmin, (req, res) => {
    res.send('Welcome to the admin dashboard!');
});

module.exports = router;