import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapUpdater = ({ coords }) => {
  const map = useMap();
  map.setView(coords, 13);
  return null;
};

const LocationSearchMap = ({ onSelect }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [position, setPosition] = useState([20.5937, 78.9629]);

  const handleChange = async (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/location/search?q=${value}`);
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error('Autocomplete error:', err);
    }
  };

  const handleSelect = (item) => {
    const coords = [parseFloat(item.lat), parseFloat(item.lon)];
    setPosition(coords);
    setInput(item.display_name);
    setSuggestions([]);
    onSelect(item.display_name);
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        placeholder="Enter city/location"
        value={input}
        onChange={handleChange}
        style={{
          width: '100%',
          padding: '10px',
          margin: '10px 0',
          borderRadius: '4px',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
        }}
      />

      {suggestions.length > 0 && (
        <ul style={{
          listStyle: 'none',
          margin: 0,
          padding: '5px',
          border: '1px solid #ccc',
          borderTop: 'none',
          maxHeight: '150px',
          overflowY: 'auto',
          background: '#fff',
          position: 'absolute',
          zIndex: 1000,
          width: '100%'
        }}>
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(item)}
              style={{ padding: '8px', cursor: 'pointer' }}
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}

      <MapContainer center={position} zoom={13} style={{ height: '300px', width: '100%', marginTop: '10px' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater coords={position} />
        <Marker position={position} />
      </MapContainer>
    </div>
  );
};

export default LocationSearchMap;
