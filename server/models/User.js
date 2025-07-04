const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['donor', 'patient', 'admin'], default: 'donor' },
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: function () {
      return this.role !== 'admin'; // ❗Required for donor/patient
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
