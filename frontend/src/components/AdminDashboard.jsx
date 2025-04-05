// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminDashboard = () => {
//   const [pendingAccounts, setPendingAccounts] = useState({ colleges: [], mncs: [] });
//   const [selectedAccount, setSelectedAccount] = useState(null);
//   const [notes, setNotes] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     fetchPendingVerifications();
//   }, []);

//   const fetchPendingVerifications = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('http://localhost:5000/admin/pending-verifications');
//       setPendingAccounts(response.data);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching pending verifications:', err);
//       setMessage('Failed to load pending verifications');
//       setLoading(false);
//     }
//   };

//   const viewAccountDetails = async (type, id) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`http://localhost:5000/admin/verification-details/${type}/${id}`);
//       setSelectedAccount({ ...response.data, type, id });
//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching account details:', err);
//       setMessage('Failed to load account details');
//       setLoading(false);
//     }
//   };

//   const handleVerification = async (action) => {
//     if (!selectedAccount) return;
    
//     try {
//       setLoading(true);
//       await axios.post('http://localhost:5000/admin/verify-account', {
//         type: selectedAccount.type,
//         id: selectedAccount.id,
//         action,
//         notes
//       });
      
//       setMessage(`Account ${action}d successfully`);
//       setSelectedAccount(null);
//       setNotes('');
//       fetchPendingVerifications();
//     } catch (err) {
//       console.error('Error during verification:', err);
//       setMessage(`Failed to ${action} account`);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-2xl font-bold mb-6">Admin Dashboard - Account Verifications</h1>
      
//       {message && (
//         <div className={`p-4 mb-4 rounded ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//           {message}
//         </div>
//       )}
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Pending Colleges */}
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="text-xl font-semibold mb-4">Pending Colleges</h2>
//           {loading && pendingAccounts.colleges.length === 0 ? (
//             <p>Loading...</p>
//           ) : pendingAccounts.colleges.length === 0 ? (
//             <p className="text-gray-500">No pending college registrations</p>
//           ) : (
//             <ul className="divide-y">
//               {pendingAccounts.colleges.map(college => (
//                 <li key={college.id} className="py-2">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p className="font-medium">{college.college_name}</p>
//                       <p className="text-sm text-gray-600">{college.email}</p>
//                       <p className="text-xs text-gray-500">
//                         Registered: {new Date(college.created_at).toLocaleDateString()}
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => viewAccountDetails('college', college.id)}
//                       className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
//                     >
//                       Review
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
        
//         {/* Pending MNCs */}
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="text-xl font-semibold mb-4">Pending MNCs</h2>
//           {loading && pendingAccounts.mncs.length === 0 ? (
//             <p>Loading...</p>
//           ) : pendingAccounts.mncs.length === 0 ? (
//             <p className="text-gray-500">No pending MNC registrations</p>
//           ) : (
//             <ul className="divide-y">
//               {pendingAccounts.mncs.map(mnc => (
//                 <li key={mnc.id} className="py-2">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p className="font-medium">{mnc.company_name}</p>
//                       <p className="text-sm text-gray-600">{mnc.email}</p>
//                       <p className="text-xs text-gray-500">
//                         Registered: {new Date(mnc.created_at).toLocaleDateString()}
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => viewAccountDetails('mnc', mnc.id)}
//                       className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
//                     >
//                       Review
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
      
