const Request = require('../models/Request');
const User = require('../models/User');

// POST /api/request - Patient requests blood
const requestBlood = async (req, res) => {
  const { quantity, urgency, city, state, pincode, country, location } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.role !== 'patient') {
      return res.status(403).json({ message: 'Only patients can request blood' });
    }

    const newRequest = new Request({
      patient: user._id,
      bloodType: user.bloodType, // ✅ from profile
      quantity,
      urgency,
      city,
      state,
      pincode,
      country,
      location: location || '', // optional coordinates
      status: 'pending'
    });

    await newRequest.save();
    res.status(201).json({ message: 'Blood request submitted successfully', newRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/my-requests - Patient views their requests
const getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ patient: req.user.userId }).sort({ date: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/requests - Admin views all requests
const getAllRequests = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const requests = await Request.find()
      .populate('patient', 'name email role bloodType')
      .sort({ date: -1 });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH /api/request/:id/status - Admin updates request status
const updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const updated = await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json({ message: `Request ${status}`, request: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  requestBlood,
  getMyRequests,
  getAllRequests,
  updateRequestStatus
};
