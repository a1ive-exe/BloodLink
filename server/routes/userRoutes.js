const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getAllUsers, getMyProfile, updatePassword } = require('../controllers/userController');

// Admin: Get all users
router.get('/users', authMiddleware, getAllUsers);

// Authenticated user: Get their profile
router.get('/profile', authMiddleware, getMyProfile);

// Authenticated user: Update password
router.patch('/profile/update-password', authMiddleware, updatePassword);

module.exports = router;
