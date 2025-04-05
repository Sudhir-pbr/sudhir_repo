// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// const Register = ({ onRegister }) => {
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
//     try {
//       const response = await axios.post('http://localhost:5000/register', {
//         username,
//         password,
//         email,
//         phone_number: phoneNumber
//       });
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
//       onRegister({ username, email, phone_number: phoneNumber }); // Call onRegister with user data
//       navigate('/dashboard');
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
//             Already have an account? <Link to="/login" className="text-purple-600">Login</Link>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Register;































// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// const Register = ({ onRegister }) => {
//   const [userType, setUserType] = useState('student');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
  
//   // College specific fields
//   const [collegeName, setCollegeName] = useState('');
//   const [address, setAddress] = useState('');
//   const [accreditation, setAccreditation] = useState('');
//   const [website, setWebsite] = useState('');
//   const [contactPerson, setContactPerson] = useState('');
//   const [contactPosition, setContactPosition] = useState('');
//   const [documents, setDocuments] = useState(null);
  
//   // MNC specific fields
//   const [companyName, setCompanyName] = useState('');
//   const [industry, setIndustry] = useState('');
  
//   const [otp, setOtp] = useState('');
//   const [generatedOtp, setGeneratedOtp] = useState('');
//   const [error, setError] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const navigate = useNavigate();

//   const generateOTP = () => {
//     return Math.floor(1000 + Math.random() * 9000).toString();
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       let formData = new FormData();
      
//       // Common fields
//       formData.append('username', username);
//       formData.append('password', password);
//       formData.append('email', email);
//       formData.append('phone_number', phoneNumber);
//       formData.append('user_type', userType);
      
//       if (userType === 'college') {
//         formData.append('college_name', collegeName);
//         formData.append('address', address);
//         formData.append('accreditation', accreditation);
//         formData.append('website', website);
//         formData.append('contact_person', contactPerson);
//         formData.append('contact_position', contactPosition);
//         if (documents) {
//           formData.append('documents', documents);
//         }
//       } else if (userType === 'mnc') {
//         formData.append('company_name', companyName);
//         formData.append('industry', industry);
//         formData.append('address', address);
//         formData.append('website', website);
//         formData.append('contact_person', contactPerson);
//         formData.append('contact_position', contactPosition);
//         if (documents) {
//           formData.append('documents', documents);
//         }
//       }

//       const response = await axios.post('http://localhost:5000/register', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

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
//       const userData = { username, email, phone_number: phoneNumber, type: userType };
//       if (userType === 'college') {
//         userData.college_name = collegeName;
//       } else if (userType === 'mnc') {
//         userData.company_name = companyName;
//       }
//       onRegister(userData);
//       navigate('/dashboard');
//     } else {
//       setError('Invalid OTP');
//     }
//   };

//   const handleDocumentUpload = (e) => {
//     setDocuments(e.target.files[0]);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
//         <h2 className="text-2xl font-bold text-center mb-6">
//           {isOtpSent ? 'Verify OTP' : 'Register'}
//         </h2>
        
//         {!isOtpSent && (
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Register as</label>
//             <div className="flex gap-4">
//               {['student', 'college', 'mnc'].map((type) => (
//                 <label key={type} className="flex items-center">
//                   <input
//                     type="radio"
//                     value={type}
//                     checked={userType === type}
//                     onChange={() => setUserType(type)}
//                     className="mr-2"
//                   />
//                   <span className="capitalize">{type}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}

//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
//         {!isOtpSent ? (
//           <form onSubmit={handleRegister}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label htmlFor="username" className="block text-gray-700">Username*</label>
//                 <input
//                   id="username"
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="w-full p-2 border rounded mt-1"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="password" className="block text-gray-700">Password*</label>
//                 <input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full p-2 border rounded mt-1"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="email" className="block text-gray-700">Email*</label>
//                 <input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full p-2 border rounded mt-1"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number*</label>
//                 <input
//                   id="phoneNumber"
//                   type="tel"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   className="w-full p-2 border rounded mt-1"
//                   required
//                   pattern="[0-9]{10}"
//                   title="Phone number must be 10 digits"
//                 />
//               </div>
//             </div>

//             {userType === 'college' && (
//               <>
//                 <div className="border-t pt-4 mb-4">
//                   <h3 className="font-semibold text-lg mb-2">College Information</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label htmlFor="collegeName" className="block text-gray-700">College Name*</label>
//                       <input
//                         id="collegeName"
//                         type="text"
//                         value={collegeName}
//                         onChange={(e) => setCollegeName(e.target.value)}
//                         className="w-full p-2 border rounded mt-1"
//                         required
//                       />
//                     </div>
                    
