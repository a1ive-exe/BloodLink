import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const AllDonations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/donations', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDonations(res.data);
      } catch (err) {
        console.error('Error fetching donations:', err);
      }
    };
    fetchDonations();
  }, []);

  return (
    <div style={{ background: '#fff', minHeight: '100vh', color: '#000' }}>
      <Navbar />
      <div style={{ padding: '30px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>🩸 All Blood Donations</h2>

        {donations.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No donations found.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {donations.map((donation) => (
              <div key={donation._id} style={cardStyle}>
                <p><strong>🩸 Blood Type:</strong> {donation.bloodType}</p>
                <p><strong>📦 Quantity:</strong> {donation.quantity} mL</p>
                <p><strong>📍 Location:</strong> {donation.city}, {donation.state}, {donation.pincode}</p>

                {donation.location && (
                  <a
                    href={`https://www.google.com/maps?q=${donation.location}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#c62828', fontWeight: 'bold' }}
                  >
                    🗺️ View on Map
                  </a>
                )}

                <p><strong>👤 Donor:</strong> {donation.donor?.name}</p>
                <p><strong>📅 Date:</strong> {new Date(donation.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '10px',
  padding: '15px',
  background: '#f9f9f9',
  width: '270px',
  color: '#000',
  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
};

export default AllDonations;
