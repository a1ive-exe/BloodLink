import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Donate from './pages/Donate';
import MyDonations from './pages/MyDonations';
import RequestBlood from './pages/RequestBlood';
import MyRequests from './pages/MyRequests';
import AllRequests from './pages/AllRequests';
import AllDonations from './pages/AllDonations';
import ProtectedRoute from './components/ProtectedRoute';
import AllUsers from './pages/AllUsers';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />

        {/* Donor-only */}
        <Route path="/donate" element={<ProtectedRoute element={<Donate />} allowedRoles={['donor']} />} />
        <Route path="/my-donations" element={<ProtectedRoute element={<MyDonations />} allowedRoles={['donor']} />} />

        {/* Patient-only */}
        <Route path="/request" element={<ProtectedRoute element={<RequestBlood />} allowedRoles={['patient']} />} />
        <Route path="/my-requests" element={<ProtectedRoute element={<MyRequests />} allowedRoles={['patient']} />} />

        {/* Admin-only */}
        <Route path="/admin/requests" element={<ProtectedRoute element={<AllRequests />} allowedRoles={['admin']} />} />
        <Route path="/admin/donations" element={<ProtectedRoute element={<AllDonations />} allowedRoles={['admin']} />} />
        <Route path="/admin/users" element={<ProtectedRoute element={<AllUsers />} allowedRoles={['admin']} />} />

        {/* Optional: 404 fallback */}
        <Route path="*" element={<h2 style={{ textAlign: 'center', marginTop: '50px' }}>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
