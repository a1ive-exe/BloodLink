import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (!user) return null;

  return (
    <nav
      style={{
        padding: '10px 20px',
        background: '#f44336',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: '20px' }}>🩸 BloodLink</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span>{user.name} ({user.role})</span>
        <button
          onClick={handleLogout}
          style={{
            background: '#fff',
            color: '#f44336',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
