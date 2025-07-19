import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const JobTimeline = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  const fetchJob = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setJob(data.job);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error('Error fetching job:', err.message);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [jobId]);

  if (!job) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{job.company} - {job.role}</h2>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>⬅ Back</button>
      <h3>Timeline</h3>
      <ul>
        {job.timeline.map((item, index) => (
          <li key={index}>
            <strong>{item.status.toUpperCase()}</strong> on {new Date(item.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobTimeline;
