// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Register from './components/register.jsx';
// import Dashboard from './components/Dashboard.jsx';
// import ViewDetails from './components/viewdetails.jsx';
// import Login from './components/Login.jsx';
// import CollegeDetails from './components/CollegeDetails';
// import CourseDetails from './components/CourseDetails.jsx'; // Added CourseDetails import

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         {/* <Route path="/" element={<Dashboard />} /> */}
//         <Route path="/view-details" element={<ViewDetails />} />
//         <Route path="/college-details/:id" element={<CollegeDetails />} />
//         <Route path="/course/:id" element={<CourseDetails />} /> {/* Added route for CourseDetails */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;




import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Register from './components/register.jsx';
import Dashboard from './components/Dashboard.jsx';
import ViewDetails from './components/viewdetails.jsx';
import Login from './components/Login.jsx';
import CollegeDetails from './components/CollegeDetails';
import CourseDetails from './components/CourseDetails.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Dashboard isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />} 
        />
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/register" 
          element={!isAuthenticated ? <Register onRegister={handleLogin} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard isAuthenticated={isAuthenticated} user={user} /> : <Navigate to="/" />} 
        />
     
        <Route 
          path="/view-details" 
          element={isAuthenticated ? <ViewDetails user={user} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/colleges/:id" 
          element={isAuthenticated ? <CollegeDetails user={user} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/courses/:id" 
          element={isAuthenticated ? <CourseDetails user={user} /> : <Navigate to="/" />} 
        />
        <Route 
    path="/colleges" 
    element={isAuthenticated ? <ViewDetails type="colleges" user={user} /> : <Navigate to="/" />} 
  />
  <Route 
    path="/courses" 
    element={isAuthenticated ? <ViewDetails type="courses" user={user} /> : <Navigate to="/" />} 
  />
  <Route 
    path="/activities" 
    element={isAuthenticated ? <ViewDetails type="activities" user={user} /> : <Navigate to="/" />}
    />
      </Routes>
    </Router>
  );
}

export default App;