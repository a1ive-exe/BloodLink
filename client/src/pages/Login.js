import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
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
          boxSizing: 'border-box'  // ✅ ensure content respects padding
        }}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        {message && <p style={{ color: 'red' }}>{message}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
        <p style={{ marginTop: '10px', textAlign: 'center' }}>
           New user? <span style={{ color: '#c62828', cursor: 'pointer' }} onClick={() => navigate('/register')}>Register here</span>
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
  boxSizing: 'border-box' // ✅ fix overflow issue
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

export default Login;
