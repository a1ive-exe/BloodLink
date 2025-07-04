require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
const authRoutes = require('./routes/authRoutes');
const bloodRoutes = require('./routes/bloodRoutes');
const requestRoutes = require('./routes/requestRoutes');
const userRoutes = require('./routes/userRoutes');
const locationRoutes = require('./routes/locationRoutes'); // ✅ New

// Mount routes
app.use('/api', authRoutes);
app.use('/api', bloodRoutes);
app.use('/api', requestRoutes);
app.use('/api', userRoutes);
app.use('/api/location', locationRoutes); // ✅ New line for OSM proxy

// Test Route
app.get('/', (req, res) => res.send('BloodLink API Running'));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

// MongoDB + Server Start
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🛢️ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error('❌ MongoDB Error:', error.message);
    process.exit(1);
  }
};

startServer();