//       {/* Account Details Modal */}
//       {selectedAccount && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
//             <div className="p-6">
//               <h2 className="text-xl font-bold mb-4">
//                 Verify {selectedAccount.type === 'college' ? 'College' : 'MNC'} Account
//               </h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <p className="font-semibold">Name:</p>
//                   <p>{selectedAccount.college_name || selectedAccount.company_name}</p>
//                 </div>
//                 <div>
//                   <p className="font-semibold">Username:</p>
//                   <p>{selectedAccount.username}</p>
//                 </div>
//                 <div>
//                   <p className="font-semibold">Email:</p>
//                   <p>{selectedAccount.email}</p>
//                 </div>
//                 <div>
//                   <p className="font-semibold">Phone:</p>
//                   <p>{selectedAccount.phone_number}</p>
//                 </div>
//                 <div>
//                   <p className="font-semibold">Contact Person:</p>
//                   <p>{selectedAccount.contact_person} ({selectedAccount.contact_person_position})</p>
//                 </div>
//                 {selectedAccount.type === 'mnc' && (
//                   <div>
//                     <p className="font-semibold">Industry:</p>
//                     <p>{selectedAccount.industry}</p>
//                   </div>
//                 )}
//                 <div className="md:col-span-2">
//                   <p className="font-semibold">Address:</p>
//                   <p>{selectedAccount.address}</p>
//                 </div>
//                 {selectedAccount.type === 'college' && selectedAccount.accreditation && (
//                   <div>
//                     <p className="font-semibold">Accreditation:</p>
//                     <p>{selectedAccount.accreditation}</p>
//                   </div>
//                 )}
//                 <div>
//                   <p className="font-semibold">Website:</p>
//                   <a href={selectedAccount.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">
//                     {selectedAccount.website}
//                   </a>
//                 </div>
//                 <div>
//                   <p className="font-semibold">Documents:</p>
//                   {selectedAccount.verification_documents ? (
//                     <a 
//                       href={`http://localhost:5000/uploads/${selectedAccount.verification_documents}`} 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="text-blue-500"
//                     >
//                       View Documents
//                     </a>
//                   ) : (
//                     <p>No documents uploaded</p>
//                   )}
//                 </div>
//               </div>
              
//               <div className="mb-4">
//                 <label htmlFor="adminNotes" className="block font-semibold mb-2">Admin Notes:</label>
//                 <textarea
//                   id="adminNotes"
//                   value={notes}
//                   onChange={(e) => setNotes(e.target.value)}
//                   className="w-full p-2 border rounded"
//                   rows="3"
//                   placeholder="Add any notes for approval/rejection..."
//                 />
//               </div>
              
//               <div className="flex justify-end gap-4">
//                 <button
//                   onClick={() => {
//                     setSelectedAccount(null);
//                     setNotes('');
//                   }}
//                   className="px-4 py-2 border rounded hover:bg-gray-100"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => handleVerification('reject')}
//                   className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                   disabled={loading}
//                 >
//                   {loading ? 'Processing...' : 'Reject'}
//                 </button>
//                 <button
//                   onClick={() => handleVerification('approve')}
//                   className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                   disabled={loading}
//                 >
//                   {loading ? 'Processing...' : 'Approve'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;
















// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Header from './Header'; // Assuming you want to reuse Header
// import Footer from './Footer';

// const AdminDashboard = () => {
//   const { token } = useParams(); // Get token from URL
//   const navigate = useNavigate();
//   const [pendingAccounts, setPendingAccounts] = useState({ colleges: [], mncs: [] });
//   const [selectedAccount, setSelectedAccount] = useState(null);
//   const [notes, setNotes] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     fetchPendingVerifications();
//   }, []);

//   const fetchPendingVerifications = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`http://localhost:5000/admin/pending-verifications`, {
//         params: { token }
//       });
//       setPendingAccounts(response.data);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching pending verifications:', err);
//       setMessage('Failed to load pending verifications. Token may be invalid or expired.');
//       setLoading(false);
//       setTimeout(() => navigate('/'), 3000); // Redirect to login after 3s
//     }
//   };

//   const viewAccountDetails = async (type, id) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`http://localhost:5000/admin/verification-details/${type}/${id}`, {
//         params: { token }
//       });
//       setSelectedAccount({ ...response.data, type, id });
//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching account details:', err);
//       setMessage('Failed to load account details');
//       setLoading(false);
//     }
//   };

//   const handleVerification = async (action) => {
//     if (!selectedAccount) return;
    
//     try {
//       setLoading(true);
//       await axios.post('http://localhost:5000/admin/verify-account', {
//         type: selectedAccount.type,
//         id: selectedAccount.id,
//         action,
//         notes,
//         token
//       });
      
