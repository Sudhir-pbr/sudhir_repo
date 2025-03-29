
// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Header from './Header';
// import Footer from './Footer';

// const ViewDetails = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [showScrollTop, setShowScrollTop] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const { type, username } = location.state || {}; // Extract type and username from state

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//       setShowScrollTop(window.scrollY > 300);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const endpoint = type === 'colleges' ? 'colleges' : 'courses';
//         const response = await axios.get(`http://localhost:5000/${endpoint}`);
//         setItems(response.data);
//       } catch (err) {
//         console.error(`Error fetching ${type}:`, err);
//         setError(`Failed to load ${type}. Please try again later.`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (type) {
//       fetchData();
//     } else {
//       setError('Invalid section type.');
//       setLoading(false);
//     }
//   }, [type]);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleFetchUserDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/user/${username}`);
//       // You can handle user details display here if needed (e.g., in a modal)
//       console.log(response.data);
//     } catch (err) {
//       console.error('Error fetching user details:', err);
//     }
//   };

//   // Define the heading based on the type
//   const heading =
//     type === 'colleges'
//       ? 'Select your College <span className="text-gray-500">(University and Affiliated)</span>'
//       : 'A Broad Selection Of Courses';

//   return (
//     <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
//       <Header
//         username={username}
//         onFetchUserDetails={handleFetchUserDetails}
//         isScrolled={isScrolled}
//       />
//       <div className="pt-[70px] flex-1">
//         <section className="px-10 py-6 mb-12">
//           <div className="flex flex-col md:flex-row items-center justify-between mb-6">
//             <div className="flex items-center space-x-4">
//               <span className="text-2xl">🖥️</span>
//               <h1
//                 className="text-2xl md:text-3xl font-bold text-[#1A3C61]"
//                 dangerouslySetInnerHTML={{ __html: heading }}
//               />
//             </div>
//             <button
//               onClick={() => navigate('/dashboard', { state: { username } })}
//               className="bg-white border border-[#6B46C1] hover:text-white transition-colors duration-300 hover:bg-[#1A3C61] text-[#6B46C1] p-[10px] rounded-[5px] w-[120px] mt-4 md:mt-0"
//             >
//               Back to Dashboard ←
//             </button>
//           </div>
//           <p className="text-gray-500 mb-6">
//             {type === 'colleges' ? 'find more opportunities' : 'CHOOSE FROM 5,000 ONLINE VIDEO COURSES WITH NEW ADDITIONS'}
//           </p>
//           <div className="h-[20px] w-full"></div>
//           {loading ? (
//             <p className="text-gray-500">Loading {type}...</p>
//           ) : error ? (
//             <p className="text-red-500">{error}</p>
//           ) : items.length === 0 ? (
//             <p className="text-gray-500">No {type} available.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {items.map((item) => (
//                 <div
//                   key={item.id}
//                   className="bg-white shadow-md rounded-[10px] w-full md:w-[400px] overflow-hidden hover:shadow-lg transition-shadow duration-300"
//                 >
//                   {type === 'colleges' ? (
//                     <>
//                       <img
//                         src={item.image_url}
//                         alt={`Image of ${item.name}`}
//                         className="w-full h-[200px] object-cover rounded-t-[10px]"
//                         loading="lazy"
//                       />
//                       <div className="p-8">
//                         <h3 className="text-xl font-bold text-[#1A3C61] mb-3">{item.name}</h3>
//                         <p className="text-gray-500 text-lg mb-3">{item.streams}</p>
//                         <p className="text-gray-500 text-lg">
//                           {item.reviews}{' '}
//                           <span className="text-yellow-500">{'★'.repeat(item.rating)}</span>
//                         </p>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div
//                         className="w-full md:w-[400px] h-[200px] rounded-t-[10px] bg-cover bg-center hover:scale-105 transition-transform duration-300"
//                         style={{
//                           backgroundImage: `url('${item.image_url}')`,
//                         }}
//                       />
//                       <div className="p-8">
//                         <h3 className="text-xl font-bold text-[#1A3C61] mt-4 mb-3">{item.name}</h3>
//                         <p className="text-gray-500 text-lg mb-3">{item.description}</p>
//                         <p className="text-gray-500 text-lg">
//                           <span className="text-yellow-500">
//                             {item.rating} {'★'.repeat(Math.floor(item.rating))}☆
//                           </span>{' '}
//                           ({item.reviews})
//                         </p>
//                         <h2 className="text-gray-500 text-lg mt-3"><strong>{item.price}</strong></h2>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>
//       </div>
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

