import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };

    fetchProfile();
  }, [token]);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch('http://localhost:5000/api/profile/update-password', {
        currentPassword,
        newPassword,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('✅ Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Failed to update password');
    }
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '500px', margin: '30px auto', padding: '20px' }}>
        <h2>👤 My Profile</h2>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.role}</p>
        <p><strong>Blood Type:</strong> {profile.bloodType || 'Not specified'}</p>

        <hr />
        <h3>🔐 Change Password</h3>
        <form onSubmit={handlePasswordUpdate}>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Update Password</button>
        </form>
        {message && <p style={{ marginTop: '10px' }}>{message}</p>}
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '4px',
  border: '1px solid #ccc',
  boxSizing: 'border-box'
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  background: '#c62828',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default Profile;
