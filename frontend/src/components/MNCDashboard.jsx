
// import { useState, useEffect } from 'react';
// import StatsCard from "./StatsCard";
// import BarChart from "./Charts/BarChart";
// import DonutChart from "./Charts/DonutChart";
// import DataTable from "./DataTable";
// import Header from './Header';
// import Footer from './Footer';

// const MNCDashboard = () => {
//   const [stats, setStats] = useState([]);
//   const [candidates, setCandidates] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filters, setFilters] = useState({
//     specialization: 'All Specializations',
//     status: 'All Status'
//   });

//   const statusClasses = {
//     shortlisted: 'bg-green-100 text-green-600',
//     pending: 'bg-yellow-100 text-yellow-600',
//     rejected: 'bg-red-100 text-red-600',
//     interview: 'bg-blue-100 text-blue-600',
//     offer: 'bg-purple-100 text-purple-600'
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const controller = new AbortController();
//         const signal = controller.signal;
//         setTimeout(() => controller.abort(), 8000);
    
//         const [statsRes, candidatesRes, collegesRes] = await Promise.all([
//           fetch('http://localhost:5000/api/candidate-stats', { signal }),
//           fetch('http://localhost:5000/api/candidates', { signal }),
//           fetch('http://localhost:5000/api/colleges', { signal })
//         ]);
    
//         if (!statsRes.ok) throw new Error(`Stats: ${statsRes.statusText}`);
//         if (!candidatesRes.ok) throw new Error(`Candidates: ${candidatesRes.statusText}`);
//         if (!collegesRes.ok) throw new Error(`Colleges: ${collegesRes.statusText}`);

//         const [statsData, candidatesData, collegesData] = await Promise.all([
//           statsRes.json(),
//           candidatesRes.json(),
//           collegesRes.json()
//         ]);

//         // setStats([
//         //   { value: statsData.total, label: 'Total Candidates', icon: '👨‍🎓', color: 'blue' },
//         //   { value: statsData.shortlisted, label: 'Shortlisted', icon: '✓', color: 'green' },
//         //   { value: statsData.interviews, label: 'Interviews Scheduled', icon: '📝', color: 'purple' },
//         //   { value: statsData.offers, label: 'Offers Sent', icon: '🏆', color: 'orange' }
//         // ]);


//         setStats([
//           { title: 'Total Candidates', value: statsData.total, description: 'All candidates in system', color: 'blue' },
//           { title: 'Shortlisted', value: statsData.shortlisted, description: 'Candidates shortlisted', color: 'green' },
//           { title: 'Interviews', value: statsData.interviews, description: 'Candidates in interview stage', color: 'purple' },
//           { title: 'Offers', value: statsData.offers, description: 'Total offers received', color: 'orange' }
//         ]);

//         setCandidates(candidatesData);
//         setColleges(collegesData);
//       } catch (err) {
//         setError(err.name === 'AbortError' ? 'Request timed out' : err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const filteredCandidates = candidates.filter(candidate => {
//     const matchesSpecialization = filters.specialization === 'All Specializations' || 
//                                candidate.specialization === filters.specialization;
//     const matchesStatus = filters.status === 'All Status' || 
//                          candidate.status === filters.status.toLowerCase();
//     return matchesSpecialization && matchesStatus;
//   });

//   if (loading) return (
//     <>
//     <Header/>
//     <div className="flex justify-center items-center h-full">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//     </div>
//     <Footer/>
//     </>
//   );

//   if (error) return (
//     <>
//     <Header/>
//     <div className="flex justify-center items-center h-full">
//       <div className="text-center p-6 max-w-md">
//         <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Data</h2>
//         <p className="text-red-500 mb-4">{error}</p>
//         <button 
//           onClick={() => window.location.reload()}
//           className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
//         >
//           Retry
//         </button>
//       </div>
//     </div>
//     <Footer/>
//     </>
//   );

