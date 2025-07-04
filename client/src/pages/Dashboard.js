import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  if (!user) return <p>Please log in</p>;

  const cardStyle = {
    border: '1px solid #ccc',
    padding: '20px',
    margin: '10px',
    borderRadius: '8px',
    background: '#f9f9f9',
    cursor: 'pointer',
    width: '200px',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease-in-out'
  };

  const cardHover = {
    transform: 'scale(1.03)'
  };

  const baseActions = [
    { label: 'My Profile', path: '/profile' } // ✅ Profile card
  ];

  const roleActions = {
    admin: [
      { label: 'All Blood Requests', path: '/admin/requests' },
      { label: 'All Donations', path: '/admin/donations' }
    ],
    donor: [
      { label: 'Donate Blood', path: '/donate' },
      { label: 'My Donations', path: '/my-donations' }
    ],
    patient: [
      { label: 'Request Blood', path: '/request' },
      { label: 'My Requests', path: '/my-requests' }
    ]
  };

  const allActions = [...baseActions, ...roleActions[user.role]];

  return (
    <div>
      <Navbar />
      <div style={{ padding: '30px', textAlign: 'center' }}>
        <h2>Welcome, {user.name}</h2>
        <h4 style={{ marginBottom: '30px' }}>Role: {user.role}</h4>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {allActions.map((action, index) => (
            <div
              key={index}
              style={{ ...cardStyle, ...(hovered === index ? cardHover : {}) }}
              onClick={() => navigate(action.path)}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              {action.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
