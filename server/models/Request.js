// models/Request.js
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bloodType: { type: String, required: true },
  quantity: { type: Number, required: true },
  urgency: { type: String, required: true },
  city: String,
  state: String,
  pincode: String,
  country: String,
  location: String, // optional lat,long
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', requestSchema);