//   return (
//     <>
//     <Header/>
//     <div className="p-8  bg-[#fdfaf5] overflow-auto">
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-[100px]">
//   {stats.map((stat, index) => {
//     console.log('MNC Dashboard - Rendering stat:', stat);
//     return (
//       <StatsCard
//         key={index}
//         title={stat.title}
//         value={stat.value}
//         description={stat.description}
//         color={stat.color}
//       />
//     );
//   })}
// </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         <div className="bg-white rounded-lg shadow p-6">
//           <BarChart 
//             title="Top Skills In Demand"
//             labels={[...new Set(candidates.flatMap(c => c.skills))].slice(0, 5)}
//             data={[78, 65, 58, 52, 48]}
//           />
//         </div>
//         <div className="bg-white rounded-lg shadow p-6">
//           <DonutChart 
//             title="Application Status"
//             labels={['Shortlisted', 'Pending', 'Interview', 'Rejected']}
//             data={[
//               stats.find(s => s.label === 'Shortlisted')?.value || 0,
//               candidates.length - (stats.find(s => s.label === 'Shortlisted')?.value || 0),
//               stats.find(s => s.label === 'Interviews Scheduled')?.value || 0,
//               candidates.length - (stats.find(s => s.label === 'Offers Sent')?.value || 0)
//             ]}
//           />
//         </div>
//       </div>

//       {/* Data Tables */}
//       <div className="space-y-8">
//         <DataTable 
//           title="Top BTech Candidates"
//           columns={[
//             { header: 'Name', accessor: 'name' },
//             { header: 'College', accessor: 'college' },
//             { header: 'Specialization', accessor: 'specialization' },
//             { header: 'CGPA', accessor: 'cgpa' },
//             { 
//               header: 'Skills', 
//               accessor: 'skills',
//               cell: skills => (
//                 <div className="flex flex-wrap gap-1">
//                   {skills.map((skill, i) => (
//                     <span key={i} className="px-2 py-1 text-xs rounded bg-blue-50 text-blue-600">
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               )
//             },
//             { 
//               header: 'Status', 
//               accessor: 'status',
//               cell: status => (
//                 <span className={`px-2 py-1 text-xs rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-600'}`}>
//                   {status.charAt(0).toUpperCase() + status.slice(1)}
//                 </span>
//               )
//             },
//             {
//               header: 'Actions',
//               accessor: 'id',
//               cell: () => (
//                 <button className="text-blue-600 hover:text-blue-800">View Profile</button>
//               )
//             }
//           ]}
//           data={filteredCandidates}
//           filters={filters}
//           onFilterChange={handleFilterChange}
//           showPagination={true}
//         />

//         <DataTable 
//           title="College Analytics"
//           columns={[
//             { header: 'College', accessor: 'name' },
//             { header: 'Applications', accessor: 'applications' },
//             { header: 'Shortlisted', accessor: 'shortlisted' },
//             { header: 'Offers', accessor: 'offers' },
//             { 
//               header: 'Acceptance Rate', 
//               accessor: 'acceptance_rate', 
//               cell: rate => `${rate}%` 
//             },
//             { header: 'Avg CGPA', accessor: 'avg_cgpa' },
//             { 
//               header: 'Status', 
//               accessor: 'status',
//               cell: status => (
//                 <span className={`px-2 py-1 text-xs rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-600'}`}>
//                   {status === 'active' ? 'Active' : 
//                    status === 'upcoming' ? 'Upcoming' : 
//                    status === 'in_progress' ? 'In Progress' : 
//                    status}
//                 </span>
//               )
//             }
//           ]}
//           data={colleges}
//           showPagination={true}
//           showExport={true}
//         />
//       </div>
//     </div>
//     <Footer/>
//     </>
//   );
// };

// export default Dashboard;





