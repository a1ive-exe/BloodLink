import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LocationSearchMap from '../components/LocationSearchMap';

const RequestBlood = () => {
  const [form, setForm] = useState({
    quantity: '',
    urgency: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    location: '',
    useMap: false
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/request', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Blood request submitted!');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Request failed');
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
        <h2>Request Blood</h2>
        <form onSubmit={handleSubmit}>
          <input name="quantity" type="number" placeholder="Quantity (mL)" required value={form.quantity} onChange={handleChange} style={inputStyle} />
          <select name="urgency" required value={form.urgency} onChange={handleChange} style={inputStyle}>
            <option value="">Select Urgency</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
          <input name="city" placeholder="City" required value={form.city} onChange={handleChange} style={inputStyle} />
          <input name="state" placeholder="State" required value={form.state} onChange={handleChange} style={inputStyle} />
          <input name="pincode" placeholder="Pincode" required value={form.pincode} onChange={handleChange} style={inputStyle} />
          <input name="country" placeholder="Country" required value={form.country} onChange={handleChange} style={inputStyle} />
          
          <label>
            <input type="checkbox" checked={form.useMap} onChange={(e) => setForm({ ...form, useMap: e.target.checked })} />
            {' '}Pinpoint exact location on map
          </label>

          {form.useMap && (
            <>
              <LocationSearchMap onSelect={(loc) => setForm({ ...form, location: loc })} />
              {form.location && <p>📍 Map Location Selected</p>}
            </>
          )}

          <button type="submit" style={buttonStyle}>Submit Request</button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = { width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' };
const buttonStyle = { marginTop: '20px', padding: '10px 20px', background: '#c62828', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' };

export default RequestBlood;
