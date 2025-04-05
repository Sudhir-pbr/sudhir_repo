// import React, { useRef, useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Header from './Header';
// import Footer from './Footer';

// const Dashboard = ({ isAuthenticated, user, onLogout }) => {
//   // State declarations
//   const [userDetails, setUserDetails] = useState(null);
//   const [showUserDetails, setShowUserDetails] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [showScrollTop, setShowScrollTop] = useState(false);
//   const [colleges, setColleges] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [activities, setActivities] = useState([]);
//   const [loadingColleges, setLoadingColleges] = useState(true);
//   const [loadingCourses, setLoadingCourses] = useState(true);
//   const [loadingActivities, setLoadingActivities] = useState(true);
//   const [errorColleges, setErrorColleges] = useState(null);
//   const [errorCourses, setErrorCourses] = useState(null);
//   const [errorActivities, setErrorActivities] = useState(null);
//   const [showAuthPopup, setShowAuthPopup] = useState(false);

//   // Refs
//   const collegesContainerRef = useRef(null);
//   const coursesContainerRef = useRef(null);
//   const activitiesContainerRef = useRef(null);
//   const userDetailsRef = useRef(null);
//   const [isPaused, setIsPaused] = useState(false);

//   const navigate = useNavigate();

//   // Auto-scroll effect
//   const setupAutoScroll = (containerRef) => {
//     if (!containerRef.current) return;

//     const container = containerRef.current;
//     const contentWidth = container.scrollWidth;
//     const containerWidth = container.clientWidth;
//     const maxScroll = contentWidth - containerWidth;
//     let scrollPosition = 0;
//     let direction = 1;
//     const scrollSpeed = 1;

//     let animationFrameId;

//     const scroll = () => {
//       if (isPaused) {
//         animationFrameId = requestAnimationFrame(scroll);
//         return;
//       }

//       scrollPosition += scrollSpeed * direction;

//       if (scrollPosition >= maxScroll) {
//         direction = -1;
//       } else if (scrollPosition <= 0) {
//         direction = 1;
//       }

//       container.scrollLeft = scrollPosition;
//       animationFrameId = requestAnimationFrame(scroll);
//     };

//     animationFrameId = requestAnimationFrame(scroll);

//     container.addEventListener('mouseenter', () => setIsPaused(true));
//     container.addEventListener('mouseleave', () => setIsPaused(false));

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//       container.removeEventListener('mouseenter', () => setIsPaused(true));
//       container.removeEventListener('mouseleave', () => setIsPaused(false));
//     };
//   };

//   // Fetch user details
//   const fetchUserDetails = async () => {
//     if (!isAuthenticated) {
//       setShowAuthPopup(true);
//       return;
//     }
//     try {
//       const response = await axios.get(`http://localhost:5000/user/${user.username}`);
//       setUserDetails(response.data);
//       setShowUserDetails(!showUserDetails);
//     } catch (err) {
//       console.error('Error fetching user details:', err);
//     }
//   };

//   // Navigation handlers
//   const handleLogout = () => {
//     onLogout();
//     navigate('/');
//   };

//   const handleCollegeClick = (collegeId) => {
//     if (!isAuthenticated) {
//       setShowAuthPopup(true);
//       return;
//     }
//     navigate(`/colleges/${collegeId}`, {
//       state: { username: user.username }
//     });
//   };

//   const handleCourseClick = (courseId) => {
//     if (!isAuthenticated) {
//       setShowAuthPopup(true);
//       return;
//     }
//     navigate(`/courses/${courseId}`, {
//       state: { username: user.username }
//     });
//   };

//   const handleActivityClick = (activityId) => {
//     if (!isAuthenticated) {
//       setShowAuthPopup(true);
//       return;
//     }
//     navigate(`/activities/${activityId}`, {
//       state: { username: user.username }
//     });
//   };

