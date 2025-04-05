
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [userType, setUserType] = useState('student');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     try {
//       const response = await axios.post('http://localhost:5000/login', {
//         userType: userType === 'institutions' ? 'college' : userType,
//         username,
//         password,
//       });
      
//       if (response.status === 200) {
//         const { token, role, ...userData } = response.data.data;
//         localStorage.setItem('token', token);
//         onLogin({ ...userData, type: role });
        
//       }
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
//       setError(errorMessage);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
//         {error && (
//           <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Login as</label>
//             <div className="flex gap-4">
//               {['student', 'mnc', 'institutions'].map((type) => (
//                 <label key={type} className="flex items-center">
//                   <input
//                     type="radio"
//                     value={type}
//                     checked={userType === type}
//                     onChange={() => setUserType(type)}
//                     className="mr-2"
//                   />
//                   <span className="capitalize">{type === 'institutions' ? 'College' : type}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div className="mb-4">
//             <label htmlFor="username" className="block text-gray-700 mb-1">
//               Username
//             </label>
//             <input
//               id="username"
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label htmlFor="password" className="block text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-center mt-4">
//           Don't have an account?{' '}
//           <Link to="/register" className="text-blue-600 hover:underline">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;











// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [userType, setUserType] = useState('student'); // Default to student
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       // Map frontend userType to backend expected values if needed
//       const backendUserType = userType === 'institutions' ? 'college' : userType;
//       const response = await axios.post('http://localhost:5000/login', {
//         userType: backendUserType,
//         username,
//         password,
//       });

//       if (response.status === 200) {
//         const { token, role, ...userData } = response.data.data; // Assuming backend returns role and user data
//         localStorage.setItem('token', token); // Keep token for consistency, even if not used for auth
//         const user = { ...userData, type: role, username }; // Use 'type' to match App.jsx
//         localStorage.setItem('user', JSON.stringify(user)); // Persist user data
//         onLogin(user); // Update App.jsx state

//         // Navigate based on user type
//         const dashboardPath = 
//           role === 'mnc' ? '/mnc-dashboard' :
//           role === 'college' ? '/college-dashboard' :
//           role === 'admin' ? '/admin-dashboard' :
//           '/dashboard';
//         navigate(dashboardPath);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
//       console.error('Login error:', err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#fdfaf5]">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-[#030060] mb-6 text-center">Login</h2>
//         {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">User Type</label>
//             <select
//               value={userType}
//               onChange={(e) => setUserType(e.target.value)}
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
//             >
//               <option value="student">Student</option>
//               <option value="mnc">MNC</option>
//               <option value="institutions">College</option>
            
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Username</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 mb-2">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-[#6B46C1] text-white py-2 rounded hover:bg-[#1A3C61] transition-colors duration-300"
//           >
//             Login
//           </button>
//         </form>
//         <p className="mt-4 text-center text-gray-600">
//           Don't have an account?{' '}
//           <a href="/register" className="text-[#6B46C1] hover:underline">Register</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
















import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student'); // Default to student
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Map frontend userType to backend expected values if needed
      const backendUserType = userType === 'institutions' ? 'college' : userType;
      const response = await axios.post('http://localhost:5000/login', {
        userType: backendUserType,
        username,
        password,
      });

      if (response.status === 200) {
        const { token, role, ...userData } = response.data.data; // Assuming backend returns role and user data
        localStorage.setItem('token', token); // Keep token for consistency, even if not used for auth
        const user = { ...userData, type: role, username }; // Use 'type' to match App.jsx
        localStorage.setItem('user', JSON.stringify(user)); // Persist user data
        onLogin(user); // Update App.jsx state

        // Navigate based on user type
        const dashboardPath = 
          role === 'mnc' ? '/mnc-dashboard' :
          role === 'college' ? '/college-dashboard' :
          role === 'admin' ? '/admin-dashboard' :
          '/dashboard';
        navigate(dashboardPath);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfaf5]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#030060] mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">User Type</label>
            <div className="flex flex-wrap gap-4 mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="student"
                  checked={userType === 'student'}
                  onChange={(e) => setUserType(e.target.value)}
                  className="form-radio text-[#6B46C1] focus:ring-[#6B46C1]"
                />
                <span className="ml-2">Student</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="mnc"
                  checked={userType === 'mnc'}
                  onChange={(e) => setUserType(e.target.value)}
                  className="form-radio text-[#6B46C1] focus:ring-[#6B46C1]"
                />
                <span className="ml-2">MNC</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="institutions"
                  checked={userType === 'institutions'}
                  onChange={(e) => setUserType(e.target.value)}
                  className="form-radio text-[#6B46C1] focus:ring-[#6B46C1]"
                />
                <span className="ml-2">College</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#6B46C1] text-white py-2 rounded hover:bg-[#1A3C61] transition-colors duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-[#6B46C1] hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;