//                     <div>
//                       <label htmlFor="accreditation" className="block text-gray-700">Accreditation</label>
//                       <input
//                         id="accreditation"
//                         type="text"
//                         value={accreditation}
//                         onChange={(e) => setAccreditation(e.target.value)}
//                         className="w-full p-2 border rounded mt-1"
//                       />
//                     </div>
                    
//                     <div>
//                       <label htmlFor="website" className="block text-gray-700">Website</label>
//                       <input
//                         id="website"
//                         type="url"
//                         value={website}
//                         onChange={(e) => setWebsite(e.target.value)}
//                         className="w-full p-2 border rounded mt-1"
//                       />
//                     </div>
                    
//                     <div>
//                       <label htmlFor="contactPerson" className="block text-gray-700">Contact Person*</label>
//                       <input
//                         id="contactPerson"
//                         type="text"
//                         value={contactPerson}
//                         onChange={(e) => setContactPerson(e.target.value)}
//                         className="w-full p-2 border rounded mt-1"
//                         required
//                       />
//                     </div>
                    
//                     <div>
//                       <label htmlFor="contactPosition" className="block text-gray-700">Contact Position*</label>
//                       <input
//                         id="contactPosition"
//                         type="text"
//                         value={contactPosition}
//                         onChange={(e) => setContactPosition(e.target.value)}
//                         className="w-full p-2 border rounded mt-1"
//                         required
//                       />
//                     </div>
                    
//                     <div>
//                       <label htmlFor="address" className="block text-gray-700">Address*</label>
//                       <textarea
//                         id="address"
//                         value={address}
//                         onChange={(e) => setAddress(e.target.value)}
//                         className="w-full p-2 border rounded mt-1"
//                         required
//                       />
//                     </div>
                    
//                     <div>
//                       <label htmlFor="documents" className="block text-gray-700">Verification Documents*</label>
//                       <input
//                         id="documents"
//                         type="file"
//                         onChange={handleDocumentUpload}
//                         className="w-full p-2 border rounded mt-1"
//                         required
//                         accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                       />
//                       <p className="text-xs text-gray-500">Upload accreditation documents (PDF, DOC, JPG, PNG)</p>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}

//             {userType === 'mnc' && (
//               <>
//                 <div className="border-t pt-4 mb-4">
//                   <h3 className="font-semibold text-lg mb-2">Company Information</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label htmlFor="companyName" className="block text-gray-700">Company Name*</label>
//                       <input
//                         id="companyName"
//                         type="text"
//                         value={companyName}
//                         onChange={(e) => setCompanyName(e.target.value)}
//                         className="w-full p-2 border rounded mt-1"
//                         required
//                       />
//                     </div>
                    
//                     <div>
//                       <label htmlFor="industry" className="block text-gray-700">Industry*</label>
//                       <input
//                         id="industry"
//                         type="text"
//                         value={industry}
//                         onChange={(e) => setIndustry(e.target.value)}
//                         className="w-full p-2 border rounded mt-1"
//                         required
//                       />
//                     </div>
                    
//                     <div>
//                       <label htmlFor="website" className="block text-gray-700">Website</label>
//                       <input
//                         id="website"
//                         type="url"
//                         value={website}
//                         onChange={(e) => setWebsite(e.target.value)}
//                         className="w-full p-2 border rounded mt-1"
//                       />
//                     </div>
                    
//                     <div>
//                       <label htmlFor="contactPerson" className="block text-gray-700">Contact Person*</label>
//                       <input
//                         id="contactPerson"
//                         type="text"
//                         value={contactPerson}
//                         onChange={(e) => setContactPerson(e.target.value)}
//                         className="w-full p-2 border rounded mt-1"
//                         required
//                       />
//                     </div>
                    
//                     <div>
//                       <label htmlFor="contactPosition" className="block text-gray-700">Contact Position*</label>
//                       <input
//                         id="contactPosition"
//                         type="text"
//                         value={contactPosition}
//                         onChange={(e) => setContactPosition(e.target.value)}
//                         className="w-full p-2 border rounded mt-1"
//                         required
//                       />
//                     </div>
                    
//                     <div>
//                       <label htmlFor="address" className="block text-gray-700">Company Address*</label>
//                       <textarea
//                         id="address"
//                         value={address}
//                         onChange={(e) => setAddress(e.target.value)}
//                         className="w-full p-2 border rounded mt-1"
//                         required
//                       />
//                     </div>
                    
//                     <div>
//                       <label htmlFor="documents" className="block text-gray-700">Verification Documents*</label>
//                       <input
//                         id="documents"
//                         type="file"
//                         onChange={handleDocumentUpload}
//                         className="w-full p-2 border rounded mt-1"
//                         required
//                         accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                       />
//                       <p className="text-xs text-gray-500">Upload business registration documents (PDF, DOC, JPG, PNG)</p>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}

