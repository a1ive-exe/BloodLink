import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LocationSearchMap from '../components/LocationSearchMap';

const Donate = () => {
  const [form, setForm] = useState({
    quantity: '',
    city: '',
    state: '',
    pincode: '',
    location: ''
  });

  const [enableMap, setEnableMap] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    console.log('Form data before submit:', form); // ✅ Debug

    try {
      await axios.post('http://localhost:5000/api/donate', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Donation submitted!');
      navigate('/dashboard');
    } catch (error) {
      console.error('❌ Donation Error:', error);
      alert(`Donation failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
        <h2>Donate Blood</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="quantity"
            type="number"
            placeholder="Quantity (mL)"
            required
            value={form.quantity}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="city"
            type="text"
            placeholder="City"
            required
            value={form.city}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="state"
            type="text"
            placeholder="State"
            required
            value={form.state}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="pincode"
            type="text"
            placeholder="Pincode"
            required
            value={form.pincode}
            onChange={handleChange}
            style={inputStyle}
          />

          <label style={{ display: 'block', margin: '10px 0' }}>
            <input
              type="checkbox"
              checked={enableMap}
              onChange={() => setEnableMap(!enableMap)}
            />{' '}
            Pinpoint location on map
          </label>

          {enableMap && (
            <>
              <LocationSearchMap
                onSelect={(loc) => setForm({ ...form, location: loc })}
              />
              {form.location && (
                <p style={{ color: 'green', marginTop: '5px' }}>
                  📍 Location selected on map
                </p>
              )}
            </>
          )}

          <button type="submit" style={buttonStyle}>
            Donate
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  marginTop: '20px',
  padding: '10px 20px',
  background: '#c62828',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default Donate;