//       setMessage(`Account ${action}d successfully`);
//       setSelectedAccount(null);
//       setNotes('');
//       fetchPendingVerifications();
//     } catch (err) {
//       console.error('Error during verification:', err);
//       setMessage(`Failed to ${action} account`);
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     navigate('/'); // Simply redirect to login page
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Header user={null} onFetchUserDetails={() => {}} onLogout={handleLogout} isScrolled={false} />
//       <div className="p-6 flex-1">
//         <h1 className="text-2xl font-bold mb-6">Admin Dashboard - Account Verifications</h1>
        
//         {message && (
//           <div className={`p-4 mb-4 rounded ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//             {message}
//           </div>
//         )}
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white p-4 rounded shadow">
//             <h2 className="text-xl font-semibold mb-4">Pending Colleges</h2>
//             {loading && pendingAccounts.colleges.length === 0 ? (
//               <p>Loading...</p>
//             ) : pendingAccounts.colleges.length === 0 ? (
//               <p className="text-gray-500">No pending college registrations</p>
//             ) : (
//               <ul className="divide-y">
//                 {pendingAccounts.colleges.map(college => (
//                   <li key={college.id} className="py-2">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="font-medium">{college.college_name}</p>
//                         <p className="text-sm text-gray-600">{college.email}</p>
//                         <p className="text-xs text-gray-500">
//                           Registered: {new Date(college.created_at).toLocaleDateString()}
//                         </p>
//                       </div>
//                       <button
//                         onClick={() => viewAccountDetails('college', college.id)}
//                         className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
//                       >
//                         Review
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
          
//           <div className="bg-white p-4 rounded shadow">
//             <h2 className="text-xl font-semibold mb-4">Pending MNCs</h2>
//             {loading && pendingAccounts.mncs.length === 0 ? (
//               <p>Loading...</p>
//             ) : pendingAccounts.mncs.length === 0 ? (
//               <p className="text-gray-500">No pending MNC registrations</p>
//             ) : (
//               <ul className="divide-y">
//                 {pendingAccounts.mncs.map(mnc => (
//                   <li key={mnc.id} className="py-2">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="font-medium">{mnc.company_name}</p>
//                         <p className="text-sm text-gray-600">{mnc.email}</p>
//                         <p className="text-xs text-gray-500">
//                           Registered: {new Date(mnc.created_at).toLocaleDateString()}
//                         </p>
//                       </div>
//                       <button
//                         onClick={() => viewAccountDetails('mnc', mnc.id)}
//                         className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
//                       >
//                         Review
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
        
//         {selectedAccount && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
//               <div className="p-6">
//                 <h2 className="text-xl font-bold mb-4">
//                   Verify {selectedAccount.type === 'college' ? 'College' : 'MNC'} Account
//                 </h2>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <p className="font-semibold">Name:</p>
//                     <p>{selectedAccount.college_name || selectedAccount.company_name}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold">Username:</p>
//                     <p>{selectedAccount.username}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold">Email:</p>
//                     <p>{selectedAccount.email}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold">Phone:</p>
//                     <p>{selectedAccount.phone_number}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold">Contact Person:</p>
//                     <p>{selectedAccount.contact_person} ({selectedAccount.contact_person_position})</p>
//                   </div>
//                   {selectedAccount.type === 'mnc' && (
//                     <div>
//                       <p className="font-semibold">Industry:</p>
//                       <p>{selectedAccount.industry}</p>
//                     </div>
//                   )}
//                   <div className="md:col-span-2">
//                     <p className="font-semibold">Address:</p>
//                     <p>{selectedAccount.address}</p>
//                   </div>
//                   {selectedAccount.type === 'college' && selectedAccount.accreditation && (
//                     <div>
//                       <p className="font-semibold">Accreditation:</p>
//                       <p>{selectedAccount.accreditation}</p>
//                     </div>
//                   )}
//                   <div>
//                     <p className="font-semibold">Website:</p>
//                     <a href={selectedAccount.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">
//                       {selectedAccount.website}
//                     </a>
//                   </div>
//                   <div>
//                     <p className="font-semibold">Documents:</p>
//                     {selectedAccount.verification_documents ? (
//                       <a 
//                         href={`http://localhost:5000/uploads/${selectedAccount.verification_documents}`} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="text-blue-500"
//                       >
//                         View Documents
//                       </a>
//                     ) : (
//                       <p>No documents uploaded</p>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="mb-4">
//                   <label htmlFor="adminNotes" className="block font-semibold mb-2">Admin Notes:</label>
//                   <textarea
//                     id="adminNotes"
//                     value={notes}
//                     onChange={(e) => setNotes(e.target.value)}
//                     className="w-full p-2 border rounded"
//                     rows="3"
//                     placeholder="Add any notes for approval/rejection..."
//                   />
//                 </div>
                
