

// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useState } from 'react';
// import Register from './components/register.jsx';
// import Dashboard from './components/Dashboard.jsx';
// import MNCDashboard from './components/MNCDashboard.jsx';
// import CollegeDashboard from './components/CollegeDashboard.jsx';
// import ViewDetails from './components/viewdetails.jsx';
// import Login from './components/Login.jsx';
// import CollegeDetails from './components/CollegeDetails';
// import CourseDetails from './components/CourseDetails.jsx';
// import AdminDashboard from './components/AdminDashboard';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

//   const handleLogin = (userData) => {
//     setIsAuthenticated(true);
//     setUser(userData);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Default route shows Dashboard if authenticated, otherwise shows Login */}
//          <Route 
//           path="/" 
//           element={
//             isAuthenticated ? (
//               user.type === 'mnc' ? <MNCDashboard user={user} onLogout={handleLogout} /> :
//               user.type === 'college' ? <CollegeDashboard user={user} onLogout={handleLogout} /> :
//               <Dashboard user={user} onLogout={handleLogout} />
//             ) : (
//               <Navigate to="/login" />
//             )
//           } 
//         /> 



//         {/* Login route - redirects to dashboard if already logged in */}
//         <Route 
//           path="/login" 
//           element={
//             !isAuthenticated ? 
//               <Login onLogin={handleLogin} /> : 
//               <Navigate to="/" />
//           } 
//         />
        
//         {/* Registration route */}
//         <Route 
//           path="/register" 
//           element={
//             !isAuthenticated ? 
//               <Register onRegister={handleLogin} /> : 
//               <Navigate to="/" />
//           } 
//         />
        
//         {/* Explicit dashboard routes */}
//         <Route 
//           path="/dashboard" 
//           element={
//             isAuthenticated && user.type === 'student' ? 
//               <Dashboard user={user} onLogout={handleLogout} /> : 
//               <Navigate to="/login" />
//           } 
//         />
//         <Route 
//           path="/mnc-dashboard" 
//           element={
          
//               <MNCDashboard user={user} onLogout={handleLogout} />
             
//           } 
//         />
//         <Route 
//           path="/college-dashboard" 
//           element={
         
//               <CollegeDashboard user={user} onLogout={handleLogout} /> 
         
//           } 
//         />


// // Add this route to your Routes component
// <Route 
//   path="/admin-dashboard" 
//   element={
//     isAuthenticated && user.type === 'admin' ? 
//       <AdminDashboard user={user} onLogout={handleLogout} /> : 
//       <Navigate to="/login" />
//   } 
// />
        
//         {/* Protected content routes */}
//         <Route 
//           path="/view-details" 
//           element={
//             isAuthenticated ? 
//               <ViewDetails user={user} /> : 
//               <Navigate to="/login" />
//           } 
//         />
//         <Route 
//           path="/colleges/:id" 
//           element={
//             isAuthenticated ? 
//               <CollegeDetails user={user} /> : 
//               <Navigate to="/login" />
//           } 
//         />
//         <Route 
//           path="/courses/:id" 
//           element={
//             isAuthenticated ? 
//               <CourseDetails user={user} /> : 
//               <Navigate to="/login" />
//           } 
//         />
//         <Route 
//           path="/colleges" 
//           element={
//             isAuthenticated ? 
//               <ViewDetails type="colleges" user={user} /> : 
//               <Navigate to="/login" />
//           } 
//         />
//         <Route 
//           path="/courses" 
//           element={
//             isAuthenticated ? 
//               <ViewDetails type="courses" user={user} /> : 
//               <Navigate to="/login" />
//           } 
//         />
//         <Route 
//           path="/activities" 
//           element={
//             isAuthenticated ? 
//               <ViewDetails type="activities" user={user} /> : 
//               <Navigate to="/login" />
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

//export default App;











// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useState } from 'react';
// import Register from './components/register.jsx';
// import Dashboard from './components/Dashboard.jsx';
// import MNCDashboard from './components/MNCDashboard.jsx';
// import CollegeDashboard from './components/CollegeDashboard.jsx';
// import ViewDetails from './components/viewdetails.jsx';
// import Login from './components/Login.jsx';
// import CollegeDetails from './components/CollegeDetails';
// import CourseDetails from './components/CourseDetails.jsx';
// import AdminDashboard from './components/AdminDashboard';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

