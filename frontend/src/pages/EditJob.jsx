import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('applied');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.message || 'Failed to fetch job');
          return;
        }

        setCompany(data.company);
        setRole(data.role);
        setStatus(data.status);
      } catch (err) {
        setError('Something went wrong while fetching job');
      }
    };

    fetchJob();
  }, [jobId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ company, role, status })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Update failed');
        return;
      }

      navigate('/dashboard');
    } catch (err) {
      setError('Error updating job. Please try again.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Edit Job</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          style={{ padding: '8px', margin: '8px' }}
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          style={{ padding: '8px', margin: '8px' }}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ padding: '8px', margin: '8px' }}
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
        <br />
        <button type="submit" style={{ padding: '8px 16px' }}>Update Job</button>
      </form>
    </div>
  );
};

export default EditJob;