//             <button
//               type="submit"
//               className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700 mt-4"
//             >
//               Register
//             </button>
//           </form>
//         ) : (
//           <form onSubmit={handleVerifyOtp}>
//             <div className="mb-6">
//               <label htmlFor="otp" className="block text-gray-700">Enter OTP*</label>
//               <input
//                 id="otp"
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="w-full p-2 border rounded mt-1"
//                 required
//                 maxLength="4"
//                 pattern="[0-9]{4}"
//                 title="OTP must be a 4-digit number"
//               />
//               <p className="text-sm text-gray-500 mt-1">We've sent an OTP to your email/phone</p>
//             </div>
            
//             <button
//               type="submit"
//               className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700"
//             >
//               Verify OTP
//             </button>
//           </form>
//         )}

//         {!isOtpSent && (
//           <p className="text-center mt-4">
//             Already have an account? <Link to="/login" className="text-purple-600 hover:underline">Login</Link>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Register;        for email verification






















import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = ({ onRegister }) => {
  const [userType, setUserType] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [address, setAddress] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPosition, setContactPosition] = useState('');
  const [documents, setDocuments] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('email', email);
      formData.append('phone_number', phoneNumber);
      formData.append('userType', userType);

      if (userType === 'college') {
        formData.append('college_name', collegeName);
        formData.append('address', address);
        formData.append('contact_person', contactPerson);
        formData.append('contact_position', contactPosition);
        if (documents) formData.append('documents', documents);
      } else if (userType === 'mnc') {
        formData.append('company_name', companyName);
        formData.append('industry', industry);
        formData.append('address', address);
        formData.append('contact_person', contactPerson);
        formData.append('contact_position', contactPosition);
        if (documents) formData.append('documents', documents);
      }

      const response = await axios.post('http://localhost:5000/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        const { otp, token } = response.data;
        alert(`Registration successful! Your OTP is: ${otp}`);
        const userOtp = prompt('Please enter the OTP shown in the alert:');
        
        if (userOtp === otp) {
          localStorage.setItem('token', token);
          const userData = { username, email, phone_number: phoneNumber, type: userType };
          if (userType === 'college') userData.college_name = collegeName;
          if (userType === 'mnc') userData.company_name = companyName;
          onRegister(userData);
          navigate('/dashboard');
        } else {
          setError('Invalid OTP. Registration failed.');
          setTimeout(() => setError(''), 5000);
        }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleDocumentUpload = (e) => {
    setDocuments(e.target.files[0]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Register as</label>
          <div className="flex gap-4">
            {['student', 'college', 'mnc'].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  value={type}
                  checked={userType === type}
                  onChange={() => setUserType(type)}
                  className="mr-2"
                />
                <span className="capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleRegister}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="username" className="block text-gray-700">Username*</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded mt-1"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700">Password*</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded mt-1"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700">Email*</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded mt-1"
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number*</label>
              <input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 border rounded mt-1"
                required
                pattern="[0-9]{10}"
                title="Phone number must be 10 digits"
              />
            </div>
          </div>

          {userType === 'college' && (
            <div className="border-t pt-4 mb-4">
              <h3 className="font-semibold text-lg mb-2">College Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="collegeName" className="block text-gray-700">College Name*</label>
                  <input
                    id="collegeName"
                    type="text"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-gray-700">Address*</label>
                  <textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contactPerson" className="block text-gray-700">Contact Person*</label>
                  <input
                    id="contactPerson"
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contactPosition" className="block text-gray-700">Contact Position*</label>
                  <input
                    id="contactPosition"
                    type="text"
                    value={contactPosition}
                    onChange={(e) => setContactPosition(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="documents" className="block text-gray-700">Verification Documents*</label>
                  <input
                    id="documents"
                    type="file"
                    onChange={handleDocumentUpload}
                    className="w-full p-2 border rounded mt-1"
                    required
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </div>
              </div>
            </div>
          )}

          {userType === 'mnc' && (
            <div className="border-t pt-4 mb-4">
              <h3 className="font-semibold text-lg mb-2">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="companyName" className="block text-gray-700">Company Name*</label>
                  <input
                    id="companyName"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="industry" className="block text-gray-700">Industry*</label>
                  <input
                    id="industry"
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-gray-700">Address*</label>
                  <textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contactPerson" className="block text-gray-700">Contact Person*</label>
                  <input
                    id="contactPerson"
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contactPosition" className="block text-gray-700">Contact Position*</label>
                  <input
                    id="contactPosition"
                    type="text"
                    value={contactPosition}
                    onChange={(e) => setContactPosition(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="documents" className="block text-gray-700">Verification Documents*</label>
                  <input
                    id="documents"
                    type="file"
                    onChange={handleDocumentUpload}
                    className="w-full p-2 border rounded mt-1"
                    required
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700 mt-4"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-purple-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;