// import { useState, useEffect } from 'react';
// import StatsCard from "./StatsCard";
// import BarChart from "./Charts/BarChart";
// import DonutChart from "./Charts/DonutChart";
// import DataTable from "./DataTable";
// import Header from './Header';
// import Footer from './Footer';

// const MNCDashboard = () => {
//   const [stats, setStats] = useState([]);
//   const [candidates, setCandidates] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filters, setFilters] = useState({
//     specialization: 'All Specializations',
//     status: 'All Status'
//   });

//   const statusClasses = {
//     shortlisted: 'bg-green-100 text-green-600',
//     pending: 'bg-yellow-100 text-yellow-600',
//     rejected: 'bg-red-100 text-red-600',
//     interview: 'bg-blue-100 text-blue-600',
//     offer: 'bg-purple-100 text-purple-600'
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const controller = new AbortController();
//         const signal = controller.signal;
//         setTimeout(() => controller.abort(), 8000);

//         const [statsRes, candidatesRes, collegesRes] = await Promise.all([
//           fetch('http://localhost:5000/api/candidate-stats', { signal }),
//           fetch('http://localhost:5000/api/candidates', { signal }),
//           fetch('http://localhost:5000/api/colleges', { signal })
//         ]);

//         if (!statsRes.ok) throw new Error(`Stats: ${statsRes.statusText}`);
//         if (!candidatesRes.ok) throw new Error(`Candidates: ${candidatesRes.statusText}`);
//         if (!collegesRes.ok) throw new Error(`Colleges: ${collegesRes.statusText}`);

//         const [statsData, candidatesData, collegesData] = await Promise.all([
//           statsRes.json(),
//           candidatesRes.json(),
//           collegesRes.json()
//         ]);

//         console.log('MNC Dashboard - Fetched statsData:', statsData);

//         const newStats = [
//           { title: 'Total Candidates', value: statsData.total || 0, description: 'All candidates in system', color: 'blue' },
//           { title: 'Shortlisted', value: statsData.shortlisted || 0, description: 'Candidates shortlisted', color: 'green' },
//           { title: 'Interviews', value: statsData.interviews || 0, description: 'Candidates in interview stage', color: 'purple' },
//           { title: 'Offers', value: statsData.offers || 0, description: 'Total offers received', color: 'orange' }
//         ];

//         setStats(newStats);
//         console.log('MNC Dashboard - Set stats:', newStats);

//         setCandidates(candidatesData);
//         setColleges(collegesData);
//       } catch (err) {
//         console.error('MNC Dashboard - Fetch error:', err);
//         setError(err.name === 'AbortError' ? 'Request timed out' : err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const filteredCandidates = candidates.filter(candidate => {
//     const matchesSpecialization = filters.specialization === 'All Specializations' || 
//                                  candidate.specialization === filters.specialization;
//     const matchesStatus = filters.status === 'All Status' || 
//                          candidate.status === filters.status.toLowerCase();
//     return matchesSpecialization && matchesStatus;
//   });

//   if (loading) return (
//     <>
//       <Header />
//       <div className="flex justify-center items-center h-full">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//       <Footer />
//     </>
//   );

//   if (error) return (
//     <>
//       <Header />
//       <div className="flex justify-center items-center h-full">
//         <div className="text-center p-6 max-w-md">
//           <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Data</h2>
//           <p className="text-red-500 mb-4">{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );

//   return (
//     <>
//       <Header />
//       <div className="p-8 bg-[#fdfaf5] overflow-auto">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-[100px]">
//           {stats.map((stat, index) => {
//             console.log('MNC Dashboard - Rendering stat:', stat);
//             return (
//               <StatsCard
//                 key={index}
//                 title={stat.title}
//                 value={stat.value}
//                 description={stat.description}
//                 color={stat.color}
//               />
//             );
//           })}
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow p-6">
//             <BarChart 
//               title="Top Skills In Demand"
//               labels={[...new Set(candidates.flatMap(c => c.skills))].slice(0, 5)}
//               data={[78, 65, 58, 52, 48]}
//             />
//           </div>
//           <div className="bg-white rounded-lg shadow p-6">
//             <DonutChart 
//               title="Application Status"
//               labels={['Shortlisted', 'Pending', 'Interview', 'Rejected']}
//               data={[
//                 stats.find(s => s.title === 'Shortlisted')?.value || 0,
//                 candidates.length - (stats.find(s => s.title === 'Shortlisted')?.value || 0),
//                 stats.find(s => s.title === 'Interviews')?.value || 0,
//                 candidates.length - (stats.find(s => s.title === 'Offers')?.value || 0)
//               ]}
//             />
//           </div>
//         </div>

//         {/* Data Tables */}
//         <div className="space-y-8">
//           <DataTable 
//             title="Top BTech Candidates"
//             columns={[
//               { header: 'Name', accessor: 'name' },
//               { header: 'College', accessor: 'college' },
//               { header: 'Specialization', accessor: 'specialization' },
//               { header: 'CGPA', accessor: 'cgpa' },
//               { 
//                 header: 'Skills', 
//                 accessor: 'skills',
//                 cell: skills => (
//                   <div className="flex flex-wrap gap-1">
//                     {skills.map((skill, i) => (
//                       <span key={i} className="px-2 py-1 text-xs rounded bg-blue-50 text-blue-600">
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 )
//               },
//               { 
//                 header: 'Status', 
//                 accessor: 'status',
//                 cell: status => (
//                   <span className={`px-2 py-1 text-xs rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-600'}`}>
//                     {status.charAt(0).toUpperCase() + status.slice(1)}
//                   </span>
//                 )
//               },
//               {
//                 header: 'Actions',
//                 accessor: 'id',
//                 cell: () => (
//                   <button className="text-blue-600 hover:text-blue-800">View Profile</button>
//                 )
//               }
//             ]}
//             data={filteredCandidates}
//             filters={filters}
//             onFilterChange={handleFilterChange}
//             showPagination={true}
//           />

//           <DataTable 
//             title="College Analytics"
//             columns={[
//               { header: 'College', accessor: 'name' },
//               { header: 'Applications', accessor: 'applications' },
//               { header: 'Shortlisted', accessor: 'shortlisted' },
//               { header: 'Offers', accessor: 'offers' },
//               { 
//                 header: 'Acceptance Rate', 
//                 accessor: 'acceptance_rate', 
//                 cell: rate => `${rate}%` 
//               },
//               { header: 'Avg CGPA', accessor: 'avg_cgpa' },
//               { 
//                 header: 'Status', 
//                 accessor: 'status',
//                 cell: status => (
//                   <span className={`px-2 py-1 text-xs rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-600'}`}>
//                     {status === 'active' ? 'Active' : 
//                      status === 'upcoming' ? 'Upcoming' : 
//                      status === 'in_progress' ? 'In Progress' : 
//                      status}
//                   </span>
//                 )
//               }
//             ]}
//             data={colleges}
//             showPagination={true}
//             showExport={true}
//           />
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default MNCDashboard;








// import { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import StatsCard from './StatsCard';
// import BarChart from './Charts/BarChart';
// import DonutChart from './Charts/DonutChart';
// import DataTable from './DataTable';
// import Header from './Header';
// import Footer from './Footer';

// const MNCDashboard = ({ user, onLogout }) => {
//   const [stats, setStats] = useState([]);
//   const [candidates, setCandidates] = useState([]);
//   const [colleges, setColleges] = useState([]);
//   const [mncDetails, setMncDetails] = useState(null);
//   const [showMncDetails, setShowMncDetails] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filters, setFilters] = useState({
//     specialization: 'All Specializations',
//     status: 'All Status',
//   });
//   const navigate = useNavigate();
//   const mncDetailsRef = useRef(null);

