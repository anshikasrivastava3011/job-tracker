import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AddJob from './pages/AddJob.jsx';
import EditJob from './pages/EditJob.jsx'; 
import JobTimeline from './pages/JobTimeline.jsx';


function ProtectedRoute({ children }) {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-job"
        element={
          <ProtectedRoute>
            <AddJob />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-job/:jobId"
        element={
          <ProtectedRoute>
            <EditJob />
          </ProtectedRoute>
        }
      />
      <Route
        path="/jobs/:jobId"
        element={
          <ProtectedRoute>
            <JobTimeline />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
