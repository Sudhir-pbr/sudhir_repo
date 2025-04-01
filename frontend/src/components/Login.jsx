import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/user/${username}`);
      const user = response.data;
      if (user.password === password) {
        onLogin(user);
        navigate('/dashboard', { state: { username: user.username } });
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.status === 404) {
        setError('Invalid username or password');
      } else {
        setError('Login failed. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-[30px] rounded-[10px] shadow-md w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-[10px] border rounded-[5px] mt-2"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-[10px] border rounded-[5px] mt-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-[10px] rounded-[5px] hover:bg-purple-700"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account? <Link to="/register" className="text-purple-600">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;