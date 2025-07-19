import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login');
  };

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/jobs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setJobs(data || []); 
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error('Failed to fetch jobs:', err.message);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        fetchJobs(); 
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error('Failed to delete job:', err.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = filter === 'all' ? jobs : jobs.filter(job => job.status === filter);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, {currentUser?.email}</h2>
      <button onClick={handleLogout} style={{ marginBottom: '1rem' }}>Logout</button>
      <br />
      <Link to="/add-job">
        <button style={{ marginBottom: '1rem' }}>Add New Job</button>
      </Link>
      <div>
        <label>Filter by status: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ marginBottom: '1rem' }}>
          <option value="all">All</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {filteredJobs.length === 0 ? (
        <p>No jobs to display</p>
      ) : (
        <ul>
          {filteredJobs.map((job) => (
            <li key={job._id} style={{ marginBottom: '12px' }}>
              <strong>{job.company}</strong> - {job.role} ({job.status})
              {' '}
              <Link to={`/edit-job/${job._id}`}>
                <button style={{ marginLeft: '10px' }}>Edit</button>
              </Link>
              <button
                onClick={() => handleDelete(job._id)}
                style={{ marginLeft: '6px', color: 'red' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
