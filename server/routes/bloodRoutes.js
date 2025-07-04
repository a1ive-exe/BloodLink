const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { donateBlood, getMyDonations, getAllDonations } = require('../controllers/donationController');

// Route to fetch user's donations
router.get('/my-donations', authMiddleware, getMyDonations);

// Route to handle blood donation
router.post('/donate', authMiddleware, donateBlood);
router.get('/donations', authMiddleware, getAllDonations);

module.exports = router;