// export default ViewDetails;










// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Header from './Header';
// import Footer from './Footer';

// const ViewDetails = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [showScrollTop, setShowScrollTop] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const { type, username } = location.state || {};

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//       setShowScrollTop(window.scrollY > 300);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let endpoint;
//         switch (type) {
//           case 'colleges':
//             endpoint = 'colleges';
//             break;
//           case 'courses':
//             endpoint = 'courses';
//             break;
//           case 'activities':
//             endpoint = 'activities';
//             break;
//           default:
//             throw new Error('Invalid section type');
//         }
        
//         const response = await axios.get(`http://localhost:5000/${endpoint}`);
//         setItems(response.data);
//       } catch (err) {
//         console.error(`Error fetching ${type}:`, err);
//         setError(`Failed to load ${type}. Please try again later.`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (type) {
//       fetchData();
//     } else {
//       setError('Invalid section type.');
//       setLoading(false);
//     }
//   }, [type]);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleFetchUserDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/user/${username}`);
//       console.log(response.data);
//     } catch (err) {
//       console.error('Error fetching user details:', err);
//     }
//   };

//   // Define the heading based on the type
//   const getHeading = () => {
//     switch (type) {
//       case 'colleges':
//         return 'Select your College <span className="text-gray-500">(University and Affiliated)</span>';
//       case 'courses':
//         return 'A Broad Selection Of Courses';
//       case 'activities':
//         return 'Student Activities <span className="text-gray-500">(Hackathons, Workshops, Internships)</span>';
//       default:
//         return '';
//     }
//   };

