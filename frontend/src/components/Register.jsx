

// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [generatedOtp, setGeneratedOtp] = useState('');
//   const [error, setError] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const navigate = useNavigate();

//   const generateOTP = () => {
//     const otp = Math.floor(1000 + Math.random() * 9000).toString();
//     return otp;
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     //console.log("Registering with:", { username, password, email, phoneNumber });
//     try {
//       const response = await axios.post('http://localhost:5000/register', {
//         username,
//         password,
//         email,
//         phone_number: phoneNumber
//       });
//       //console.log("Server response:", response);
//       if (response.status === 200 || response.status === 201) {
//         const otp = generateOTP();
//         setGeneratedOtp(otp);
//         alert(`Registration successful! Your OTP is: ${otp}`);
//         setIsOtpSent(true);
//       }
//     } catch (err) {
//       console.error("Registration error:", err.response);
//       const errorMessage = err.response?.data?.message || 'Registration failed';
//       setError(errorMessage);
//     }
//   };

//   const handleVerifyOtp = (e) => {
//     e.preventDefault();
//     if (otp === generatedOtp) {
//       navigate('/dashboard', { state: { username } });
//     } else {
//       setError('Invalid OTP');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-[30px] rounded-[10px] shadow-md w-[400px]">
//         <h2 className="text-2xl font-bold text-center mb-6">
//           {isOtpSent ? 'Verify OTP' : 'Register'}
//         </h2>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//         {!isOtpSent ? (
//           <form onSubmit={handleRegister}>
//             <div className="mb-4">
//               <label htmlFor="username" className="block text-gray-700">Username</label>
//               <input
//                 id="username"
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full p-[10px] border rounded-[5px] mt-2"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="password" className="block text-gray-700">Password</label>
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full p-[10px] border rounded-[5px] mt-2"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-gray-700">Email</label>
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full p-[10px] border rounded-[5px] mt-2"
//                 required
//               />
//             </div>
//             <div className="mb-6">
//               <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
//               <input
//                 id="phoneNumber"
//                 type="tel"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 className="w-full p-[10px] border rounded-[5px] mt-2"
//                 required
//                 pattern="[0-9]{10}"
//                 title="Phone number must be 10 digits"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-purple-600 text-white p-[10px] rounded-[5px] hover:bg-purple-700"
//             >
//               Register
//             </button>
//           </form>
//         ) : (
//           <form onSubmit={handleVerifyOtp}>
//             <div className="mb-6">
//               <label htmlFor="otp" className="block text-gray-700">Enter OTP</label>
//               <input
//                 id="otp"
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="w-full p-[10px] border rounded-[5px] mt-2"
//                 required
//                 maxLength="4"
//                 pattern="[0-9]{4}"
//                 title="OTP must be a 4-digit number"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-purple-600 text-white p-[10px] rounded-[5px] hover:bg-purple-700"
//             >
//               Verify OTP
//             </button>
//           </form>
//         )}
//         {!isOtpSent && (
//           <p className="text-center mt-4">
//             Already have an account? <Link to="/" className="text-purple-600">Login</Link>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Register;








import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const generateOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    return otp;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        password,
        email,
        phone_number: phoneNumber
      });
      if (response.status === 200 || response.status === 201) {
        const otp = generateOTP();
        setGeneratedOtp(otp);
        alert(`Registration successful! Your OTP is: ${otp}`);
        setIsOtpSent(true);
      }
    } catch (err) {
      console.error("Registration error:", err.response);
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      onRegister({ username, email, phone_number: phoneNumber }); // Call onRegister with user data
      navigate('/dashboard');
    } else {
      setError('Invalid OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-[30px] rounded-[10px] shadow-md w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isOtpSent ? 'Verify OTP' : 'Register'}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {!isOtpSent ? (
          <form onSubmit={handleRegister}>
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
            <div className="mb-4">
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
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-[10px] border rounded-[5px] mt-2"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
              <input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-[10px] border rounded-[5px] mt-2"
                required
                pattern="[0-9]{10}"
                title="Phone number must be 10 digits"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-[10px] rounded-[5px] hover:bg-purple-700"
            >
              Register
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className="mb-6">
              <label htmlFor="otp" className="block text-gray-700">Enter OTP</label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-[10px] border rounded-[5px] mt-2"
                required
                maxLength="4"
                pattern="[0-9]{4}"
                title="OTP must be a 4-digit number"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-[10px] rounded-[5px] hover:bg-purple-700"
            >
              Verify OTP
            </button>
          </form>
        )}
        {!isOtpSent && (
          <p className="text-center mt-4">
            Already have an account? <Link to="/login" className="text-purple-600">Login</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;