//                 <div className="flex justify-end gap-4">
//                   <button
//                     onClick={() => {
//                       setSelectedAccount(null);
//                       setNotes('');
//                     }}
//                     className="px-4 py-2 border rounded hover:bg-gray-100"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => handleVerification('reject')}
//                     className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     disabled={loading}
//                   >
//                     {loading ? 'Processing...' : 'Reject'}
//                   </button>
//                   <button
//                     onClick={() => handleVerification('approve')}
//                     className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                     disabled={loading}
//                   >
//                     {loading ? 'Processing...' : 'Approve'}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default AdminDashboard;




















// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Header from './Header';
// import Footer from './Footer';

// const AdminDashboard = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const [pendingAccounts, setPendingAccounts] = useState({ colleges: [], mncs: [] });
//   const [selectedAccount, setSelectedAccount] = useState(null);
//   const [notes, setNotes] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [tokenValid, setTokenValid] = useState(false);

//   // First check if token is valid
//   useEffect(() => {
//     const validateToken = async () => {
//       try {
//         setLoading(true);
//         await axios.get(`http://localhost:5000/admin/validate-token`, {
//           params: { token }
//         });
//         setTokenValid(true);
//         fetchPendingVerifications();
//       } catch (err) {
//         console.error('Token validation failed:', err);
//         setMessage('Invalid or expired admin token. Redirecting to login...');
//         setTimeout(() => navigate('/'), 3000);
//       } finally {
//         setLoading(false);
//       }
//     };

//     validateToken();
//   }, [token, navigate]);


//   const fetchPendingVerifications = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         'http://localhost:5000/admin/pending-verifications',
//         { 
//           params: { token },
//           timeout: 5000 // 5 second timeout
//         }
//       );
  
//       console.log("API Response:", response.data); // Debug log
      
//       if (response.data && (response.data.colleges || response.data.mncs)) {
//         setPendingAccounts({
//           colleges: response.data.colleges || [],
//           mncs: response.data.mncs || []
//         });
//       } else {
//         throw new Error("Invalid response format");
//       }
      
//     } catch (err) {
//       console.error("Full error details:", {
//         message: err.message,
//         config: err.config,
//         response: err.response?.data
//       });
      
//       setMessage(`Failed to load: ${err.response?.data?.message || err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };
//   // ... rest of your component code remains the same ...
  
//   const viewAccountDetails = async (type, id) => {
//     try {
//       setLoading(true);
//       setMessage('');
      
//       console.log(`Fetching ${type} details for ID: ${id}`);
//       const response = await axios.get(
//         `http://localhost:5000/admin/verification-details/${type}/${id}`,
//         { 
//           params: { token },
//           headers: {
//             'Cache-Control': 'no-cache'
//           }
//         }
//       );
  
//       console.log('API Response:', response.data);
  
//       if (!response.data?.success) {
//         throw new Error(response.data?.message || 'Invalid response from server');
//       }
  
//       const accountData = {
//         ...response.data.data,
//         type,
//         id,
//         // Standardize property names
//         college_name: response.data.data.institution_name || response.data.data.college_name,
//         company_name: response.data.data.company_name,
//         contact_person_position: response.data.data.contact_position || response.data.data.contact_person_position
//       };
  
//       setSelectedAccount(accountData);
//       console.log('Successfully loaded account:', accountData.email);
  
//     } catch (err) {
//       console.error('Error loading account details:', {
//         error: err.message,
//         response: err.response?.data,
//         config: err.config
//       });
  
//       setMessage(
//         err.response?.data?.error 
//           ? `Failed to load: ${err.response.data.error}`
//           : 'Failed to load account details. Please try again.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerification = async (action) => {
//     if (!selectedAccount) return;
    
