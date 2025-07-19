import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('applied');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleAddJob = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated.');
        return;
      }

      const res = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ company, role, status })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
        return;
      }

      setSuccess('✅ Job added successfully!');
      setCompany('');
      setRole('');
      setStatus('applied');

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError('❌ Error adding job. Please try again.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Add New Job</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleAddJob}>
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          style={{ padding: '8px', margin: '8px', width: '300px' }}
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          style={{ padding: '8px', margin: '8px', width: '300px' }}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ padding: '8px', margin: '8px', width: '316px' }}
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
        <br />
        <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
