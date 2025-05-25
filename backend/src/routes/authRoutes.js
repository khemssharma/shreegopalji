const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Logout route
router.post('/logout', authController.logout);

// Get user profile
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;