//     try {
//       setLoading(true);
//       await axios.post('http://localhost:5000/admin/verify-account', {
//         type: selectedAccount.type,
//         id: selectedAccount.id,
//         action,
//         notes,
//         token
//       });
      
//       setMessage(`Account ${action}d successfully`);
//       setSelectedAccount(null);
//       setNotes('');
//       fetchPendingVerifications();
//     } catch (err) {
//       console.error('Error during verification:', err);
//       setMessage(`Failed to ${action} account`);
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     navigate('/'); // Simply redirect to login page
//   };
//   if (!tokenValid) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
//         <div className="bg-white p-8 rounded shadow-md max-w-md w-full text-center">
//           {loading ? (
//             <p>Validating admin access...</p>
//           ) : (
//             <p className="text-red-500">{message || 'You do not have admin access'}</p>
//           )}
//         </div>
//       </div>
//     );
//   }

//   // ... rest of your return statement ...
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Header user={null} onFetchUserDetails={() => {}} onLogout={handleLogout} isScrolled={false} />
//       <div className="p-6 flex-1">
//         <h1 className="text-2xl font-bold mb-6">Admin Dashboard - Account Verifications</h1>
        
//         {message && (
//           <div className={`p-4 mb-4 rounded ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//             {message}
//           </div>
//         )}
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white p-4 rounded shadow">
//             <h2 className="text-xl font-semibold mb-4">Pending Colleges</h2>
//             {loading && pendingAccounts.colleges.length === 0 ? (
//               <p>Loading...</p>
//             ) : pendingAccounts.colleges.length === 0 ? (
//               <p className="text-gray-500">No pending college registrations</p>
//             ) : (
//               <ul className="divide-y">
//                 {pendingAccounts.colleges.map(college => (
//                   <li key={college.id} className="py-2">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="font-medium">{college.college_name}</p>
//                         <p className="text-sm text-gray-600">{college.email}</p>
//                         <p className="text-xs text-gray-500">
//                           Registered: {new Date(college.created_at).toLocaleDateString()}
//                         </p>
//                       </div>
//                       <button
//                         onClick={() => viewAccountDetails('college', college.id)}
//                         className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
//                       >
//                         Review
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
          
//           <div className="bg-white p-4 rounded shadow">
//             <h2 className="text-xl font-semibold mb-4">Pending MNCs</h2>
//             {loading && pendingAccounts.mncs.length === 0 ? (
//               <p>Loading...</p>
//             ) : pendingAccounts.mncs.length === 0 ? (
//               <p className="text-gray-500">No pending MNC registrations</p>
//             ) : (
//               <ul className="divide-y">
//                 {pendingAccounts.mncs.map(mnc => (
//                   <li key={mnc.id} className="py-2">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="font-medium">{mnc.company_name}</p>
//                         <p className="text-sm text-gray-600">{mnc.email}</p>
//                         <p className="text-xs text-gray-500">
//                           Registered: {new Date(mnc.created_at).toLocaleDateString()}
//                         </p>
//                       </div>
//                       <button
//                         onClick={() => viewAccountDetails('mnc', mnc.id)}
//                         className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
//                       >
//                         Review
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
        