//   const statusClasses = {
//     shortlisted: 'bg-green-100 text-green-600',
//     pending: 'bg-yellow-100 text-yellow-600',
//     rejected: 'bg-red-100 text-red-600',
//     interview: 'bg-blue-100 text-blue-600',
//     offer: 'bg-purple-100 text-purple-600',
//   };

//   const fetchMncDetails = (data) => {
//     setMncDetails(data);
//     setShowMncDetails(!showMncDetails);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     onLogout();
//     navigate('/login');
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (mncDetailsRef.current && !mncDetailsRef.current.contains(event.target)) {
//         const userButton = document.querySelector('.user-button');
//         if (!userButton || !userButton.contains(event.target)) setShowMncDetails(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const controller = new AbortController();
//         const signal = controller.signal;
//         setTimeout(() => controller.abort(), 8000);

//         const [statsRes, candidatesRes, collegesRes] = await Promise.all([
//           fetch('http://localhost:5000/api/candidate-stats', { signal }),
//           fetch('http://localhost:5000/api/candidates', { signal }),
//           fetch('http://localhost:5000/api/colleges', { signal }),
//         ]);

//         if (!statsRes.ok) throw new Error(`Stats: ${statsRes.statusText}`);
//         if (!candidatesRes.ok) throw new Error(`Candidates: ${candidatesRes.statusText}`);
//         if (!collegesRes.ok) throw new Error(`Colleges: ${collegesRes.statusText}`);

//         const [statsData, candidatesData, collegesData] = await Promise.all([
//           statsRes.json(),
//           candidatesRes.json(),
//           collegesRes.json(),
//         ]);

//         console.log('MNC Dashboard - Fetched statsData:', statsData);

//         const newStats = [
//           { title: 'Total Candidates', value: statsData.total || 0, description: 'All candidates in system', color: 'blue' },
//           { title: 'Shortlisted', value: statsData.shortlisted || 0, description: 'Candidates shortlisted', color: 'green' },
//           { title: 'Interviews', value: statsData.interviews || 0, description: 'Candidates in interview stage', color: 'purple' },
//           { title: 'Offers', value: statsData.offers || 0, description: 'Total offers received', color: 'orange' },
//         ];

//         setStats(newStats);
//         console.log('MNC Dashboard - Set stats:', newStats);

//         setCandidates(candidatesData);
//         setColleges(collegesData);
//       } catch (err) {
//         console.error('MNC Dashboard - Fetch error:', err);
//         setError(err.name === 'AbortError' ? 'Request timed out' : err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const filteredCandidates = candidates.filter((candidate) => {
//     const matchesSpecialization = filters.specialization === 'All Specializations' || 
//                                  candidate.specialization === filters.specialization;
//     const matchesStatus = filters.status === 'All Status' || 
//                          candidate.status === filters.status.toLowerCase();
//     return matchesSpecialization && matchesStatus;
//   });

//   if (loading) return (
//     <>
//       <Header user={user} onFetchUserDetails={fetchMncDetails} onLogout={handleLogout} isScrolled={false} />
//       <div className="flex justify-center items-center h-full">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//       <Footer />
//     </>
//   );

//   if (error) return (
//     <>
//       <Header user={user} onFetchUserDetails={fetchMncDetails} onLogout={handleLogout} isScrolled={false} />
//       <div className="flex justify-center items-center h-full">
//         <div className="text-center p-6 max-w-md">
//           <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Data</h2>
//           <p className="text-red-500 mb-4">{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );

//   return (
//     <>
//       <Header user={user} onFetchUserDetails={fetchMncDetails} onLogout={handleLogout} isScrolled={false} />
//       {showMncDetails && mncDetails && (
//         <div 
//           ref={mncDetailsRef}
//           className="fixed right-4 top-[70px] bg-white shadow-lg rounded-md p-4 w-64 z-50 border border-gray-200"
//         >
//           <div className="mb-4">
//             <h3 className="text-lg font-semibold text-gray-800">MNC Details</h3>
//             <div className="mt-2 space-y-1">
//               <p className="text-sm text-gray-600"><span className="font-medium">Username:</span> {mncDetails.username}</p>
//               <p className="text-sm text-gray-600"><span className="font-medium">Email:</span> {mncDetails.email}</p>
//               <p className="text-sm text-gray-600"><span className="font-medium">Company:</span> {mncDetails.name}</p>
//               <p className="text-sm text-gray-600"><span className="font-medium">Industry:</span> {mncDetails.industry}</p>
//               <p className="text-sm text-gray-600"><span className="font-medium">Address:</span> {mncDetails.address}</p>
//             </div>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//       <div className="p-8 bg-[#fdfaf5] overflow-auto">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-[100px]">
//           {stats.map((stat, index) => {
//             console.log('MNC Dashboard - Rendering stat:', stat);
//             return (
//               <StatsCard
//                 key={index}
//                 title={stat.title}
//                 value={stat.value}
//                 description={stat.description}
//                 color={stat.color}
//               />
//             );
//           })}
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow p-6">
//             <BarChart 
//               title="Top Skills In Demand"
//               labels={[...new Set(candidates.flatMap(c => c.skills))].slice(0, 5)}
//               data={[78, 65, 58, 52, 48]}
//             />
//           </div>
//           <div className="bg-white rounded-lg shadow p-6">
//             <DonutChart 
//               title="Application Status"
//               labels={['Shortlisted', 'Pending', 'Interview', 'Rejected']}
//               data={[
//                 stats.find(s => s.title === 'Shortlisted')?.value || 0,
//                 candidates.length - (stats.find(s => s.title === 'Shortlisted')?.value || 0),
//                 stats.find(s => s.title === 'Interviews')?.value || 0,
//                 candidates.length - (stats.find(s => s.title === 'Offers')?.value || 0),
//               ]}
//             />
//           </div>
//         </div>

//         {/* Data Tables */}
//         <div className="space-y-8">
//           <DataTable 
//             title="Top BTech Candidates"
//             columns={[
//               { header: 'Name', accessor: 'name' },
//               { header: 'College', accessor: 'college' },
//               { header: 'Specialization', accessor: 'specialization' },
//               { header: 'CGPA', accessor: 'cgpa' },
//               { 
//                 header: 'Skills', 
//                 accessor: 'skills',
//                 cell: skills => (
//                   <div className="flex flex-wrap gap-1">
//                     {skills.map((skill, i) => (
//                       <span key={i} className="px-2 py-1 text-xs rounded bg-blue-50 text-blue-600">
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 ),
//               },
//               { 
//                 header: 'Status', 
//                 accessor: 'status',
//                 cell: status => (
//                   <span className={`px-2 py-1 text-xs rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-600'}`}>
//                     {status.charAt(0).toUpperCase() + status.slice(1)}
//                   </span>
//                 ),
//               },
//               {
//                 header: 'Actions',
//                 accessor: 'id',
//                 cell: () => (
//                   <button className="text-blue-600 hover:text-blue-800">View Profile</button>
//                 ),
//               },
//             ]}
//             data={filteredCandidates}
//             filters={filters}
//             onFilterChange={handleFilterChange}
//             showPagination={true}
//           />

