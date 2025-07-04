// routes/locationRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET /api/location/search?q=delhi
router.get('/search', async (req, res) => {
  const { q } = req.query;

  if (!q) return res.status(400).json({ message: 'Query required' });

  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q,
        format: 'json',
        addressdetails: 1,
        limit: 5
      },
      headers: {
        'User-Agent': 'BloodLink-App'
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('🔴 Nominatim proxy error:', err.message);
    res.status(500).json({ message: 'Nominatim API error', error: err.message });
  }
});

module.exports = router;