//         {selectedAccount && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
//               <div className="p-6">
//                 <h2 className="text-xl font-bold mb-4">
//                   Verify {selectedAccount.type === 'college' ? 'College' : 'MNC'} Account
//                 </h2>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <p className="font-semibold">Name:</p>
//                     <p>{selectedAccount.college_name || selectedAccount.company_name}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold">Username:</p>
//                     <p>{selectedAccount.username}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold">Email:</p>
//                     <p>{selectedAccount.email}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold">Phone:</p>
//                     <p>{selectedAccount.phone_number}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold">Contact Person:</p>
//                     <p>{selectedAccount.contact_person} ({selectedAccount.contact_person_position})</p>
//                   </div>
//                   {selectedAccount.type === 'mnc' && (
//                     <div>
//                       <p className="font-semibold">Industry:</p>
//                       <p>{selectedAccount.industry}</p>
//                     </div>
//                   )}
//                   <div className="md:col-span-2">
//                     <p className="font-semibold">Address:</p>
//                     <p>{selectedAccount.address}</p>
//                   </div>
//                   {selectedAccount.type === 'college' && selectedAccount.accreditation && (
//                     <div>
//                       <p className="font-semibold">Accreditation:</p>
//                       <p>{selectedAccount.accreditation}</p>
//                     </div>
//                   )}
//                   <div>
//                     <p className="font-semibold">Website:</p>
//                     <a href={selectedAccount.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">
//                       {selectedAccount.website}
//                     </a>
//                   </div>
//                   <div>
//                     <p className="font-semibold">Documents:</p>
//                     {selectedAccount.verification_documents ? (
//                       <a 
//                         href={`http://localhost:5000/uploads/${selectedAccount.verification_documents}`} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="text-blue-500"
//                       >
//                         View Documents
//                       </a>
//                     ) : (
//                       <p>No documents uploaded</p>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="mb-4">
//                   <label htmlFor="adminNotes" className="block font-semibold mb-2">Admin Notes:</label>
//                   <textarea
//                     id="adminNotes"
//                     value={notes}
//                     onChange={(e) => setNotes(e.target.value)}
//                     className="w-full p-2 border rounded"
//                     rows="3"
//                     placeholder="Add any notes for approval/rejection..."
//                   />
//                 </div>
                
//                 <div className="flex justify-end gap-4">
//                   <button
//                     onClick={() => {
//                       setSelectedAccount(null);
//                       setNotes('');
//                     }}
//                     className="px-4 py-2 border rounded hover:bg-gray-100"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => handleVerification('reject')}
//                     className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     disabled={loading}
//                   >
//                     {loading ? 'Processing...' : 'Reject'}
//                   </button>
//                   <button
//                     onClick={() => handleVerification('approve')}
//                     className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                     disabled={loading}
//                   >
//                     {loading ? 'Processing...' : 'Approve'}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default AdminDashboard;





























