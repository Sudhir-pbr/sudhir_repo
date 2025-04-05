


// import { useState, useEffect, useRef } from 'react';
// import { Bar, Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
// import StatsCard from './StatsCard';
// import CompanyCard from './Companycard';
// import DataTable from './DataTable';
// import axios from 'axios';
// import ErrorBoundary from './ErrorBoundary';
// import Header from './Header';
// import Footer from './Footer';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend
// );

// const CollegeDashboard = () => {
//   const [stats, setStats] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const companiesContainerRef = useRef(null);
//   const scrollContentRef = useRef(null);
//   const animationFrameRef = useRef();

//   // Department options
//   const departments = [
//     'All Departments',
//     'Computer Science',
//     'Information Technology',
//     'Electronics',
//     'Mechanical'
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const [statsRes, companiesRes, studentsRes] = await Promise.all([
//           axios.get('http://localhost:5000/api/placement-stats'),
//           axios.get('http://localhost:5000/api/companies'),
//           axios.get('http://localhost:5000/api/students')
//         ]);

//         // Normalize data
//         const normalizedStats = Array.isArray(statsRes.data) 
//           ? statsRes.data.map(stat => ({
//               title: stat.title || 'Statistic',
//               value: stat.value ?? 0,
//               description: stat.description || 'No description available'
//             }))
//           : [
//                           {
//                             title: 'MNCs Visited',
//                             value: 0,
//                             description: 'Total companies visited'
//                           },
//                           {
//                             title: 'Students Selected',
//                             value: 0,
//                             description: 'Students placed this year'
//                           },
//                           {
//                             title: 'Highest Package',
//                             value: '₹0L',
//                             description: 'Highest offered package'
//                           },
//                           {
//                             title: 'Upcoming Drives',
//                             value: 0,
//                             description: 'Scheduled recruitment drives'
//                           }
//                         ]; // Your fallback data

//         // Normalize companies data
//         const normalizedCompanies = (companiesRes.data || []).map(company => ({
//           id: company?.id || Math.random().toString(36).substr(2, 9),
//           name: company?.name || 'Unknown Company',
//           selected: company?.selected || 0,
//           package: company?.package || 0,
//           date: company?.date || 'Not scheduled',
//           process: company?.process || 'Technical Test, Interviews'
//         }));

//         // Normalize students data
//         const normalizedStudents = (studentsRes.data || []).map(student => ({
//           id: student?.id || Math.random().toString(36).substr(2, 9),
//           name: student?.name || 'Unknown Student',
//           department: student?.department || 'Not specified',
//           company: student?.company || 'Not placed',
//           package: student?.package || 0,
//           status: student?.status || 'Unknown'
//         }));

//         setStats(normalizedStats);
//         setCompanies(normalizedCompanies);
//         setStudents(normalizedStudents);
//         setFilteredStudents(normalizedStudents.slice(0, 6));
//       } catch (err) {
//         setError(err.message || 'Failed to fetch dashboard data');
//         console.error('Dashboard error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);



//   // Filter students by department
//   useEffect(() => {
//     if (students.length > 0) {
//       const filtered = selectedDepartment === 'All Departments'
//         ? students
//         : students.filter(student => 
//             student.department === selectedDepartment
//           );
//       setFilteredStudents(filtered.slice(0, 6));
//     }
//   }, [selectedDepartment, students]);

//   // Auto-scrolling companies effect
//   useEffect(() => {
//     if (companies.length > 0 && scrollContentRef.current) {
//       const content = scrollContentRef.current;
//       const container = companiesContainerRef.current;
//       const cardWidth = 320; // Width of each company card
//       const gap = 24; // Gap between cards
//       const speed = 1; // Pixels per frame

//       let scrollPosition = 0;
//       const totalWidth = (companies.length * (cardWidth + gap));

//       const animate = () => {
//         scrollPosition += speed;
        
//         // Reset position when scrolled all cards
//         if (scrollPosition >= totalWidth) {
//           scrollPosition = 0;
//         }
        
//         content.style.transform = `translateX(-${scrollPosition}px)`;
//         animationFrameRef.current = requestAnimationFrame(animate);
//       };

//       animationFrameRef.current = requestAnimationFrame(animate);

//       return () => {
//         if (animationFrameRef.current) {
//           cancelAnimationFrame(animationFrameRef.current);
//         }
//       };
//     }
//   }, [companies]);

//   const handleDepartmentChange = (e) => {
//     setSelectedDepartment(e.target.value);
//   };

//   if (loading) {
//     return (
//       <>
//     <Header />
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//        <Footer />
//        </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <Header />
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
//           <h3 className="text-lg font-medium text-red-600">Error Loading Dashboard</h3>
//           <p className="text-red-500 mt-2">{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
//           >
//             Reload Dashboard
//           </button>
//         </div>
//       </div> <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <Header />
//     <div className="space-y-8 p-4 container mx-auto mt-[100px]">
   
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//   {stats.map((stat, index) => {
//     console.log('College Dashboard - Rendering stat:', stat);
//     return (
//       <StatsCard 
//         key={index} 
//         title={stat.title}
//         value={stat.value}
//         description={stat.description}
//         color={['blue', 'green', 'purple', 'orange'][index % 4]}
//       />
//     );
//   })}
// </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h3 className="text-lg font-semibold mb-4">Department-wise Placement %</h3>
//           <Bar
//             data={{
//               labels: ['Computer Science', 'Information Tech', 'Electronics', 'Mechanical', 'Electrical'],
//               datasets: [{
//                 label: 'Placement Percentage',
//                 data: [85, 78, 72, 65, 60],
//                 backgroundColor: '#3a6ea5',
//                 borderRadius: 4
//               }]
//             }}
//             options={{
//               responsive: true,
//               scales: {
//                 y: { beginAtZero: true, max: 100 }
//               }
//             }}
//           />
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <h3 className="text-lg font-semibold mb-4">Application Status Distribution</h3>
//           <Doughnut
//             data={{
//               labels: ['Selected', 'Rejected', 'Not Attended'],
//               datasets: [{
//                 data: [587, 420, 85],
//                 backgroundColor: [
//                   'rgba(46, 204, 113, 0.8)',
//                   'rgba(231, 76, 60, 0.8)',
//                   'rgba(243, 156, 18, 0.8)'
//                 ]
//               }]
//             }}
//           />
//         </div>
//       </div>

//       {/* Auto-Scrolling Companies Section */}
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h2 className="text-xl font-semibold mb-6">Top Recruiting Companies</h2>
//         <div 
//           ref={companiesContainerRef}
//           className="relative w-full h-72 overflow-hidden"
//         >
//           <div
//             ref={scrollContentRef}
//             className="absolute top-0 left-0 h-full flex items-center"
//             style={{ willChange: 'transform' }}
//           >
//             {[...companies, ...companies].map((company, index) => (
//               <div key={`${company.id}-${index}`} className="flex-shrink-0 w-80 mx-6">
//                 <ErrorBoundary>
//                   <CompanyCard company={company} />
//                 </ErrorBoundary>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Recent Placements Table */}
//       <div className="bg-white p-6 rounded-lg shadow">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-semibold">Recent Placements</h2>
//           <div className="flex">
//             <select 
//               className="border rounded px-3 py-1 text-sm"
//               value={selectedDepartment}
//               onChange={handleDepartmentChange}
//             >
//               {departments.map(dept => (
//                 <option key={dept} value={dept}>{dept}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <DataTable 
//           columns={[
//             { header: 'Student ID', accessor: 'id' },
//             { header: 'Name', accessor: 'name' },
//             { header: 'Department', accessor: 'department' },
//             { header: 'Company', accessor: 'company' },
//             { 
//               header: 'Package (LPA)', 
//               accessor: 'package',
//               cell: pkg => pkg ? `₹${pkg}L` : '-' 
//             },
//             { 
//               header: 'Status', 
//               accessor: 'status',
//               cell: status => (
//                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                   status === 'Selected' ? 'bg-green-100 text-green-800' :
//                   status === 'Rejected' ? 'bg-red-100 text-red-800' :
//                   'bg-yellow-100 text-yellow-800'
//                 }`}>
//                   {status || 'Unknown'}
//                 </span>
//               )
//             }
//           ]}
//           data={filteredStudents}
//         />
//       </div>
//     </div>  <Footer />
//     </>
//   );
// };

// export default CollegeDashboard;











// import { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Bar, Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
// import StatsCard from './StatsCard';
// import CompanyCard from './Companycard';
// import DataTable from './DataTable';
// import axios from 'axios';
// import ErrorBoundary from './ErrorBoundary';
// import Header from './Header';
// import Footer from './Footer';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,
//   Tooltip,
//   Legend
// );

// const CollegeDashboard = ({ user, onLogout }) => {
//   const [stats, setStats] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [collegeDetails, setCollegeDetails] = useState(null);
//   const [showCollegeDetails, setShowCollegeDetails] = useState(false);
//   const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const companiesContainerRef = useRef(null);
//   const scrollContentRef = useRef(null);
//   const animationFrameRef = useRef();
//   const collegeDetailsRef = useRef(null);
//   const navigate = useNavigate();

//   const departments = [
//     'All Departments',
//     'Computer Science',
//     'Information Technology',
//     'Electronics',
//     'Mechanical',
//   ];

//   const fetchCollegeDetails = (data) => {
//     setCollegeDetails(data);
//     setShowCollegeDetails(!showCollegeDetails);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     onLogout();
//     navigate('/login');
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (collegeDetailsRef.current && !collegeDetailsRef.current.contains(event.target)) {
//         const userButton = document.querySelector('.user-button');
//         if (!userButton || !userButton.contains(event.target)) setShowCollegeDetails(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const [statsRes, companiesRes, studentsRes] = await Promise.all([
//           axios.get('http://localhost:5000/api/placement-stats'),
//           axios.get('http://localhost:5000/api/companies'),
//           axios.get('http://localhost:5000/api/students'),
//         ]);

//         const normalizedStats = Array.isArray(statsRes.data) 
//           ? statsRes.data.map(stat => ({
//               title: stat.title || 'Statistic',
//               value: stat.value ?? 0,
//               description: stat.description || 'No description available',
//             }))
//           : [
//               { title: 'MNCs Visited', value: 0, description: 'Total companies visited' },
//               { title: 'Students Selected', value: 0, description: 'Students placed this year' },
//               { title: 'Highest Package', value: '₹0L', description: 'Highest offered package' },
//               { title: 'Upcoming Drives', value: 0, description: 'Scheduled recruitment drives' },
//             ];

//         const normalizedCompanies = (companiesRes.data || []).map(company => ({
//           id: company?.id || Math.random().toString(36).substr(2, 9),
//           name: company?.name || 'Unknown Company',
//           selected: company?.selected || 0,
//           package: company?.package || 0,
//           date: company?.date || 'Not scheduled',
//           process: company?.process || 'Technical Test, Interviews',
//         }));

//         const normalizedStudents = (studentsRes.data || []).map(student => ({
//           id: student?.id || Math.random().toString(36).substr(2, 9),
//           name: student?.name || 'Unknown Student',
//           department: student?.department || 'Not specified',
//           company: student?.company || 'Not placed',
//           package: student?.package || 0,
//           status: student?.status || 'Unknown',
//         }));

//         setStats(normalizedStats);
//         setCompanies(normalizedCompanies);
//         setStudents(normalizedStudents);
//         setFilteredStudents(normalizedStudents.slice(0, 6));
//       } catch (err) {
//         setError(err.message || 'Failed to fetch dashboard data');
//         console.error('Dashboard error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (students.length > 0) {
//       const filtered = selectedDepartment === 'All Departments'
//         ? students
//         : students.filter(student => student.department === selectedDepartment);
//       setFilteredStudents(filtered.slice(0, 6));
//     }
//   }, [selectedDepartment, students]);

//   useEffect(() => {
//     if (companies.length > 0 && scrollContentRef.current) {
//       const content = scrollContentRef.current;
//       const cardWidth = 320;
//       const gap = 24;
//       const speed = 1;
//       let scrollPosition = 0;
//       const totalWidth = (companies.length * (cardWidth + gap));

//       const animate = () => {
//         scrollPosition += speed;
//         if (scrollPosition >= totalWidth) scrollPosition = 0;
//         content.style.transform = `translateX(-${scrollPosition}px)`;
//         animationFrameRef.current = requestAnimationFrame(animate);
//       };

//       animationFrameRef.current = requestAnimationFrame(animate);

//       return () => {
//         if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
//       };
//     }
//   }, [companies]);

//   const handleDepartmentChange = (e) => {
//     setSelectedDepartment(e.target.value);
//   };

//   if (loading) {
//     return (
//       <>
//         <Header user={user} onFetchUserDetails={fetchCollegeDetails} onLogout={handleLogout} isScrolled={false} />
//         <div className="flex justify-center items-center h-screen">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <Header user={user} onFetchUserDetails={fetchCollegeDetails} onLogout={handleLogout} isScrolled={false} />
//         <div className="flex justify-center items-center h-screen">
//           <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
//             <h3 className="text-lg font-medium text-red-600">Error Loading Dashboard</h3>
//             <p className="text-red-500 mt-2">{error}</p>
//             <button 
//               onClick={() => window.location.reload()}
//               className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
//             >
//               Reload Dashboard
//             </button>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <Header user={user} onFetchUserDetails={fetchCollegeDetails} onLogout={handleLogout} isScrolled={false} />
//       {showCollegeDetails && collegeDetails && (
//         <div 
//           ref={collegeDetailsRef}
//           className="fixed right-4 top-[70px] bg-white shadow-lg rounded-md p-4 w-64 z-50 border border-gray-200"
//         >
//           <div className="mb-4">
//             <h3 className="text-lg font-semibold text-gray-800">College Details</h3>
//             <div className="mt-2 space-y-1">
//               <p className="text-sm text-gray-600"><span className="font-medium">Username:</span> {collegeDetails.username}</p>
//               <p className="text-sm text-gray-600"><span className="font-medium">Email:</span> {collegeDetails.email}</p>
//               <p className="text-sm text-gray-600"><span className="font-medium">College:</span> {collegeDetails.name}</p>
//               <p className="text-sm text-gray-600"><span className="font-medium">Address:</span> {collegeDetails.address}</p>
//               <p className="text-sm text-gray-600"><span className="font-medium">Contact Person:</span> {collegeDetails.contact_person}</p>
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
//       <div className="space-y-8 p-4 container mx-auto mt-[100px]">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {stats.map((stat, index) => {
//             console.log('College Dashboard - Rendering stat:', stat);
//             return (
//               <StatsCard 
//                 key={index} 
//                 title={stat.title}
//                 value={stat.value}
//                 description={stat.description}
//                 color={['blue', 'green', 'purple', 'orange'][index % 4]}
//               />
//             );
//           })}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-semibold mb-4">Department-wise Placement %</h3>
//             <Bar
//               data={{
//                 labels: ['Computer Science', 'Information Tech', 'Electronics', 'Mechanical', 'Electrical'],
//                 datasets: [{
//                   label: 'Placement Percentage',
//                   data: [85, 78, 72, 65, 60],
//                   backgroundColor: '#3a6ea5',
//                   borderRadius: 4,
//                 }],
//               }}
//               options={{
//                 responsive: true,
//                 scales: {
//                   y: { beginAtZero: true, max: 100 },
//                 },
//               }}
//             />
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-semibold mb-4">Application Status Distribution</h3>
//             <Doughnut
//               data={{
//                 labels: ['Selected', 'Rejected', 'Not Attended'],
//                 datasets: [{
//                   data: [587, 420, 85],
//                   backgroundColor: [
//                     'rgba(46, 204, 113, 0.8)',
//                     'rgba(231, 76, 60, 0.8)',
//                     'rgba(243, 156, 18, 0.8)',
//                   ],
//                 }],
//               }}
//             />
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-6">Top Recruiting Companies</h2>
//           <div 
//             ref={companiesContainerRef}
//             className="relative w-full h-72 overflow-hidden"
//           >
//             <div
//               ref={scrollContentRef}
//               className="absolute top-0 left-0 h-full flex items-center"
//               style={{ willChange: 'transform' }}
//             >
//               {[...companies, ...companies].map((company, index) => (
//                 <div key={`${company.id}-${index}`} className="flex-shrink-0 w-80 mx-6">
//                   <ErrorBoundary>
//                     <CompanyCard company={company} />
//                   </ErrorBoundary>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold">Recent Placements</h2>
//             <div className="flex">
//               <select 
//                 className="border rounded px-3 py-1 text-sm"
//                 value={selectedDepartment}
//                 onChange={handleDepartmentChange}
//               >
//                 {departments.map(dept => (
//                   <option key={dept} value={dept}>{dept}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <DataTable 
//             columns={[
//               { header: 'Student ID', accessor: 'id' },
//               { header: 'Name', accessor: 'name' },
//               { header: 'Department', accessor: 'department' },
//               { header: 'Company', accessor: 'company' },
//               { 
//                 header: 'Package (LPA)', 
//                 accessor: 'package',
//                 cell: pkg => pkg ? `₹${pkg}L` : '-',
//               },
//               { 
//                 header: 'Status', 
//                 accessor: 'status',
//                 cell: status => (
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     status === 'Selected' ? 'bg-green-100 text-green-800' :
//                     status === 'Rejected' ? 'bg-red-100 text-red-800' :
//                     'bg-yellow-100 text-yellow-800'
//                   }`}>
//                     {status || 'Unknown'}
//                   </span>
//                 ),
//               },
//             ]}
//             data={filteredStudents}
//           />
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default CollegeDashboard;











import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import StatsCard from './StatsCard';
import CompanyCard from './Companycard';
import DataTable from './DataTable';
import axios from 'axios';
import ErrorBoundary from './ErrorBoundary';
import Header from './Header';
import Footer from './Footer';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const CollegeDashboard = ({ user, onLogout }) => {
  const [stats, setStats] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [collegeDetails, setCollegeDetails] = useState(null);
  const [showCollegeDetails, setShowCollegeDetails] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const companiesContainerRef = useRef(null);
  const scrollContentRef = useRef(null);
  const animationFrameRef = useRef();
  const collegeDetailsRef = useRef(null);
  const navigate = useNavigate();

  const departments = [
    'All Departments',
    'Computer Science',
    'Information Technology',
    'Electronics',
    'Mechanical',
  ];

  const fetchCollegeDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/profile'); // Removed Authorization header
      setCollegeDetails(response.data.data);
      setShowCollegeDetails(!showCollegeDetails);
    } catch (err) {
      console.error('Error fetching college details:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (collegeDetailsRef.current && !collegeDetailsRef.current.contains(event.target)) {
        const userButton = document.querySelector('.user-button');
        if (!userButton || !userButton.contains(event.target)) setShowCollegeDetails(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [statsRes, companiesRes, studentsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/placement-stats'),
          axios.get('http://localhost:5000/api/companies'),
          axios.get('http://localhost:5000/api/students'),
        ]);

        const normalizedStats = Array.isArray(statsRes.data) 
          ? statsRes.data.map(stat => ({
              title: stat.title || 'Statistic',
              value: stat.value ?? 0,
              description: stat.description || 'No description available',
            }))
          : [
              { title: 'MNCs Visited', value: 0, description: 'Total companies visited' },
              { title: 'Students Selected', value: 0, description: 'Students placed this year' },
              { title: 'Highest Package', value: '₹0L', description: 'Highest offered package' },
              { title: 'Upcoming Drives', value: 0, description: 'Scheduled recruitment drives' },
            ];

        const normalizedCompanies = (companiesRes.data || []).map(company => ({
          id: company?.id || Math.random().toString(36).substr(2, 9),
          name: company?.name || 'Unknown Company',
          selected: company?.selected || 0,
          package: company?.package || 0,
          date: company?.date || 'Not scheduled',
          process: company?.process || 'Technical Test, Interviews',
        }));

        const normalizedStudents = (studentsRes.data || []).map(student => ({
          id: student?.id || Math.random().toString(36).substr(2, 9),
          name: student?.name || 'Unknown Student',
          department: student?.department || 'Not specified',
          company: student?.company || 'Not placed',
          package: student?.package || 0,
          status: student?.status || 'Unknown',
        }));

        setStats(normalizedStats);
        setCompanies(normalizedCompanies);
        setStudents(normalizedStudents);
        setFilteredStudents(normalizedStudents.slice(0, 6));
      } catch (err) {
        setError(err.message || 'Failed to fetch dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      const filtered = selectedDepartment === 'All Departments'
        ? students
        : students.filter(student => student.department === selectedDepartment);
      setFilteredStudents(filtered.slice(0, 6));
    }
  }, [selectedDepartment, students]);

  useEffect(() => {
    if (companies.length > 0 && scrollContentRef.current) {
      const content = scrollContentRef.current;
      const cardWidth = 320;
      const gap = 24;
      const speed = 1;
      let scrollPosition = 0;
      const totalWidth = (companies.length * (cardWidth + gap));

      const animate = () => {
        scrollPosition += speed;
        if (scrollPosition >= totalWidth) scrollPosition = 0;
        content.style.transform = `translateX(-${scrollPosition}px)`;
        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animationFrameRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }
  }, [companies]);

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  if (loading) {
    return (
      <>
        <Header user={user} onFetchUserDetails={fetchCollegeDetails} onLogout={handleLogout} isScrolled={false} />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header user={user} onFetchUserDetails={fetchCollegeDetails} onLogout={handleLogout} isScrolled={false} />
        <div className="flex justify-center items-center h-screen">
          <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
            <h3 className="text-lg font-medium text-red-600">Error Loading Dashboard</h3>
            <p className="text-red-500 mt-2">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
            >
              Reload Dashboard
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header user={user} onFetchUserDetails={fetchCollegeDetails} onLogout={handleLogout} isScrolled={false} />
      {showCollegeDetails && collegeDetails && (
        <div 
          ref={collegeDetailsRef}
          className="fixed right-4 top-[70px] bg-white shadow-lg rounded-md p-4 w-64 z-50 border border-gray-200"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">College Details</h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-600"><span className="font-medium">Username:</span> {collegeDetails.username}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Email:</span> {collegeDetails.email}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">College:</span> {collegeDetails.name}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Address:</span> {collegeDetails.address}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Contact Person:</span> {collegeDetails.contact_person}</p>
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
      <div className="space-y-8 p-4 container mx-auto mt-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard 
              key={index} 
              title={stat.title}
              value={stat.value}
              description={stat.description}
              color={['blue', 'green', 'purple', 'orange'][index % 4]}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Department-wise Placement %</h3>
            <Bar
              data={{
                labels: ['Computer Science', 'Information Tech', 'Electronics', 'Mechanical', 'Electrical'],
                datasets: [{
                  label: 'Placement Percentage',
                  data: [85, 78, 72, 65, 60],
                  backgroundColor: '#3a6ea5',
                  borderRadius: 4,
                }],
              }}
              options={{
                responsive: true,
                scales: {
                  y: { beginAtZero: true, max: 100 },
                },
              }}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Application Status Distribution</h3>
            <Doughnut
              data={{
                labels: ['Selected', 'Rejected', 'Not Attended'],
                datasets: [{
                  data: [587, 420, 85],
                  backgroundColor: [
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(231, 76, 60, 0.8)',
                    'rgba(243, 156, 18, 0.8)',
                  ],
                }],
              }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-6">Top Recruiting Companies</h2>
          <div 
            ref={companiesContainerRef}
            className="relative w-full h-72 overflow-hidden"
          >
            <div
              ref={scrollContentRef}
              className="absolute top-0 left-0 h-full flex items-center"
              style={{ willChange: 'transform' }}
            >
              {[...companies, ...companies].map((company, index) => (
                <div key={`${company.id}-${index}`} className="flex-shrink-0 w-80 mx-6">
                  <ErrorBoundary>
                    <CompanyCard company={company} />
                  </ErrorBoundary>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Placements</h2>
            <div className="flex">
              <select 
                className="border rounded px-3 py-1 text-sm"
                value={selectedDepartment}
                onChange={handleDepartmentChange}
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
          <DataTable 
            columns={[
              { header: 'Student ID', accessor: 'id' },
              { header: 'Name', accessor: 'name' },
              { header: 'Department', accessor: 'department' },
              { header: 'Company', accessor: 'company' },
              { 
                header: 'Package (LPA)', 
                accessor: 'package',
                cell: pkg => pkg ? `₹${pkg}L` : '-',
              },
              { 
                header: 'Status', 
                accessor: 'status',
                cell: status => (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    status === 'Selected' ? 'bg-green-100 text-green-800' :
                    status === 'Rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {status || 'Unknown'}
                  </span>
                ),
              },
            ]}
            data={filteredStudents}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CollegeDashboard;