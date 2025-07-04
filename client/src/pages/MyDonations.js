import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const MyDonations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/my-donations', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDonations(res.data);
      } catch (err) {
        console.error('Failed to fetch donations:', err);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div style={{ background: '#fff', minHeight: '100vh', color: '#000' }}>
      <Navbar />
      <div style={{ padding: '30px' }}>
        <h2>🩸 My Blood Donations</h2>
        {donations.length === 0 ? (
          <p style={{ marginTop: '10px' }}>You haven't donated blood yet.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {donations.map((donation) => (
              <div
                key={donation._id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '15px',
                  background: '#f9f9f9',
                  width: '280px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}
              >
                <p><strong>Blood Type:</strong> {donation.bloodType}</p>
                <p><strong>Quantity:</strong> {donation.quantity} mL</p>
                <p><strong>Location:</strong> {donation.location}</p>
                <p><strong>Date:</strong> {new Date(donation.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDonations;