//   const handleViewAll = (type) => {
//     if (!isAuthenticated) {
//       setShowAuthPopup(true);
//       return;
//     }
//     navigate(`/${type}`, {
//       state: { 
//         username: user.username,
//         type: type // Pass the type explicitly
//       }
//     });
//   };

//   // Event listeners
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (userDetailsRef.current && !userDetailsRef.current.contains(event.target)) {
//         const userButton = document.querySelector('.user-button');
//         if (!userButton || !userButton.contains(event.target)) {
//           setShowUserDetails(false);
//         }
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   // Setup auto-scroll
//   useEffect(() => {
//     if (colleges.length > 0) setupAutoScroll(collegesContainerRef);
//     if (courses.length > 0) setupAutoScroll(coursesContainerRef);
//     if (activities.length > 0) setupAutoScroll(activitiesContainerRef);
//   }, [colleges, courses, activities, isPaused]);

//   // Scroll handler
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//       setShowScrollTop(window.scrollY > 300);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Fetch data
//   useEffect(() => {
//     const fetchColleges = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/colleges');
//         setColleges(response.data);
//       } catch (err) {
//         setErrorColleges('Failed to load colleges. Please try again later.');
//       } finally {
//         setLoadingColleges(false);
//       }
//     };

//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/courses');
//         setCourses(response.data);
//       } catch (err) {
//         setErrorCourses('Failed to load courses. Please try again later.');
//       } finally {
//         setLoadingCourses(false);
//       }
//     };

//     const fetchActivities = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/activities');
//         setActivities(response.data);
//       } catch (err) {
//         setErrorActivities('Failed to load activities. Please try again later.');
//       } finally {
//         setLoadingActivities(false);
//       }
//     };

//     fetchColleges();
//     fetchCourses();
//     fetchActivities();
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div className="min-h-screen bg-[#FdFaF5] flex flex-col">
//       <Header 
//         isAuthenticated={isAuthenticated} 
//         user={user} 
//         onFetchUserDetails={fetchUserDetails}
//         isScrolled={isScrolled} 
//       />

//       {/* Authentication Popup */}
//       {showAuthPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
//             <h2 className="text-2xl font-bold text-[#1A3C61] mb-4">Authentication Required</h2>
//             <p className="text-gray-600 mb-6">
//               Please login or register to access this feature.
//             </p>
//             <div className="flex flex-col space-y-4">
//               <Link
//                 to="/login"
//                 className="bg-[#6B46C1] text-white py-2 px-4 rounded hover:bg-[#1A3C61] transition-colors duration-300 text-center"
//                 onClick={() => setShowAuthPopup(false)}
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="border border-[#6B46C1] text-[#6B46C1] py-2 px-4 rounded hover:bg-[#E8E9FF] transition-colors duration-300 text-center"
//                 onClick={() => setShowAuthPopup(false)}
//               >
//                 Create Account
//               </Link>
//               <button
//                 onClick={() => setShowAuthPopup(false)}
//                 className="text-gray-500 hover:text-gray-700 mt-2"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* User Details Dropdown */}
//       {showUserDetails && userDetails && (
//         <div 
//           ref={userDetailsRef}
//           className="fixed right-4 top-[70px] bg-white shadow-lg rounded-md p-4 w-64 z-50 border border-gray-200"
//         >
//           <div className="mb-4">
//             <h3 className="text-lg font-semibold text-gray-800">User Details</h3>
//             <div className="mt-2 space-y-1">
//               <p className="text-sm text-gray-600">
//                 <span className="font-medium">Username:</span> {userDetails.username}
//               </p>
//               <p className="text-sm text-gray-600">
//                 <span className="font-medium">Email:</span> {userDetails.email}
//               </p>
//               <p className="text-sm text-gray-600">
//                 <span className="font-medium">Phone:</span> {userDetails.phone_number}
//               </p>
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

//       <div className='h-[200px] w-full'></div>

//       <div className="pt-[70px] flex-1">
//         {/* Welcome Section */}
//         <div 
//           className="absolute inset-0 bg-contain bg-no-repeat bg-center"
//           style={{
//             backgroundImage: "url('https://campustocareer.tech/uploads/home/1737916340-KOyulCB74e.png')",
//             backgroundSize: '100% auto',
//             zIndex: 0,
//           }}
//         ></div>
//         <section className="px-10 py-6 flex flex-col items-center justify-center text-center relative z-10">
//           <div className="flex items-center space-x-2 mb-4">
//             <span className="text-gray-600">COME</span>
//             <div className="w-[6px] h-[6px] bg-[#FF6F61] rounded-full"></div>
//             <span className="text-gray-600">FOR</span>
//             <div className="w-[6px] h-[6px] bg-[#FF6F61] rounded-full"></div>
//             <span className="text-gray-600">LEARN</span>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold text-[#1A3C61] mb-4">
//             A Better Learning Starts Here.
//           </h1>
//           <p className="text-gray-600 max-w-[600px] mb-6">
//             While the lovely valley teems with vapour around me, and the meridian sun strikes the upper
//           </p>
//           <div className='h-[20px] w-full'></div>
//           <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
//             <div className="flex items-center bg-white shadow-md rounded-[10px] p-[15px] hover:shadow-lg transition-shadow duration-300">
//               <div className="w-[40px] h-[40px] bg-[#FFE5E2] rounded-full flex items-center justify-center mr-4">
//                 <span className="text-[#FF6F61]">🎓</span>
//               </div>
//               <p className="text-gray-700">
//                 Earn a Certificate on all Advanced Technologies in multiple streams
//               </p>
//             </div>
//             <div className="flex space-x-4">
//               <button 
//                 onClick={() => isAuthenticated ? navigate('/tour') : setShowAuthPopup(true)}
//                 className="bg-[#1A3C61] text-white p-[10px] rounded-[5px] w-[120px] hover:bg-white hover:text-[#1A3C61] transition-colors duration-300"
//               >
//                 Take A Tour →
//               </button>
//               <button 
//                 onClick={() => isAuthenticated ? navigate('/popular-courses') : setShowAuthPopup(true)}
//                 className="bg-[#6B46C1] text-white p-[10px] rounded-[5px] w-[120px] hover:bg-white hover:text-[#6B46C1] transition-colors duration-300"
//               >
//                 Popular Courses →
//               </button>
//             </div>
//             <div className="flex items-center bg-white shadow-md rounded-[10px] p-[15px] hover:shadow-lg transition-shadow duration-300">
//               <div className="w-[40px] h-[40px] bg-[#E8E9FF] rounded-full flex items-center justify-center mr-4">
//                 <span className="text-[#6B46C1]">💻</span>
//               </div>
//               <p className="text-gray-700">
//                 5000+ Courses multiple streams to select different careers
//               </p>
//             </div>
//           </div>
//         </section>

//         <div className='h-[200px] w-full'></div>

//         {/* Student Activities Section */}
//         <section className="px-10 py-6">
//           <div className="flex flex-col md:flex-row items-center justify-between mb-6">
//             <div className="flex items-center space-x-4">
//               <span className="text-2xl">🖥️</span>
//               <h1 className="text-2xl md:text-3xl font-bold text-[#1A3C61]">
//                 Student Activities
//               </h1>
//             </div>
//             <button
//               onClick={() => handleViewAll('activities')}
//               className="bg-white border border-[#6B46C1] hover:text-white transition-colors duration-300 hover:bg-[#1A3C61] text-[#6B46C1] p-[10px] rounded-[5px] w-[120px] mt-4 md:mt-0"
//             >
//               View ALL →
//             </button>
//           </div>
//           <p className="text-gray-500 mb-6">Find more activities</p>
//           <div className='h-[20px] w-full'></div>
//           <div 
//             className="flex flex-row overflow-x-hidden relative"
//             ref={activitiesContainerRef}
//           >
//             <div className="flex space-x-6 min-w-max">
//               {loadingActivities ? (
//                 <p className="text-gray-500">Loading activities...</p>
//               ) : errorActivities ? (
//                 <p className="text-red-500">{errorActivities}</p>
//               ) : activities.length === 0 ? (
//                 <p className="text-gray-500">No activities available.</p>
//               ) : (
//                 activities.map((activity) => (
//                   <div key={activity.id} className="bg-white shadow-md rounded-[10px] w-[300px] flex-shrink-0 overflow-hidden hover:shadow-lg transition-shadow duration-300">
//                     <div onClick={() => handleActivityClick(activity.id)} className="cursor-pointer">
//                       <img
//                         src={activity.image_url}
//                         alt={`Image of ${activity.name}`}
//                         className="w-full h-[150px] object-cover rounded-t-[10px]"
//                         loading="lazy"
//                       />
//                     </div>
//                     <div className="p-6">
//                       <h3 className="text-lg font-bold text-[#1A3C61] mb-2">{activity.name}</h3>
//                       <p className="text-gray-500 mb-2">{activity.description}</p>
//                       <p className="text-gray-500">
//                         Date: {new Date(activity.date).toLocaleDateString()}
//                       </p>
//                       <p className="text-gray-500">
//                         Participants: {activity.participants}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </section>

//         <div className='h-[200px] w-full'></div>

//         {/* Colleges Section */}
//         <section className="px-10 py-6">
//           <div className="flex flex-col md:flex-row items-center justify-between mb-6">
//             <div className="flex items-center space-x-4">
//               <span className="text-2xl">🏛️</span>
//               <h1 className="text-2xl md:text-3xl font-bold text-[#1A3C61]">
//                 Select your College <span className="text-gray-500">(University and Affiliated)</span>
//               </h1>
//             </div>
//             <button
//               onClick={() => handleViewAll('colleges')}
//               className="bg-white border border-[#6B46C1] hover:text-white transition-colors duration-300 hover:bg-[#1A3C61] text-[#6B46C1] p-[10px] rounded-[5px] w-[120px] mt-4 md:mt-0"
//             >
//               View ALL →
//             </button>
//           </div>
//           <p className="text-gray-500 mb-6">find more opportunities</p>
//           <div className='h-[20px] w-full'></div>
//           <div 
//             className="flex flex-row overflow-x-hidden relative"
//             ref={collegesContainerRef}
//           >
//             <div className="flex space-x-6 min-w-max">
//               {loadingColleges ? (
//                 <p className="text-gray-500">Loading colleges...</p>
//               ) : errorColleges ? (
//                 <p className="text-red-500">{errorColleges}</p>
//               ) : colleges.length === 0 ? (
//                 <p className="text-gray-500">No colleges available.</p>
//               ) : (
//                 colleges.map((college) => (
//                   <div key={college.id} className="bg-white shadow-md rounded-[10px] w-[300px] flex-shrink-0 overflow-hidden hover:shadow-lg transition-shadow duration-300">
//                     <div 
//                       onClick={() => handleCollegeClick(college.id)}
//                       className="cursor-pointer"
//                     >
//                       <img
//                         src={college.image_url}
//                         alt={`Image of ${college.name}`}
//                         className="w-full h-[150px] object-cover rounded-t-[10px]"
//                         loading="lazy"
//                       />
//                     </div>
//                     <div className="p-6">
//                       <h3 className="text-lg font-bold text-[#1A3C61] mb-2">{college.name}</h3>
//                       <p className="text-gray-500 mb-2">{college.streams}</p>
//                       <p className="text-gray-500">
//                         {college.reviews} <span className="text-yellow-500">{'★'.repeat(college.rating)}</span>
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </section>

//         <div className='h-[200px] w-full'></div>

//         {/* Courses Section */}
//         <section className="px-10 py-6 mb-12">
//           <div className="flex flex-col md:flex-row items-center justify-between mb-6">
//             <div className="flex items-center space-x-4">
//               <span className="text-2xl">📚</span>
//               <h1 className="text-2xl md:text-3xl font-bold text-[#1A3C61]">A Broad Selection Of Courses</h1>
//             </div>
//             <button
//               onClick={() => handleViewAll('courses')}
//               className="bg-white border border-[#6B46C1] hover:text-white transition-colors duration-300 hover:bg-[#1A3C61] text-[#6B46C1] p-[10px] rounded-[5px] w-[120px] mt-4 md:mt-0"
//             >
//               View ALL →
//             </button>
//           </div>
//           <p className="text-gray-500 mb-6">CHOOSE FROM 5,000 ONLINE VIDEO COURSES WITH NEW ADDITIONS</p>
//           <div className='h-[20px] w-full'></div>
//           <div 
//             className="flex flex-row overflow-x-hidden relative"
//             ref={coursesContainerRef}
//           >
//             <div className="flex space-x-6 min-w-max">
//               {loadingCourses ? (
//                 <p className="text-gray-500">Loading courses...</p>
//               ) : errorCourses ? (
//                 <p className="text-red-500">{errorCourses}</p>
//               ) : courses.length === 0 ? (
//                 <p className="text-gray-500">No courses available.</p>
//               ) : (
//                 courses.map((course) => (
//                   <div key={course.id} className="w-[300px] flex-shrink-0 hover:shadow-lg transition-shadow duration-300">
//                     <div 
//                       onClick={() => handleCourseClick(course.id)}
//                       className="cursor-pointer"
//                     >
//                       <div
//                         className="w-full h-[150px] rounded-[10px] flex items-center justify-center text-white text-lg font-bold bg-cover bg-center hover:scale-105 transition-transform duration-300"
//                         style={{
//                           backgroundImage: `url('${course.image_url}')`,
//                         }}
//                       ></div>
//                     </div>
//                     <h3 className="text-lg font-bold text-[#1A3C61] mt-4 mb-2">{course.name}</h3>
//                     <p className="text-gray-500 mb-2">{course.description}</p>
//                     <p className="text-gray-500">
//                       <span className="text-yellow-500">{course.rating} {'★'.repeat(Math.floor(course.rating))}☆</span> ({course.reviews})
//                     </p>
//                     <h2 className="text-gray-500 mt-2"><strong>{course.price}</strong></h2>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </section>
//       </div>

//       <div className='h-[200px] w-full'></div>
//       <Footer />

//       {showScrollTop && (
//         <button
//           onClick={scrollToTop}
//           className="fixed bottom-4 right-4 bg-[#6B46C1] text-white p-3 rounded-full shadow-lg hover:bg-[#1A3C61] transition-colors duration-300"
//           aria-label="Scroll to top"
//         >
//           ↑
//         </button>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
















import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const Dashboard = ({ user, onLogout }) => {
  // State declarations
  const [userDetails, setUserDetails] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loadingColleges, setLoadingColleges] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [errorColleges, setErrorColleges] = useState(null);
  const [errorCourses, setErrorCourses] = useState(null);
  const [errorActivities, setErrorActivities] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  // Refs
  const collegesContainerRef = useRef(null);
  const coursesContainerRef = useRef(null);
  const activitiesContainerRef = useRef(null);
  const userDetailsRef = useRef(null);

  const navigate = useNavigate();

  // Auto-scroll effect
  const setupAutoScroll = (containerRef) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const contentWidth = container.scrollWidth;
    const containerWidth = container.clientWidth;
    const maxScroll = contentWidth - containerWidth;
    let scrollPosition = 0;
    let direction = 1;
    const scrollSpeed = 1;

    let animationFrameId;

    const scroll = () => {
      if (isPaused) {
        animationFrameId = requestAnimationFrame(scroll);
        return;
      }

      scrollPosition += scrollSpeed * direction;

      if (scrollPosition >= maxScroll) {
        direction = -1;
      } else if (scrollPosition <= 0) {
        direction = 1;
      }

      container.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    container.addEventListener('mouseenter', () => setIsPaused(true));
    container.addEventListener('mouseleave', () => setIsPaused(false));

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mouseenter', () => setIsPaused(true));
      container.removeEventListener('mouseleave', () => setIsPaused(false));
    };
  };

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${user?.username}`);
      setUserDetails(response.data);
      setShowUserDetails(!showUserDetails);
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };

  // Navigation handlers
  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const handleCollegeClick = (collegeId) => {
    navigate(`/colleges/${collegeId}`, {
      state: { username: user?.username }
    });
  };

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`, {
      state: { username: user?.username }
    });
  };

  const handleActivityClick = (activityId) => {
    navigate(`/activities/${activityId}`, {
      state: { username: user?.username }
    });
  };

  const handleViewAll = (type) => {
    navigate(`/${type}`, {
      state: { 
        username: user?.username,
        type: type
      }
    });
  };

  // Event listeners
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDetailsRef.current && !userDetailsRef.current.contains(event.target)) {
        const userButton = document.querySelector('.user-button');
        if (!userButton || !userButton.contains(event.target)) {
          setShowUserDetails(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Setup auto-scroll
  useEffect(() => {
    if (colleges.length > 0) setupAutoScroll(collegesContainerRef);
    if (courses.length > 0) setupAutoScroll(coursesContainerRef);
    if (activities.length > 0) setupAutoScroll(activitiesContainerRef);
  }, [colleges, courses, activities, isPaused]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch data
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get('http://localhost:5000/colleges');
        setColleges(response.data);
      } catch (err) {
        setErrorColleges('Failed to load colleges. Please try again later.');
      } finally {
        setLoadingColleges(false);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/courses');
        setCourses(response.data);
      } catch (err) {
        setErrorCourses('Failed to load courses. Please try again later.');
      } finally {
        setLoadingCourses(false);
      }
    };

    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/activities');
        setActivities(response.data);
      } catch (err) {
        setErrorActivities('Failed to load activities. Please try again later.');
      } finally {
        setLoadingActivities(false);
      }
    };

    fetchColleges();
    fetchCourses();
    fetchActivities();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FdFaF5] flex flex-col">
      <Header 
        user={user} 
        onFetchUserDetails={fetchUserDetails}
        isScrolled={isScrolled} 
      />

      {/* User Details Dropdown */}
      {showUserDetails && userDetails && (
        <div 
          ref={userDetailsRef}
          className="fixed right-4 top-[70px] bg-white shadow-lg rounded-md p-4 w-64 z-50 border border-gray-200"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">User Details</h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Username:</span> {userDetails.username}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Email:</span> {userDetails.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Phone:</span> {userDetails.phone_number}
              </p>
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

      <div className='h-[200px] w-full'></div>

      <div className="pt-[70px] flex-1">
        {/* Welcome Section */}
        <div 
          className="absolute inset-0 bg-contain bg-no-repeat bg-center"
          style={{
            backgroundImage: "url('https://campustocareer.tech/uploads/home/1737916340-KOyulCB74e.png')",
            backgroundSize: '100% auto',
            zIndex: 0,
          }}
        ></div>
        <section className="px-10 py-6 flex flex-col items-center justify-center text-center relative z-10">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-gray-600">COME</span>
            <div className="w-[6px] h-[6px] bg-[#FF6F61] rounded-full"></div>
            <span className="text-gray-600">FOR</span>
            <div className="w-[6px] h-[6px] bg-[#FF6F61] rounded-full"></div>
            <span className="text-gray-600">LEARN</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A3C61] mb-4">
            A Better Learning Starts Here.
          </h1>
          <p className="text-gray-600 max-w-[600px] mb-6">
            While the lovely valley teems with vapour around me, and the meridian sun strikes the upper
          </p>
          <div className='h-[20px] w-full'></div>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center bg-white shadow-md rounded-[10px] p-[15px] hover:shadow-lg transition-shadow duration-300">
              <div className="w-[40px] h-[40px] bg-[#FFE5E2] rounded-full flex items-center justify-center mr-4">
                <span className="text-[#FF6F61]">🎓</span>
              </div>
              <p className="text-gray-700">
                Earn a Certificate on all Advanced Technologies in multiple streams
              </p>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => navigate('/tour')}
                className="bg-[#1A3C61] text-white p-[10px] rounded-[5px] w-[120px] hover:bg-white hover:text-[#1A3C61] transition-colors duration-300"
              >
                Take A Tour →
              </button>
              <button 
                onClick={() => navigate('/popular-courses')}
                className="bg-[#6B46C1] text-white p-[10px] rounded-[5px] w-[120px] hover:bg-white hover:text-[#6B46C1] transition-colors duration-300"
              >
                Popular Courses →
              </button>
            </div>
            <div className="flex items-center bg-white shadow-md rounded-[10px] p-[15px] hover:shadow-lg transition-shadow duration-300">
              <div className="w-[40px] h-[40px] bg-[#E8E9FF] rounded-full flex items-center justify-center mr-4">
                <span className="text-[#6B46C1]">💻</span>
              </div>
              <p className="text-gray-700">
                5000+ Courses multiple streams to select different careers
              </p>
            </div>
          </div>
        </section>

        <div className='h-[200px] w-full'></div>

        {/* Student Activities Section */}
        <section className="px-10 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">🖥️</span>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1A3C61]">
                Student Activities
              </h1>
            </div>
            <button
              onClick={() => handleViewAll('activities')}
              className="bg-white border border-[#6B46C1] hover:text-white transition-colors duration-300 hover:bg-[#1A3C61] text-[#6B46C1] p-[10px] rounded-[5px] w-[120px] mt-4 md:mt-0"
            >
              View ALL →
            </button>
          </div>
          <p className="text-gray-500 mb-6">Find more activities</p>
          <div className='h-[20px] w-full'></div>
          <div 
            className="flex flex-row overflow-x-hidden relative"
            ref={activitiesContainerRef}
          >
            <div className="flex space-x-6 min-w-max">
              {loadingActivities ? (
                <p className="text-gray-500">Loading activities...</p>
              ) : errorActivities ? (
                <p className="text-red-500">{errorActivities}</p>
              ) : activities.length === 0 ? (
                <p className="text-gray-500">No activities available.</p>
              ) : (
                activities.map((activity) => (
                  <div key={activity.id} className="bg-white shadow-md rounded-[10px] w-[300px] flex-shrink-0 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div onClick={() => handleActivityClick(activity.id)} className="cursor-pointer">
                      <img
                        src={activity.image_url}
                        alt={`Image of ${activity.name}`}
                        className="w-full h-[150px] object-cover rounded-t-[10px]"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-[#1A3C61] mb-2">{activity.name}</h3>
                      <p className="text-gray-500 mb-2">{activity.description}</p>
                      <p className="text-gray-500">
                        Date: {new Date(activity.date).toLocaleDateString()}
                      </p>
                      <p className="text-gray-500">
                        Participants: {activity.participants}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <div className='h-[200px] w-full'></div>

        {/* Colleges Section */}
        <section className="px-10 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">🏛️</span>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1A3C61]">
                Select your College <span className="text-gray-500">(University and Affiliated)</span>
              </h1>
            </div>
            <button
              onClick={() => handleViewAll('colleges')}
              className="bg-white border border-[#6B46C1] hover:text-white transition-colors duration-300 hover:bg-[#1A3C61] text-[#6B46C1] p-[10px] rounded-[5px] w-[120px] mt-4 md:mt-0"
            >
              View ALL →
            </button>
          </div>
          <p className="text-gray-500 mb-6">find more opportunities</p>
          <div className='h-[20px] w-full'></div>
          <div 
            className="flex flex-row overflow-x-hidden relative"
            ref={collegesContainerRef}
          >
            <div className="flex space-x-6 min-w-max">
              {loadingColleges ? (
                <p className="text-gray-500">Loading colleges...</p>
              ) : errorColleges ? (
                <p className="text-red-500">{errorColleges}</p>
              ) : colleges.length === 0 ? (
                <p className="text-gray-500">No colleges available.</p>
              ) : (
                colleges.map((college) => (
                  <div key={college.id} className="bg-white shadow-md rounded-[10px] w-[300px] flex-shrink-0 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div 
                      onClick={() => handleCollegeClick(college.id)}
                      className="cursor-pointer"
                    >
                      <img
                        src={college.image_url}
                        alt={`Image of ${college.name}`}
                        className="w-full h-[150px] object-cover rounded-t-[10px]"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-[#1A3C61] mb-2">{college.name}</h3>
                      <p className="text-gray-500 mb-2">{college.streams}</p>
                      <p className="text-gray-500">
                        {college.reviews} <span className="text-yellow-500">{'★'.repeat(college.rating)}</span>
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <div className='h-[200px] w-full'></div>

        {/* Courses Section */}
        <section className="px-10 py-6 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">📚</span>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1A3C61]">A Broad Selection Of Courses</h1>
            </div>
            <button
              onClick={() => handleViewAll('courses')}
              className="bg-white border border-[#6B46C1] hover:text-white transition-colors duration-300 hover:bg-[#1A3C61] text-[#6B46C1] p-[10px] rounded-[5px] w-[120px] mt-4 md:mt-0"
            >
              View ALL →
            </button>
          </div>
          <p className="text-gray-500 mb-6">CHOOSE FROM 5,000 ONLINE VIDEO COURSES WITH NEW ADDITIONS</p>
          <div className='h-[20px] w-full'></div>
          <div 
            className="flex flex-row overflow-x-hidden relative"
            ref={coursesContainerRef}
          >
            <div className="flex space-x-6 min-w-max">
              {loadingCourses ? (
                <p className="text-gray-500">Loading courses...</p>
              ) : errorCourses ? (
                <p className="text-red-500">{errorCourses}</p>
              ) : courses.length === 0 ? (
                <p className="text-gray-500">No courses available.</p>
              ) : (
                courses.map((course) => (
                  <div key={course.id} className="w-[300px] flex-shrink-0 hover:shadow-lg transition-shadow duration-300">
                    <div 
                      onClick={() => handleCourseClick(course.id)}
                      className="cursor-pointer"
                    >
                      <div
                        className="w-full h-[150px] rounded-[10px] flex items-center justify-center text-white text-lg font-bold bg-cover bg-center hover:scale-105 transition-transform duration-300"
                        style={{
                          backgroundImage: `url('${course.image_url}')`,
                        }}
                      ></div>
                    </div>
                    <h3 className="text-lg font-bold text-[#1A3C61] mt-4 mb-2">{course.name}</h3>
                    <p className="text-gray-500 mb-2">{course.description}</p>
                    <p className="text-gray-500">
                      <span className="text-yellow-500">{course.rating} {'★'.repeat(Math.floor(course.rating))}☆</span> ({course.reviews})
                    </p>
                    <h2 className="text-gray-500 mt-2"><strong>{course.price}</strong></h2>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>

      <div className='h-[200px] w-full'></div>
      <Footer />

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-[#6B46C1] text-white p-3 rounded-full shadow-lg hover:bg-[#1A3C61] transition-colors duration-300"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Dashboard;