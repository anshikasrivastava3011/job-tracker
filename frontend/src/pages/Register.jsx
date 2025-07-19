import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Registration successful!");
      console.log(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Registration failed. Try a different email.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center px-4">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-2">
          Create an Account
        </h1>
        <p className="text-gray-600 text-lg">
          Start tracking your job applications in one place.
        </p>
        <p className="text-gray-600 text-lg">Register to manage your job search and stay organized.</p>
        <p className="text-gray-600 text-lg">Add jobs, track status, and never miss a follow-up!</p>
      </div>

      {/* Register Form Card */}
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        {/* Login Prompt + Button */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 mb-3">Already have an account? Just log in!</p>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