//   const getSubheading = () => {
//     switch (type) {
//       case 'colleges':
//         return 'Find more opportunities';
//       case 'courses':
//         return 'CHOOSE FROM 5,000 ONLINE VIDEO COURSES WITH NEW ADDITIONS';
//       case 'activities':
//         return 'Enhance your skills through practical experiences';
//       default:
//         return '';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
//       <Header
//         username={username}
//         onFetchUserDetails={handleFetchUserDetails}
//         isScrolled={isScrolled}
//       />
//       <div className="pt-[70px] flex-1">
//         <section className="px-10 py-6 mb-12">
//           <div className="flex flex-col md:flex-row items-center justify-between mb-6">
//             <div className="flex items-center space-x-4">
//               <span className="text-2xl">
//                 {type === 'colleges' ? '🏛️' : 
//                  type === 'courses' ? '📚' : '🎯'}
//               </span>
//               <h1
//                 className="text-2xl md:text-3xl font-bold text-[#1A3C61]"
//                 dangerouslySetInnerHTML={{ __html: getHeading() }}
//               />
//             </div>
//             <button
//               onClick={() => navigate('/dashboard', { state: { username } })}
//               className="bg-white border border-[#6B46C1] hover:text-white transition-colors duration-300 hover:bg-[#1A3C61] text-[#6B46C1] p-[10px] rounded-[5px] w-[120px] mt-4 md:mt-0"
//             >
//               Back to Dashboard ←
//             </button>
//           </div>
//           <p className="text-gray-500 mb-6">
//             {getSubheading()}
//           </p>
//           <div className="h-[20px] w-full"></div>
//           {loading ? (
//             <p className="text-gray-500">Loading {type}...</p>
//           ) : error ? (
//             <p className="text-red-500">{error}</p>
//           ) : items.length === 0 ? (
//             <p className="text-gray-500">No {type} available.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {items.map((item) => (
//                 <div
//                   key={item.id}
//                   className="bg-white shadow-md rounded-[10px] w-full md:w-[400px] overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
//                   onClick={() => {
//                     // Add navigation logic for activities if needed
//                     if (type === 'activities') {
//                       // navigate('/activity-details', { state: { ...item, username } });
//                     }
//                   }}
//                 >
//                   {type === 'colleges' ? (
//                     <>
//                       <img
//                         src={item.image_url}
//                         alt={`Image of ${item.name}`}
//                         className="w-full h-[200px] object-cover rounded-t-[10px]"
//                         loading="lazy"
//                       />
//                       <div className="p-8">
//                         <h3 className="text-xl font-bold text-[#1A3C61] mb-3">{item.name}</h3>
//                         <p className="text-gray-500 text-lg mb-3">{item.streams}</p>
//                         <p className="text-gray-500 text-lg">
//                           {item.reviews}{' '}
//                           <span className="text-yellow-500">{'★'.repeat(item.rating)}</span>
//                         </p>
//                       </div>
//                     </>
//                   ) : type === 'courses' ? (
//                     <>
//                       <div
//                         className="w-full md:w-[400px] h-[200px] rounded-t-[10px] bg-cover bg-center hover:scale-105 transition-transform duration-300"
//                         style={{
//                           backgroundImage: `url('${item.image_url}')`,
//                         }}
//                       />
//                       <div className="p-8">
//                         <h3 className="text-xl font-bold text-[#1A3C61] mt-4 mb-3">{item.name}</h3>
//                         <p className="text-gray-500 text-lg mb-3">{item.description}</p>
//                         <p className="text-gray-500 text-lg">
//                           <span className="text-yellow-500">
//                             {item.rating} {'★'.repeat(Math.floor(item.rating))}☆
//                           </span>{' '}
//                           ({item.reviews})
//                         </p>
//                         <h2 className="text-gray-500 text-lg mt-3"><strong>{item.price}</strong></h2>
//                       </div>
//                     </>
//                   ) : (
//                     // Activities Card UI
//                     <>
//                       <div className="relative">
//                         <img
//                           src={item.image_url || '/default-activity.jpg'}
//                           alt={`Image of ${item.name}`}
//                           className="w-full h-[200px] object-cover rounded-t-[10px]"
//                           loading="lazy"
//                         />
//                         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
//                           <span className="text-white font-medium bg-[#6B46C1] px-3 py-1 rounded-full text-sm">
//                             {item.category}
//                           </span>
//                         </div>
//                       </div>
//                       <div className="p-6">
//                         <h3 className="text-xl font-bold text-[#1A3C61] mb-2">{item.name}</h3>
//                         <p className="text-gray-500 text-sm mb-3 line-clamp-2">{item.description}</p>
//                         <div className="flex justify-between items-center mt-4">
//                           <div>
//                             <p className="text-gray-500 text-sm">
//                               <span className="font-medium">{item.participations}+</span> participants
//                             </p>
//                             <p className="text-gray-500 text-sm">
//                               Deadline: <span className="font-medium">{item.deadline_date || 'Ongoing'}</span>
//                             </p>
//                           </div>
//                           <button className="bg-[#6B46C1] hover:bg-[#1A3C61] text-white px-4 py-2 rounded-md text-sm transition-colors">
//                             View Details
//                           </button>
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>
//       </div>
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

// export default ViewDetails;













// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Header from './Header';
// import Footer from './Footer';

// const ViewDetails = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [showScrollTop, setShowScrollTop] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const { type, username } = location.state || {};

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//       setShowScrollTop(window.scrollY > 300);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let endpoint;
//         switch (type) {
//           case 'colleges':
//             endpoint = 'http://localhost:5000/colleges';
//             break;
//           case 'courses':
//             endpoint = 'http://localhost:5000/courses';
//             break;
//           case 'activities':
//             endpoint = 'http://localhost:5000/activities';
//             break;
//           default:
//             throw new Error('Invalid section type');
//         }