import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const AdminDashboard = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [pendingAccounts, setPendingAccounts] = useState({ colleges: [], mncs: [] });
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      try {
        setLoading(true);
        await axios.get(`http://localhost:5000/admin/validate-token`, {
          params: { token }
        });
        setTokenValid(true);
        fetchPendingVerifications();
      } catch (err) {
        console.error('Token validation failed:', err);
        setMessage('Invalid or expired admin token. Redirecting to login...');
        setTimeout(() => navigate('/'), 3000);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [token, navigate]);

  const fetchPendingVerifications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'http://localhost:5000/admin/pending-verifications',
        { 
          params: { token },
          timeout: 5000
        }
      );
  
      console.log("API Response:", response.data);
      
      if (response.data && (response.data.colleges || response.data.mncs)) {
        setPendingAccounts({
          colleges: response.data.colleges || [],
          mncs: response.data.mncs || []
        });
      } else {
        throw new Error("Invalid response format");
      }
      
    } catch (err) {
      console.error("Full error details:", {
        message: err.message,
        config: err.config,
        response: err.response?.data
      });
      
      setMessage(`Failed to load: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const viewAccountDetails = async (type, id) => {
    try {
      setLoading(true);
      setMessage('');
      
      console.log(`Fetching ${type} details for ID: ${id}`);
      const response = await axios.get(
        `http://localhost:5000/admin/verification-details/${type}/${id}`,
        { 
          params: { token },
          headers: {
            'Cache-Control': 'no-cache'
          }
        }
      );
  
      console.log('API Response:', response.data);
  
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Invalid response from server');
      }
  
      const accountData = {
        ...response.data.data,
        type,
        id,
        college_name: response.data.data.institution_name || response.data.data.college_name,
        company_name: response.data.data.company_name,
        contact_person_position: response.data.data.contact_position || response.data.data.contact_person_position
      };
  
      setSelectedAccount(accountData);
      console.log('Successfully loaded account:', accountData.email);
  
    } catch (err) {
      console.error('Error loading account details:', {
        error: err.message,
        response: err.response?.data,
        config: err.config
      });
  
      setMessage(
        err.response?.data?.error 
          ? `Failed to load: ${err.response.data.error}`
          : 'Failed to load account details. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (action) => {
    if (!selectedAccount) return;
    
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/admin/verify-account', {
  type: selectedAccount.type,
  id: selectedAccount.id,
  action,
  notes
}, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
      
      setMessage(`Account ${action}d successfully`);
      setSelectedAccount(null);
      setNotes('');
      fetchPendingVerifications();
    } catch (err) {
      console.error('Error during verification:', err);
      setMessage(`Failed to ${action} account`);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  if (!tokenValid) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full text-center">
          {loading ? (
            <p>Validating admin access...</p>
          ) : (
            <p className="text-red-500">{message || 'You do not have admin access'}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header user={null} onFetchUserDetails={() => {}} onLogout={handleLogout} isScrolled={false} />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard - Account Verifications</h1>
        
        {message && (
          <div className={`p-4 mb-4 rounded ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Pending Colleges</h2>
            {loading && pendingAccounts.colleges.length === 0 ? (
              <p>Loading...</p>
            ) : pendingAccounts.colleges.length === 0 ? (
              <p className="text-gray-500">No pending college registrations</p>
            ) : (
              <ul className="divide-y">
                {pendingAccounts.colleges.map(college => (
                  <li key={college.id} className="py-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{college.institution_name}</p>
                        <p className="text-sm text-gray-600">{college.email}</p>
                        <p className="text-xs text-gray-500">
                          Registered: {new Date(college.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => viewAccountDetails('college', college.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                      >
                        Review
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Pending MNCs</h2>
            {loading && pendingAccounts.mncs.length === 0 ? (
              <p>Loading...</p>
            ) : pendingAccounts.mncs.length === 0 ? (
              <p className="text-gray-500">No pending MNC registrations</p>
            ) : (
              <ul className="divide-y">
                {pendingAccounts.mncs.map(mnc => (
                  <li key={mnc.id} className="py-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{mnc.company_name}</p>
                        <p className="text-sm text-gray-600">{mnc.email}</p>
                        <p className="text-xs text-gray-500">
                          Registered: {new Date(mnc.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => viewAccountDetails('mnc', mnc.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                      >
                        Review
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {selectedAccount && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
              <div className="p-6">
                <incorporate className="text-xl font-bold mb-4">
                  Verify {selectedAccount.type === 'college' ? 'College' : 'MNC'} Account
                </incorporate>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="font-semibold">Name:</p>
                    <p>{selectedAccount.college_name || selectedAccount.company_name}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Username:</p>
                    <p>{selectedAccount.username}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Email:</p>
                    <p>{selectedAccount.email}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Phone:</p>
                    <p>{selectedAccount.phone_number}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Contact Person:</p>
                    <p>{selectedAccount.contact_person} ({selectedAccount.contact_person_position})</p>
                  </div>
                  {selectedAccount.type === 'mnc' && (
                    <div>
                      <p className="font-semibold">Industry:</p>
                      <p>{selectedAccount.industry}</p>
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <p className="font-semibold">Address:</p>
                    <p>{selectedAccount.address}</p>
                  </div>
                  {selectedAccount.type === 'mnc' && (
                    <div>
                      <p className="font-semibold">Verified Status:</p>
                      <p>{selectedAccount.verified ? 'Yes' : 'No'}</p>
                    </div>
                  )}
                  {selectedAccount.type === 'mnc' && selectedAccount.admin_notes && (
                    <div className="md:col-span-2">
                      <p className="font-semibold">Admin Notes:</p>
                      <p>{selectedAccount.admin_notes}</p>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">Active Status:</p>
                    <p>{selectedAccount.is_active ? 'Active' : 'Inactive'}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Created At:</p>
                    <p>{new Date(selectedAccount.created_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Documents:</p>
                    {selectedAccount.verification_documents ? (
                      <a 
                        href={`http://localhost:5000/uploads/${selectedAccount.verification_documents}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        View Documents
                      </a>
                    ) : (
                      <p>No documents uploaded</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="adminNotes" className="block font-semibold mb-2">Admin Notes:</label>
                  <textarea
                    id="adminNotes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows="3"
                    placeholder="Add any notes for approval/rejection..."
                  />
                </div>
                
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setSelectedAccount(null);
                      setNotes('');
                    }}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleVerification('reject')}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Reject'}
                  </button>
                  <button
                    onClick={() => handleVerification('approve')}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Approve'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;