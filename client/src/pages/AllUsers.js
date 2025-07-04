import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h2>👥 All Registered Users</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead style={{ background: '#f44336', color: 'white' }}>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