//         console.log('Fetching data from:', endpoint); // Debug log
//         const response = await axios.get(endpoint);
//         setItems(response.data);
//       } catch (err) {
//         console.error(`Error fetching ${type}:`, err);
//         setError(`Failed to load ${type}. Please try again later.`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (type) {
//       fetchData();
//     } else {
//       setError('Invalid section type.');
//       setLoading(false);
//     }
//   }, [type]);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleFetchUserDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/user/${username}`);
//       console.log('User details:', response.data);
//     } catch (err) {
//       console.error('Error fetching user details:', err);
//     }
//   };

//   const getHeading = () => {
//     switch (type) {
//       case 'colleges':
//         return 'Select your College <span class="text-gray-500">(University and Affiliated)</span>';
//       case 'courses':
//         return 'A Broad Selection Of Courses';
//       case 'activities':
//         return 'Student Activities';
//       default:
//         return 'Details';
//     }
//   };

//   const getSubheading = () => {
//     switch (type) {
//       case 'colleges':
//         return 'find more opportunities';
//       case 'courses':
//         return 'CHOOSE FROM 5,000 ONLINE VIDEO COURSES WITH NEW ADDITIONS';
//       case 'activities':
//         return 'Find more activities';
//       default:
//         return '';
//     }
//   };

//   const renderItem = (item) => {
//     switch (type) {
//       case 'colleges':
//         return (
//           <>
//             <img
//               src={item.image_url}
//               alt={`Image of ${item.name}`}
//               className="w-full h-[200px] object-cover rounded-t-[10px]"
//               loading="lazy"
//             />
//             <div className="p-8">
//               <h3 className="text-xl font-bold text-[#1A3C61] mb-3">{item.name}</h3>
//               <p className="text-gray-500 text-lg mb-3">{item.streams}</p>
//               <p className="text-gray-500 text-lg">
//                 {item.reviews} <span className="text-yellow-500">{'★'.repeat(item.rating)}</span>
//               </p>
//             </div>
//           </>
//         );
//       case 'courses':
//         return (
//           <>
//             <div
//               className="w-full h-[200px] rounded-t-[10px] bg-cover bg-center"
//               style={{ backgroundImage: `url('${item.image_url}')` }}
//             />
//             <div className="p-8">
//               <h3 className="text-xl font-bold text-[#1A3C61] mt-4 mb-3">{item.name}</h3>
//               <p className="text-gray-500 text-lg mb-3">{item.description}</p>
//               <p className="text-gray-500 text-lg">
//                 <span className="text-yellow-500">
//                   {item.rating} {'★'.repeat(Math.floor(item.rating))}☆
//                 </span> ({item.reviews})
//               </p>
//               <h2 className="text-gray-500 text-lg mt-3"><strong>{item.price}</strong></h2>
//             </div>
//           </>
//         );
//       case 'activities':
//         return (
//           <>
//             <img
//               src={item.image_url}
//               alt={`Image of ${item.name}`}
//               className="w-full h-[200px] object-cover rounded-t-[10px]"
//               loading="lazy"
//             />
//             <div className="p-8">
//               <h3 className="text-xl font-bold text-[#1A3C61] mb-3">{item.name}</h3>
//               <p className="text-gray-500 text-lg mb-3">{item.description}</p>
//               <p className="text-gray-500 text-lg">
//                 Date: {new Date(item.date).toLocaleDateString()}
//               </p>
//               <p className="text-gray-500 text-lg">
//                 Participants: {item.participants}
//               </p>
//             </div>
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
//       <Header
//         username={username}
//         onFetchUserDetails={handleFetchUserDetails}
//         isScrolled={isScrolled}
//       />
//       <div className="pt-[70px] flex-1">
//         <section className="px-10 py-6 mb-12">
//           <div className="flex flex-col md:flex-row items-center justify-between mb-6">
//             <div className="flex items-center space-x-4">
//               <span className="text-2xl">🖥️</span>
//               <h1
//                 className="text-2xl md:text-3xl font-bold text-[#1A3C61]"
//                 dangerouslySetInnerHTML={{ __html: getHeading() }}
//               />
//             </div>
//             <button
//               onClick={() => navigate('/dashboard', { state: { username } })}
//               className="bg-white border border-[#6B46C1] hover:text-white transition-colors duration-300 hover:bg-[#1A3C61] text-[#6B46C1] p-[10px] rounded-[5px] w-[120px] mt-4 md:mt-0"
//             >
//               Back to Dashboard ←
//             </button>
//           </div>
//           <p className="text-gray-500 mb-6">{getSubheading()}</p>
//           <div className="h-[20px] w-full"></div>
//           {loading ? (
//             <p className="text-gray-500">Loading {type}...</p>
//           ) : error ? (
//             <p className="text-red-500">{error}</p>
//           ) : items.length === 0 ? (
//             <p className="text-gray-500">No {type} available.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {items.map((item) => (
//                 <div
//                   key={item.id}
//                   className="bg-white shadow-md rounded-[10px] overflow-hidden hover:shadow-lg transition-shadow duration-300"
//                 >
//                   {renderItem(item)}
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>
//       </div>
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

