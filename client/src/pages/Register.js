import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'donor', bloodType: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      setMessage('Registered successfully! You can now login.');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxSizing: 'border-box'
      }}>
        <h2 style={{ textAlign: 'center' }}>Register</h2>
        {message && <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={inputStyle}
          />
          <select
            required
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            style={inputStyle}
          >
            <option value="donor">Donor</option>
            <option value="patient">Patient</option>
          </select>

          <select
            required
            value={form.bloodType}
            onChange={(e) => setForm({ ...form, bloodType: e.target.value })}
            style={inputStyle}
          >
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          <button type="submit" style={buttonStyle}>Register</button>
        </form>
        <p style={{ marginTop: '10px', textAlign: 'center' }}>
          Already have an account? <span style={{ color: '#c62828', cursor: 'pointer' }} onClick={() => navigate('/')}>Login here</span>
        </p>
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

const selectStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '4px',
  border: '1px solid #ccc',
  backgroundColor: 'white',
  fontSize: '14px',
  boxSizing: 'border-box',
  appearance: 'none' // removes default arrow on some browsers
};


export default Register;
