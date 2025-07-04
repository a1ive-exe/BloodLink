const Donation = require('../models/Donation');
const User = require('../models/User');

// POST /api/donate - Donor donates blood
const donateBlood = async (req, res) => {
  const { quantity, city, state, pincode, location } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user || user.role !== 'donor') {
      return res.status(403).json({ message: 'Only donors can donate blood' });
    }

    const donation = new Donation({
      donor: user._id,
      bloodType: user.bloodType, // ✅ pulled from user profile
      quantity,
      city,
      state,
      pincode,
      location: location || null // optional
    });

    await donation.save();
    res.status(201).json({ message: 'Donation recorded', donation });
  } catch (error) {
    console.error('❌ Donation Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// GET /api/my-donations - Donor views their donations
const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user.userId }).sort({ date: -1 });
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/donations - Admin views all donations
const getAllDonations = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const donations = await Donation.find()
      .populate('donor', 'name email role bloodType')
      .sort({ date: -1 });

    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  donateBlood,
  getMyDonations,
  getAllDonations
};
