import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/my-requests', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data);
      } catch (err) {
        console.error('Failed to fetch requests:', err);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div style={{ background: '#fff', minHeight: '100vh', color: '#000' }}>
      <Navbar />
      <div style={{ padding: '30px' }}>
        <h2>🆘 My Blood Requests</h2>
        {requests.length === 0 ? (
          <p>No blood requests submitted yet.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {requests.map((req) => (
              <div key={req._id} style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '15px',
                background: '#f9f9f9',
                width: '280px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}>
                <p><strong>🩸 Blood Type:</strong> {req.bloodType}</p>
                <p><strong>📦 Quantity:</strong> {req.quantity} mL</p>
                <p><strong>🚨 Urgency:</strong> {req.urgency}</p>
                <p><strong>📍 Location:</strong> {req.city}, {req.state}, {req.pincode}, {req.country}</p>
                {req.location && (
                  <a
                    href={`https://www.google.com/maps?q=${req.location}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#c62828', fontWeight: 'bold' }}
                  >
                    🗺️ View on Map
                  </a>
                )}
                <p><strong>📅 Date:</strong> {new Date(req.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;