// export default ViewDetails;





import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const ViewDetails = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  
  // Safely extract and validate navigation state
  const navigationState = location.state || {};
  const type = navigationState.type;
  const username = navigationState.username;

  // Debugging
  console.log('Navigation state received:', navigationState);
  console.log('Type validation:', typeof type, 'Value:', type);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Validate navigation state
        if (!type || typeof type !== 'string') {
          throw new Error('MISSING_TYPE');
        }

        const validTypes = ['colleges', 'courses', 'activities'];
        if (!validTypes.includes(type)) {
          throw new Error('INVALID_TYPE');
        }

        console.log(`Fetching data for: ${type}`);
        const response = await axios.get(`http://localhost:5000/${type}`);
        
        if (!response.data) {
          throw new Error('EMPTY_RESPONSE');
        }

        setItems(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (err) {
        console.error('Fetch error:', err);
        
        // User-friendly error messages
        switch (err.message) {
          case 'MISSING_TYPE':
            setError('Please access this content through the dashboard navigation');
            break;
          case 'INVALID_TYPE':
            setError('This content type is not available');
            break;
          case 'EMPTY_RESPONSE':
            setError('No data available for this section');
            break;
          default:
            setError('Failed to load content. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard', { state: { username } });
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6B46C1]"></div>
          <span className="ml-3">Loading content...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-red-800">Error loading content</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <button
                onClick={handleBackToDashboard}
                className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#6B46C1] hover:bg-[#1A3C61]"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-blue-700">No content available in this section</p>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id || item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                }}
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-bold text-[#1A3C61]">{item.name}</h3>
              {item.description && <p className="text-gray-600 mt-2">{item.description}</p>}
              {item.streams && <p className="text-gray-600 mt-2">{item.streams}</p>}
              {item.rating && (
                <div className="mt-2 flex items-center">
                  <span className="text-yellow-500">
                    {'★'.repeat(Math.floor(item.rating))}
                    {item.rating % 1 > 0 ? '☆' : ''}
                  </span>
                  {item.reviews && <span className="text-gray-500 ml-1">({item.reviews})</span>}
                </div>
              )}
              {item.price && <p className="text-gray-800 font-medium mt-2">${item.price}</p>}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      <Header
        username={username}
        onFetchUserDetails={() => console.log('Fetch user')}
        isScrolled={isScrolled}
      />

      <main className="flex-grow pt-16 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-[#1A3C61]">
              {type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Content'}
            </h1>
            <button
              onClick={handleBackToDashboard}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#6B46C1] hover:bg-[#1A3C61]"
            >
              Back to Dashboard
            </button>
          </div>

          {renderContent()}
        </div>
      </main>

      <Footer />

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#6B46C1] text-white p-3 rounded-full shadow-lg hover:bg-[#1A3C61] focus:outline-none"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default ViewDetails;