//   const handleLogin = (userData) => {
//     setIsAuthenticated(true);
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setUser(null);
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route 
//           path="/" 
//           element={
//             isAuthenticated ? (
//               user.type === 'mnc' ? <MNCDashboard user={user} onLogout={handleLogout} /> :
//               user.type === 'college' ? <CollegeDashboard user={user} onLogout={handleLogout} /> :
//               <Dashboard user={user} onLogout={handleLogout} />
//             ) : (
//               <Navigate to="/login" />
//             )
//           } 
//         />
//         <Route 
//           path="/login" 
//           element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
//         />
//         <Route 
//           path="/register" 
//           element={!isAuthenticated ? <Register onRegister={handleLogin} /> : <Navigate to="/" />} 
//         />
//         <Route 
//           path="/dashboard" 
//           element={isAuthenticated && user.type === 'student' ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
//         />
//         <Route 
//           path="/mnc-dashboard" 
//           element={isAuthenticated && user.type === 'mnc' ? <MNCDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
//         />
//         <Route 
//           path="/college-dashboard" 
//           element={isAuthenticated && user.type === 'college' ? <CollegeDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
//         />
//         <Route 
//           path="/admin-dashboard" 
//           element={isAuthenticated && user.type === 'admin' ? <AdminDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
//         />
//         <Route 
//           path="/view-details" 
//           element={isAuthenticated ? <ViewDetails user={user} /> : <Navigate to="/login" />} 
//         />
//         <Route 
//           path="/colleges/:id" 
//           element={isAuthenticated ? <CollegeDetails user={user} /> : <Navigate to="/login" />} 
//         />
//         <Route 
//           path="/courses/:id" 
//           element={isAuthenticated ? <CourseDetails user={user} /> : <Navigate to="/login" />} 
//         />
//         <Route 
//           path="/colleges" 
//           element={isAuthenticated ? <ViewDetails type="colleges" user={user} /> : <Navigate to="/login" />} 
//         />
//         <Route 
//           path="/courses" 
//           element={isAuthenticated ? <ViewDetails type="courses" user={user} /> : <Navigate to="/login" />} 
//         />
//         <Route 
//           path="/activities" 
//           element={isAuthenticated ? <ViewDetails type="activities" user={user} /> : <Navigate to="/login" />} 
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;












// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useState } from 'react';
// import Register from './components/register.jsx';
// import Dashboard from './components/Dashboard.jsx';
// import MNCDashboard from './components/MNCDashboard.jsx';
// import CollegeDashboard from './components/CollegeDashboard.jsx';
// import ViewDetails from './components/viewdetails.jsx';
// import Login from './components/Login.jsx';
// import CollegeDetails from './components/CollegeDetails';
// import CourseDetails from './components/CourseDetails.jsx';
// import AdminDashboard from './components/AdminDashboard';

// function App() {
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

//   const handleLogin = (userData) => {
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Default route is now Login */}
//         <Route path="/" element={<Login onLogin={handleLogin} />} />

//         {/* Dashboard routes without authentication requirement */}
//         <Route 
//           path="/dashboard" 
//           element={user && user.type === 'student' ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />}
//         />
//         <Route 
//           path="/mnc-dashboard" 
//           element={user && user.type === 'mnc' ? <MNCDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />}
//         />
//         <Route 
//           path="/college-dashboard" 
//           element={user && user.type === 'college' ? <CollegeDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />}
//         />
//         <Route 
//           path="/admin-dashboard" 
//           element={user && user.type === 'admin' ? <AdminDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />}
//         />

//         {/* Other routes */}
//         <Route path="/register" element={<Register onRegister={handleLogin} />} />
//         <Route 
//           path="/view-details" 
//           element={user ? <ViewDetails user={user} /> : <Navigate to="/" />}
//         />
//         <Route 
//           path="/colleges/:id" 
//           element={user ? <CollegeDetails user={user} /> : <Navigate to="/" />}
//         />
//         <Route 
//           path="/courses/:id" 
//           element={user ? <CourseDetails user={user} /> : <Navigate to="/" />}
//         />
//         <Route 
//           path="/colleges" 
//           element={user ? <ViewDetails type="colleges" user={user} /> : <Navigate to="/" />}
//         />
//         <Route 
//           path="/courses" 
//           element={user ? <ViewDetails type="courses" user={user} /> : <Navigate to="/" />}
//         />
//         <Route 
//           path="/activities" 
//           element={user ? <ViewDetails type="activities" user={user} /> : <Navigate to="/" />}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;








// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useState } from 'react';
// import Register from './components/register.jsx';
// import Dashboard from './components/Dashboard.jsx';
// import MNCDashboard from './components/MNCDashboard.jsx';
// import CollegeDashboard from './components/CollegeDashboard.jsx';
// import ViewDetails from './components/viewdetails.jsx';
// import Login from './components/Login.jsx';
// import CollegeDetails from './components/CollegeDetails';
// import CourseDetails from './components/CourseDetails.jsx';
// import AdminDashboard from './components/AdminDashboard';

// function App() {
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

//   const handleLogin = (userData) => {
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login onLogin={handleLogin} />} />
//         <Route 
//           path="/dashboard" 
//           element={user && user.type === 'student' ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />}
//         />
//         <Route 
//           path="/mnc-dashboard" 
//           element={user && user.type === 'mnc' ? <MNCDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />}
//         />
//         <Route 
//           path="/college-dashboard" 
//           element={user && user.type === 'college' ? <CollegeDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />}
//         />
//         <Route 
//           path="/admin-dashboard/:token" 
//           element={<AdminDashboard />}
//         />
//         <Route path="/register" element={<Register onRegister={handleLogin} />} />
//         <Route 
//           path="/view-details" 
//           element={user ? <ViewDetails user={user} /> : <Navigate to="/" />}
//         />
//         <Route 
//           path="/colleges/:id" 
//           element={user ? <CollegeDetails user={user} /> : <Navigate to="/" />}
//         />
//         <Route 
//           path="/courses/:id" 
//           element={user ? <CourseDetails user={user} /> : <Navigate to="/" />}
//         />
//         <Route 
//           path="/colleges" 
//           element={user ? <ViewDetails type="colleges" user={user} /> : <Navigate to="/" />}
//         />
//         <Route 
//           path="/courses" 
//           element={user ? <ViewDetails type="courses" user={user} /> : <Navigate to="/" />}
//         />
//         <Route 
//           path="/activities" 
//           element={user ? <ViewDetails type="activities" user={user} /> : <Navigate to="/" />}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;













import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Register from './components/register.jsx';
import Dashboard from './components/Dashboard.jsx';
import MNCDashboard from './components/MNCDashboard.jsx';
import CollegeDashboard from './components/CollegeDashboard.jsx';
import StudentCareerDashboard from './components/StudentCareerDashboard.jsx'; // Add this
import ViewDetails from './components/viewdetails.jsx';
import Login from './components/Login.jsx';
import CollegeDetails from './components/CollegeDetails';
import CourseDetails from './components/CourseDetails.jsx';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route 
          path="/dashboard" 
          element={user && user.type === 'student' ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />}
        />
        <Route 
          path="/career-dashboard" 
          element={user && user.type === 'student' ? <StudentCareerDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />}
        />
        <Route 
          path="/mnc-dashboard" 
          element={user && user.type === 'mnc' ? <MNCDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />}
        />
        <Route 
          path="/college-dashboard" 
          element={user && user.type === 'college' ? <CollegeDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />}
        />
        <Route 
          path="/admin-dashboard/:token" 
          element={<AdminDashboard />}
        />
        <Route path="/register" element={<Register onRegister={handleLogin} />} />
        <Route 
          path="/view-details" 
          element={user ? <ViewDetails user={user} /> : <Navigate to="/" />}
        />
        <Route 
          path="/colleges/:id" 
          element={user ? <CollegeDetails user={user} /> : <Navigate to="/" />}
        />
        <Route 
          path="/courses/:id" 
          element={user ? <CourseDetails user={user} /> : <Navigate to="/" />}
        />
        <Route 
          path="/colleges" 
          element={user ? <ViewDetails type="colleges" user={user} /> : <Navigate to="/" />}
        />
        <Route 
          path="/courses" 
          element={user ? <ViewDetails type="courses" user={user} /> : <Navigate to="/" />}
        />
        <Route 
          path="/activities" 
          element={user ? <ViewDetails type="activities" user={user} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;