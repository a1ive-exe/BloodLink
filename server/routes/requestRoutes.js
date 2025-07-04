const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  requestBlood,
  getMyRequests,
  getAllRequests,
  updateRequestStatus // ✅ Added here
} = require('../controllers/requestController');

// Admin: Get all blood requests
router.get('/requests', authMiddleware, getAllRequests);

// Patient: Submit a blood request
router.post('/request', authMiddleware, requestBlood);

// Patient: Get their own requests
router.get('/my-requests', authMiddleware, getMyRequests);

// Admin: Update request status
router.patch('/request/:id/status', authMiddleware, updateRequestStatus);

module.exports = router;
