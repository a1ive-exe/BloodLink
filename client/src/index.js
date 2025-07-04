import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';         // Global styles
import './App.css';           // App-level component styling
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'leaflet/dist/leaflet.css'; // ✅ Needed for map styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