//           <DataTable 
//             title="College Analytics"
//             columns={[
//               { header: 'College', accessor: 'name' },
//               { header: 'Applications', accessor: 'applications' },
//               { header: 'Shortlisted', accessor: 'shortlisted' },
//               { header: 'Offers', accessor: 'offers' },
//               { 
//                 header: 'Acceptance Rate', 
//                 accessor: 'acceptance_rate', 
//                 cell: rate => `${rate}%`,
//               },
//               { header: 'Avg CGPA', accessor: 'avg_cgpa' },
//               { 
//                 header: 'Status', 
//                 accessor: 'status',
//                 cell: status => (
//                   <span className={`px-2 py-1 text-xs rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-600'}`}>
//                     {status === 'active' ? 'Active' : 
//                      status === 'upcoming' ? 'Upcoming' : 
//                      status === 'in_progress' ? 'In Progress' : 
//                      status}
//                   </span>
//                 ),
//               },
//             ]}
//             data={colleges}
//             showPagination={true}
//             showExport={true}
//           />
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default MNCDashboard;







import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StatsCard from './StatsCard';
import BarChart from './Charts/BarChart';
import DonutChart from './Charts/DonutChart';
import DataTable from './DataTable';
import Header from './Header';
import Footer from './Footer';

const MNCDashboard = ({ user, onLogout }) => {
  const [stats, setStats] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [mncDetails, setMncDetails] = useState(null);
  const [showMncDetails, setShowMncDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    specialization: 'All Specializations',
    status: 'All Status',
  });
  const navigate = useNavigate();
  const mncDetailsRef = useRef(null);

  const statusClasses = {
    shortlisted: 'bg-green-100 text-green-600',
    pending: 'bg-yellow-100 text-yellow-600',
    rejected: 'bg-red-100 text-red-600',
    interview: 'bg-blue-100 text-blue-600',
    offer: 'bg-purple-100 text-purple-600',
  };

  const fetchMncDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/profile'); // Removed Authorization header
      setMncDetails(response.data.data);
      setShowMncDetails(!showMncDetails);
    } catch (err) {
      console.error('Error fetching MNC details:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mncDetailsRef.current && !mncDetailsRef.current.contains(event.target)) {
        const userButton = document.querySelector('.user-button');
        if (!userButton || !userButton.contains(event.target)) setShowMncDetails(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const controller = new AbortController();
        const signal = controller.signal;
        setTimeout(() => controller.abort(), 8000);

        const [statsRes, candidatesRes, collegesRes] = await Promise.all([
          fetch('http://localhost:5000/api/candidate-stats', { signal }),
          fetch('http://localhost:5000/api/candidates', { signal }),
          fetch('http://localhost:5000/api/colleges', { signal }),
        ]);

        if (!statsRes.ok) throw new Error(`Stats: ${statsRes.statusText}`);
        if (!candidatesRes.ok) throw new Error(`Candidates: ${candidatesRes.statusText}`);
        if (!collegesRes.ok) throw new Error(`Colleges: ${collegesRes.statusText}`);

        const [statsData, candidatesData, collegesData] = await Promise.all([
          statsRes.json(),
          candidatesRes.json(),
          collegesRes.json(),
        ]);

        console.log('MNC Dashboard - Fetched statsData:', statsData);

        const newStats = [
          { title: 'Total Candidates', value: statsData.total || 0, description: 'All candidates in system', color: 'blue' },
          { title: 'Shortlisted', value: statsData.shortlisted || 0, description: 'Candidates shortlisted', color: 'green' },
          { title: 'Interviews', value: statsData.interviews || 0, description: 'Candidates in interview stage', color: 'purple' },
          { title: 'Offers', value: statsData.offers || 0, description: 'Total offers received', color: 'orange' },
        ];

        setStats(newStats);
        console.log('MNC Dashboard - Set stats:', newStats);

        setCandidates(candidatesData);
        setColleges(collegesData);
      } catch (err) {
        console.error('MNC Dashboard - Fetch error:', err);
        setError(err.name === 'AbortError' ? 'Request timed out' : err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSpecialization = filters.specialization === 'All Specializations' || 
                                 candidate.specialization === filters.specialization;
    const matchesStatus = filters.status === 'All Status' || 
                         candidate.status === filters.status.toLowerCase();
    return matchesSpecialization && matchesStatus;
  });

  if (loading) return (
    <>
      <Header user={user} onFetchUserDetails={fetchMncDetails} onLogout={handleLogout} isScrolled={false} />
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
      <Footer />
    </>
  );

  if (error) return (
    <>
      <Header user={user} onFetchUserDetails={fetchMncDetails} onLogout={handleLogout} isScrolled={false} />
      <div className="flex justify-center items-center h-full">
        <div className="text-center p-6 max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Data</h2>
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Retry
          </button>
        </div>
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <Header user={user} onFetchUserDetails={fetchMncDetails} onLogout={handleLogout} isScrolled={false} />
      {showMncDetails && mncDetails && (
        <div 
          ref={mncDetailsRef}
          className="fixed right-4 top-[70px] bg-white shadow-lg rounded-md p-4 w-64 z-50 border border-gray-200"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">MNC Details</h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-600"><span className="font-medium">Username:</span> {mncDetails.username}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Email:</span> {mncDetails.email}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Company:</span> {mncDetails.name}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Industry:</span> {mncDetails.industry}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Address:</span> {mncDetails.address}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      )}
      <div className="p-8 bg-[#fdfaf5] overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-[100px]">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              color={stat.color}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <BarChart 
              title="Top Skills In Demand"
              labels={[...new Set(candidates.flatMap(c => c.skills))].slice(0, 5)}
              data={[78, 65, 58, 52, 48]}
            />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <DonutChart 
              title="Application Status"
              labels={['Shortlisted', 'Pending', 'Interview', 'Rejected']}
              data={[
                stats.find(s => s.title === 'Shortlisted')?.value || 0,
                candidates.length - (stats.find(s => s.title === 'Shortlisted')?.value || 0),
                stats.find(s => s.title === 'Interviews')?.value || 0,
                candidates.length - (stats.find(s => s.title === 'Offers')?.value || 0),
              ]}
            />
          </div>
        </div>

        <div className="space-y-8">
          <DataTable 
            title="Top BTech Candidates"
            columns={[
              { header: 'Name', accessor: 'name' },
              { header: 'College', accessor: 'college' },
              { header: 'Specialization', accessor: 'specialization' },
              { header: 'CGPA', accessor: 'cgpa' },
              { 
                header: 'Skills', 
                accessor: 'skills',
                cell: skills => (
                  <div className="flex flex-wrap gap-1">
                    {skills.map((skill, i) => (
                      <span key={i} className="px-2 py-1 text-xs rounded bg-blue-50 text-blue-600">
                        {skill}
                      </span>
                    ))}
                  </div>
                ),
              },
              { 
                header: 'Status', 
                accessor: 'status',
                cell: status => (
                  <span className={`px-2 py-1 text-xs rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-600'}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                ),
              },
              {
                header: 'Actions',
                accessor: 'id',
                cell: () => (
                  <button className="text-blue-600 hover:text-blue-800">View Profile</button>
                ),
              },
            ]}
            data={filteredCandidates}
            filters={filters}
            onFilterChange={handleFilterChange}
            showPagination={true}
          />

          <DataTable 
            title="College Analytics"
            columns={[
              { header: 'College', accessor: 'name' },
              { header: 'Applications', accessor: 'applications' },
              { header: 'Shortlisted', accessor: 'shortlisted' },
              { header: 'Offers', accessor: 'offers' },
              { 
                header: 'Acceptance Rate', 
                accessor: 'acceptance_rate', 
                cell: rate => `${rate}%`,
              },
              { header: 'Avg CGPA', accessor: 'avg_cgpa' },
              { 
                header: 'Status', 
                accessor: 'status',
                cell: status => (
                  <span className={`px-2 py-1 text-xs rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-600'}`}>
                    {status === 'active' ? 'Active' : 
                     status === 'upcoming' ? 'Upcoming' : 
                     status === 'in_progress' ? 'In Progress' : 
                     status}
                  </span>
                ),
              },
            ]}
            data={colleges}
            showPagination={true}
            showExport={true}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MNCDashboard;