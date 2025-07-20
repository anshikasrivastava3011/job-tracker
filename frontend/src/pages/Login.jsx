import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      localStorage.setItem('token', data.token);
      const decoded = jwtDecode(data.token);
      setCurrentUser(decoded);
      navigate('/dashboard');
    } catch (err) {
      setError('An error occurred while logging in.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-2">
          Job Application Tracker
        </h1>
        <p className="text-gray-600 text-lg">
          Log in to manage your job search and stay organized.
        </p>
        <p className="text-gray-500 text-sm mt-1">
          Add jobs, track status, and never miss a follow-up!
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login to Continue</h2>

        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 mb-3">Don’t have an account? Register now!</p>
          <button
            onClick={() => navigate("/register")}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;







// import React, { useState, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext.jsx';
// import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from "jwt-decode";

// const Login = () => {
//   const { setCurrentUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const res = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || 'Login failed');
//         return;
//       }

//       localStorage.setItem('token', data.token);
//       const decoded = jwtDecode(data.token);
//       setCurrentUser(decoded);

//       navigate('/dashboard'); // ✅ redirect after login

//     } catch (err) {
//       setError('An error occurred while logging in.');
//     }
//   };

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Login</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           required
//           onChange={(e) => setEmail(e.target.value)}
//           style={{ margin: '8px', padding: '8px' }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           required
//           onChange={(e) => setPassword(e.target.value)}
//           style={{ margin: '8px', padding: '8px' }}
//         />
//         <button type="submit" style={{ padding: '8px 16px' }}>
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login