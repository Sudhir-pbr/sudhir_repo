




// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Header = ({ isAuthenticated, user, onFetchUserDetails, onLogout, isScrolled }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [activeSubmenu, setActiveSubmenu] = useState(null);

//   const handleMouseEnter = () => setIsDropdownOpen(true);
//   const handleMouseLeave = () => {
//     setIsDropdownOpen(false);
//     setActiveSubmenu(null);
//   };

//   const handleSubmenuToggle = (index) => {
//     setActiveSubmenu(activeSubmenu === index ? null : index);
//   };

//   return (
//     <nav
//       className={`fixed top-0 h-[60px] w-full shadow-md p-[15px] flex items-center justify-between z-20 transition-all duration-300 ${
//         isScrolled ? 'bg-[#030060] shadow-lg' : 'bg-[#fdfaf5]'
//       }`}
//     >
//       <div className="flex items-center space-x-6">
//         <div className="text-2xl font-bold">
//           <img src="https://campustocareer.tech/uploads/setting/1737912027-57XbFeEPxz.png" alt="Logo" />
//         </div>
        
//         <div 
//           className="relative"
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           <button
//             className={`border rounded-[5px] p-[5px] w-[100px] bg-transparent transition-colors duration-300 ${
//               isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//             }`}
//           >
//             Courses
//           </button>

//           {isDropdownOpen && (
//             <div className={`absolute top-full left-0 mt-2 w-[250px] rounded-[5px] shadow-md ${
//               isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
//             }`}>
//               <div className="py-2">
//                 {/* Development */}
//                 <div className="relative">
//                   <a
//                     className={`block px-4 py-2 transition-colors duration-300 ${
//                       isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                     }`}
//                     onMouseEnter={() => handleSubmenuToggle(1)}
//                   >
//                     Development
//                   </a>
//                   {activeSubmenu === 1 && (
//                     <div className={`absolute left-full top-0 w-[250px] rounded-[5px] shadow-md ${
//                       isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
//                     }`}>
//                       <a className={`block px-4 py-2 ${
//                         isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                       }`}>Web Development</a>
//                       <a className={`block px-4 py-2 ${
//                         isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                       }`}>Data Science</a>
//                       <a className={`block px-4 py-2 ${
//                         isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                       }`}>Mobile Development</a>
//                       <a className={`block px-4 py-2 ${
//                         isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                       }`}>Programming Language</a>
//                       <a className={`block px-4 py-2 ${
//                         isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                       }`}>Game Development</a>
//                     </div>
//                   )}
//                 </div>

//                 {/* IT & Software */}
//                 <div className="relative">
//                   <a
//                     className={`block px-4 py-2 transition-colors duration-300 ${
//                       isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                     }`}
//                     onMouseEnter={() => handleSubmenuToggle(2)}
//                   >
//                     IT & Software
//                   </a>
//                   {activeSubmenu === 2 && (
//                     <div className={`absolute left-full top-0 w-[250px] rounded-[5px] shadow-md ${
//                       isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
//                     }`}>
//                       <a className={`block px-4 py-2 ${
//                         isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                       }`}>IT Certifications</a>
//                       <a className={`block px-4 py-2 ${
//                         isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                       }`}>Network & Security</a>
//                       <a className={`block px-4 py-2 ${
//                         isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                       }`}>Hardware</a>
//                       <a className={`block px-4 py-2 ${
//                         isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                       }`}>Operating System & Servers</a>
//                     </div>
//                   )}
//                 </div>

//                 {/* Office Productivity */}
//                 <div className="relative">
//                   <a
//                     className={`block px-4 py-2 transition-colors duration-300 ${
//                       isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                     }`}
//                     onMouseEnter={() => handleSubmenuToggle(3)}
//                   >
//                     Office Productivity
//                   </a>
//                   {activeSubmenu === 3 && (
//                     <div className={`absolute left-full top-0 w-[250px] rounded-[5px] shadow-md ${
//                       isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
//                     }`}>
//                       <a className={`block px-4 py-2 ${
//                         isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                       }`}>Microsoft</a>
//                       <a className={`block px-4 py-2 ${
//                         isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                       }`}>Apple</a>
//                       <a className={`block px-4 py-2 ${
//                         isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                       }`}>Google</a>
//                     </div>
//                   )}
//                 </div>

//                 {/* Personal Development */}
//                 <div className="relative">
//                   <a
//                     className={`block px-4 py-2 transition-colors duration-300 ${
//                       isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                     }`}
//                     onMouseEnter={() => handleSubmenuToggle(4)}
//                   >
//                     Personal Development
//                   </a>
//                   {activeSubmenu === 4 && (
//                     <div className={`absolute left-full top-0 w-[250px] rounded-[5px] shadow-md ${
//                       isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
//                     }`}>
//                       <a className={`block px-4 py-2 ${
//                         isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                       }`}>Career Development</a>
//                       <a className={`block px-4 py-2 ${
//                         isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                       }`}>Creativity</a>
//                     </div>
//                   )}
//                 </div>

//                 {/* Business */}
//                 <div className="relative">
//                   <a
//                     className={`block px-4 py-2 transition-colors duration-300 ${
//                       isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                     }`}
//                     onMouseEnter={() => handleSubmenuToggle(5)}
//                   >
//                     Business
//                   </a>
//                   {activeSubmenu === 5 && (
//                     <div className={`absolute left-full top-0 w-[250px] rounded-[5px] shadow-md ${
//                       isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
//                     }`}>
//                       <a className={`block px-4 py-2 ${
//                         isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                       }`}>Communication</a>
//                       <a className={`block px-4 py-2 ${
//                         isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                       }`}>Management</a>
//                       <a className={`block px-4 py-2 ${
//                         isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                       }`}>Sales</a>
//                     </div>
//                   )}
//                 </div>

//                 {/* Marketing */}
//                 <a
//                   className={`block px-4 py-2 transition-colors duration-300 ${
//                     isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                   }`}
//                 >
//                   Marketing
//                 </a>

//                 {/* Design */}
//                 <div className="relative">
//                   <a
//                     className={`block px-4 py-2 transition-colors duration-300 ${
//                       isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                     }`}
//                     onMouseEnter={() => handleSubmenuToggle(6)}
//                   >
//                     Design
//                   </a>
//                   {activeSubmenu === 6 && (
//                     <div className={`absolute left-full top-0 w-[250px] rounded-[5px] shadow-md ${
//                       isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
//                     }`}>
//                       <a className={`block px-4 py-2 ${
//                         isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                       }`}>Web Design</a>
//                       <a className={`block px-4 py-2 ${
//                         isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                       }`}>Graphic Design</a>
//                       <a className={`block px-4 py-2 ${
//                         isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                       }`}>Game Design</a>
//                       <a className={`block px-4 py-2 ${
//                         isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                       }`}>Fashion Design</a>
//                       <a className={`block px-4 py-2 ${
//                         isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                       }`}>User Experience Design</a>
//                     </div>
//                   )}
//                 </div>

//                 {/* Health & Fitness */}
//                 <a
//                   className={`block px-4 py-2 transition-colors duration-300 ${
//                     isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                   }`}
//                 >
//                   Health & Fitness
//                 </a>

//                 {/* Finance & Accounting */}
//                 <a
//                   className={`block px-4 py-2 transition-colors duration-300 ${
//                     isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                   }`}
//                 >
//                   Finance & Accounting
//                 </a>

//                 <hr className={`my-2 ${isScrolled ? 'border-white' : 'border-[#333]'}`} />

//                 {/* All Courses */}
//                 <a
//                   className={`block px-4 py-2 transition-colors duration-300 ${
//                     isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                   }`}
//                 >
//                   All Courses
//                 </a>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search Course..."
//             className={`border rounded-[5px] p-[8px] w-[250px] pl-10 bg-transparent placeholder-opacity-100 transition-colors duration-300 ${
//               isScrolled ? 'text-white placeholder-white' : 'text-[#333] placeholder-[#333]'
//             }`}
//           />
//           <span
//             className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
//               isScrolled ? 'text-white' : 'text-[#333]'
//             }`}
//           >
//             🔍
//           </span>
//         </div>
//       </div>

//       <div className="flex items-center space-x-4 ml-10">
//         <a
//           className={`transition-colors duration-300 ${
//             isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//           }`}
//         >
//           Pages
//         </a>
//         <a
//           className={`transition-colors duration-300 ${
//             isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//           }`}
//         >
//           Forum
//         </a>
//         <a
//           className={`transition-colors duration-300 ${
//             isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//           }`}
//         >
//           Blog
//         </a>
//         <a
//           className={`transition-colors duration-300 ${
//             isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//           }`}
//         >
//           Contact
//         </a>
//         <div className="relative">
//           <span
//             className={`transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-[#333]'}`}
//           >
//             🔔
//           </span>
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//             0
//           </span>
//         </div>

//         {isAuthenticated ? (
//           <button
//             onClick={onFetchUserDetails}
//             className="user-button bg-[#6B46C1] text-white p-[5px] rounded-[5px] w-[80px] hover:bg-white hover:text-[#6B46C1] transition-colors duration-300"
//           >
//             User
//           </button>
//         ) : (
//           <>
//             <Link
//               to="/login"
//               className={`transition-colors duration-300 ${
//                 isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//               }`}
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="bg-[#6B46C1] text-white p-[5px] rounded-[5px] w-[80px] hover:bg-white hover:text-[#6B46C1] transition-colors duration-300"
//             >
//               Sign Up
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Header;














// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Header = ({ user, onFetchUserDetails, onLogout, isScrolled }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [activeSubmenu, setActiveSubmenu] = useState(null);
//   const navigate = useNavigate();

//   const handleMouseEnter = () => setIsDropdownOpen(true);
//   const handleMouseLeave = () => {
//     setIsDropdownOpen(false);
//     setActiveSubmenu(null);
//   };

//   const handleSubmenuToggle = (index) => {
//     setActiveSubmenu(activeSubmenu === index ? null : index);
//   };

//   const handleFetchUserDetails = async () => {
//     if (!user) return;

//     try {
//       const response = await axios.get('http://localhost:5000/profile', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       onFetchUserDetails(response.data.data); // Trigger dropdown in Dashboard
//     } catch (err) {
//       console.error('Error fetching user details:', err.response || err.message);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Clear token
//     onLogout(); // Update App.jsx state
//     navigate('/login'); // Navigate to login page
//   };

//   return (
//     <nav
//       className={`fixed top-0 h-[60px] w-full shadow-md p-[15px] flex items-center justify-between z-20 transition-all duration-300 ${
//         isScrolled ? 'bg-[#030060] shadow-lg' : 'bg-[#fdfaf5]'
//       }`}
//     >
//       <div className="flex items-center space-x-6">
//         <div className="text-2xl font-bold">
//           <img src="https://campustocareer.tech/uploads/setting/1737912027-57XbFeEPxz.png" alt="Logo" />
//         </div>
        
//         <div 
//           className="relative"
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           <button
//             className={`border rounded-[5px] p-[5px] w-[100px] bg-transparent transition-colors duration-300 ${
//               isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//             }`}
//           >
//             Courses
//           </button>

//           {isDropdownOpen && (
//             <div className={`absolute top-full left-0 mt-2 w-[250px] rounded-[5px] shadow-md ${
//               isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
//             }`}>
//               <div className="py-2">
//                 <div className="relative">
//                   <a
//                     className={`block px-4 py-2 transition-colors duration-300 ${
//                       isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                     }`}
//                     onMouseEnter={() => handleSubmenuToggle(1)}
//                   >
//                     Development
//                   </a>
//                   {activeSubmenu === 1 && (
//                     <div className={`absolute left-full top-0 w-[250px] rounded-[5px] shadow-md ${
//                       isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
//                     }`}>
//                       <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Web Development</a>
//                       <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Data Science</a>
//                       <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Mobile Development</a>
//                       <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Programming Language</a>
//                       <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Game Development</a>
//                     </div>
//                   )}
//                 </div>
//                 <a className={`block px-4 py-2 transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Marketing</a>
//                 <a className={`block px-4 py-2 transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Health & Fitness</a>
//                 <a className={`block px-4 py-2 transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Finance & Accounting</a>
//                 <hr className={`my-2 ${isScrolled ? 'border-white' : 'border-[#333]'}`} />
//                 <a className={`block px-4 py-2 transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>All Courses</a>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search Course..."
//             className={`border rounded-[5px] p-[8px] w-[250px] pl-10 bg-transparent placeholder-opacity-100 transition-colors duration-300 ${
//               isScrolled ? 'text-white placeholder-white' : 'text-[#333] placeholder-[#333]'
//             }`}
//           />
//           <span
//             className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
//               isScrolled ? 'text-white' : 'text-[#333]'
//             }`}
//           >
//             🔍
//           </span>
//         </div>
//       </div>

//       <div className="flex items-center space-x-4 ml-10">
//         <a className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Pages</a>
//         <a className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Forum</a>
//         <a className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Blog</a>
//         <a className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Contact</a>
//         <div className="relative">
//           <span className={`transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-[#333]'}`}>🔔</span>
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
//         </div>

//         {user ? (
//           <button
//             onClick={handleFetchUserDetails}
//             className="user-button bg-[#6B46C1] text-white p-[5px] rounded-[5px] w-[80px] hover:bg-white hover:text-[#6B46C1] transition-colors duration-300"
//           >
//             User
//           </button>
//         ) : (
//           <>
//             <Link to="/login" className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Login</Link>
//             <Link to="/register" className="bg-[#6B46C1] text-white p-[5px] rounded-[5px] w-[80px] hover:bg-white hover:text-[#6B46C1] transition-colors duration-300">Sign Up</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Header;















// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Header = ({ user, onFetchUserDetails, onLogout, isScrolled }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [activeSubmenu, setActiveSubmenu] = useState(null);
//   const navigate = useNavigate();

//   const handleMouseEnter = () => setIsDropdownOpen(true);
//   const handleMouseLeave = () => {
//     setIsDropdownOpen(false);
//     setActiveSubmenu(null);
//   };

//   const handleSubmenuToggle = (index) => {
//     setActiveSubmenu(activeSubmenu === index ? null : index);
//   };

//   const handleFetchUserDetails = async () => {
//     if (!user) return;

//     try {
//       const response = await axios.get('http://localhost:5000/profile'); // Removed Authorization header
//       onFetchUserDetails(response.data.data);
//     } catch (err) {
//       console.error('Error fetching user details:', err.response || err.message);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     onLogout();
//     navigate('/');
//   };

//   return (
//     <nav
//       className={`fixed top-0 h-[60px] w-full shadow-md p-[15px] flex items-center justify-between z-20 transition-all duration-300 ${
//         isScrolled ? 'bg-[#030060] shadow-lg' : 'bg-[#fdfaf5]'
//       }`}
//     >
//       <div className="flex items-center space-x-6">
//         <div className="text-2xl font-bold">
//           <img src="https://campustocareer.tech/uploads/setting/1737912027-57XbFeEPxz.png" alt="Logo" />
//         </div>
        
//         <div 
//           className="relative"
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           <button
//             className={`border rounded-[5px] p-[5px] w-[100px] bg-transparent transition-colors duration-300 ${
//               isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//             }`}
//           >
//             Courses
//           </button>

//           {isDropdownOpen && (
//             <div className={`absolute top-full left-0 mt-2 w-[250px] rounded-[5px] shadow-md ${
//               isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
//             }`}>
//               <div className="py-2">
//                 <div className="relative">
//                   <a
//                     className={`block px-4 py-2 transition-colors duration-300 ${
//                       isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                     }`}
//                     onMouseEnter={() => handleSubmenuToggle(1)}
//                   >
//                     Development
//                   </a>
//                   {activeSubmenu === 1 && (
//                     <div className={`absolute left-full top-0 w-[250px] rounded-[5px] shadow-md ${
//                       isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
//                     }`}>
//                       <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Web Development</a>
//                       <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Data Science</a>
//                       <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Mobile Development</a>
//                       <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Programming Language</a>
//                       <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Game Development</a>
//                     </div>
//                   )}
//                 </div>
//                 <a className={`block px-4 py-2 transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Marketing</a>
//                 <a className={`block px-4 py-2 transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Health & Fitness</a>
//                 <a className={`block px-4 py-2 transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Finance & Accounting</a>
//                 <hr className={`my-2 ${isScrolled ? 'border-white' : 'border-[#333]'}`} />
//                 <a className={`block px-4 py-2 transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>All Courses</a>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search Course..."
//             className={`border rounded-[5px] p-[8px] w-[250px] pl-10 bg-transparent placeholder-opacity-100 transition-colors duration-300 ${
//               isScrolled ? 'text-white placeholder-white' : 'text-[#333] placeholder-[#333]'
//             }`}
//           />
//           <span
//             className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
//               isScrolled ? 'text-white' : 'text-[#333]'
//             }`}
//           >
//             🔍
//           </span>
//         </div>
//       </div>

//       <div className="flex items-center space-x-4 ml-10">
//         <a className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Pages</a>
//         <a className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Forum</a>
//         <a className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Blog</a>
//         <a className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Contact</a>
//         <div className="relative">
//           <span className={`transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-[#333]'}`}>🔔</span>
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
//         </div>

//         {user ? (
//           <button
//             onClick={handleFetchUserDetails}
//             className="user-button bg-[#6B46C1] text-white p-[5px] rounded-[5px] w-[80px] hover:bg-white hover:text-[#6B46C1] transition-colors duration-300"
//           >
//             User
//           </button>
//         ) : (
//           <>
//             <Link to="/" className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Login</Link>
//             <Link to="/register" className="bg-[#6B46C1] text-white p-[5px] rounded-[5px] w-[80px] hover:bg-white hover:text-[#6B46C1] transition-colors duration-300">Sign Up</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Header;

















// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Header = ({ user, onFetchUserDetails, onLogout, isScrolled }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [activeSubmenu, setActiveSubmenu] = useState(null);
//   const [userDetails, setUserDetails] = useState(null);
//   const navigate = useNavigate();

//   const handleMouseEnter = () => setIsDropdownOpen(true);
//   const handleMouseLeave = () => {
//     setIsDropdownOpen(false);
//     setActiveSubmenu(null);
//   };

//   const handleSubmenuToggle = (index) => {
//     setActiveSubmenu(activeSubmenu === index ? null : index);
//   };

//   const handleProfileDropdownToggle = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   const handleFetchUserDetails = async () => {
//     if (!user) return;

//     try {
//       let endpoint = '';
//       // Determine the endpoint based on user type
//       switch(user.type) {
//         case 'student':
//           endpoint = 'http://localhost:5000/student/profile';
//           break;
//         case 'mnc':
//           endpoint = 'http://localhost:5000/mnc/profile';
//           break;
//         case 'college':
//           endpoint = 'http://localhost:5000/college/profile';
//           break;
//         default:
//           return;
//       }

//       const response = await axios.get(endpoint);
//       setUserDetails(response.data.data);
//       onFetchUserDetails(response.data.data);
//     } catch (err) {
//       console.error('Error fetching user details:', err.response || err.message);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     onLogout();
//     navigate('/');
//   };

//   // Get user type display name
//   const getUserTypeDisplay = () => {
//     switch(user?.type) {
//       case 'student':
//         return 'Student';
//       case 'mnc':
//         return 'MNC';
//       case 'college':
//         return 'College';
//       default:
//         return 'User';
//     }
//   };

//   return (
//     <nav
//       className={`fixed top-0 h-[60px] w-full shadow-md p-[15px] flex items-center justify-between z-20 transition-all duration-300 ${
//         isScrolled ? 'bg-[#030060] shadow-lg' : 'bg-[#fdfaf5]'
//       }`}
//     >
//       <div className="flex items-center space-x-6">
//         <div className="text-2xl font-bold">
//           <img src="https://campustocareer.tech/uploads/setting/1737912027-57XbFeEPxz.png" alt="Logo" />
//         </div>
        
//         <div 
//           className="relative"
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           <button
//             className={`border rounded-[5px] p-[5px] w-[100px] bg-transparent transition-colors duration-300 ${
//               isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//             }`}
//           >
//             Courses
//           </button>

//           {isDropdownOpen && (
//             <div className={`absolute top-full left-0 mt-2 w-[250px] rounded-[5px] shadow-md ${
//               isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
//             }`}>
//               <div className="py-2">
//                 <div className="relative">
//                   <a
//                     className={`block px-4 py-2 transition-colors duration-300 ${
//                       isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                     }`}
//                     onMouseEnter={() => handleSubmenuToggle(1)}
//                   >
//                     Development
//                   </a>
//                   {activeSubmenu === 1 && (
//                     <div className={`absolute left-full top-0 w-[250px] rounded-[5px] shadow-md ${
//                       isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
//                     }`}>
//                       <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Web Development</a>
//                       <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Data Science</a>
//                       <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Mobile Development</a>
//                       <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Programming Language</a>
//                       <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Game Development</a>
//                     </div>
//                   )}
//                 </div>
//                 <a className={`block px-4 py-2 transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Marketing</a>
//                 <a className={`block px-4 py-2 transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Health & Fitness</a>
//                 <a className={`block px-4 py-2 transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Finance & Accounting</a>
//                 <hr className={`my-2 ${isScrolled ? 'border-white' : 'border-[#333]'}`} />
//                 <a className={`block px-4 py-2 transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>All Courses</a>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search Course..."
//             className={`border rounded-[5px] p-[8px] w-[250px] pl-10 bg-transparent placeholder-opacity-100 transition-colors duration-300 ${
//               isScrolled ? 'text-white placeholder-white' : 'text-[#333] placeholder-[#333]'
//             }`}
//           />
//           <span
//             className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
//               isScrolled ? 'text-white' : 'text-[#333]'
//             }`}
//           >
//             🔍
//           </span>
//         </div>
//       </div>

//       <div className="flex items-center space-x-4 ml-10">
//         <a className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Pages</a>
//         <a className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Forum</a>
//         <a className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Blog</a>
//         <a className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Contact</a>
//         <div className="relative">
//           <span className={`transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-[#333]'}`}>🔔</span>
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
//         </div>

//         {user ? (
//           <div className="relative">
//             <button
//               onClick={() => {
//                 handleFetchUserDetails();
//                 handleProfileDropdownToggle();
//               }}
//               className="user-button bg-[#6B46C1] text-white p-[5px] rounded-[5px] w-[100px] hover:bg-white hover:text-[#6B46C1] transition-colors duration-300"
//             >
//               {getUserTypeDisplay()}
//             </button>
            
//             {isProfileDropdownOpen && userDetails && (
//               <div className={`absolute right-0 mt-2 w-64 rounded-md shadow-lg py-1 z-30 ${
//                 isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
//               }`}>
//                 <div className="px-4 py-2">
//                   <p className={`text-sm font-medium ${isScrolled ? 'text-white' : 'text-gray-900'}`}>
//                     {userDetails.username || userDetails.name}
//                   </p>
//                   <p className={`text-xs ${isScrolled ? 'text-gray-300' : 'text-gray-500'}`}>
//                     {userDetails.email}
//                   </p>
//                   {userDetails.phone_number && (
//                     <p className={`text-xs ${isScrolled ? 'text-gray-300' : 'text-gray-500'}`}>
//                       Phone: {userDetails.phone_number}
//                     </p>
//                   )}
//                 </div>
//                 <div className="border-t border-gray-200"></div>
//                 <button
//                   onClick={handleLogout}
//                   className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <>
//             <Link to="/" className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Login</Link>
//             <Link to="/register" className="bg-[#6B46C1] text-white p-[5px] rounded-[5px] w-[80px] hover:bg-white hover:text-[#6B46C1] transition-colors duration-300">Sign Up</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Header;

















// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Header = ({ user, onLogout, isScrolled }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [activeSubmenu, setActiveSubmenu] = useState(null);
//   const [userDetails, setUserDetails] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleMouseEnter = () => setIsDropdownOpen(true);
//   const handleMouseLeave = () => {
//     setIsDropdownOpen(false);
//     setActiveSubmenu(null);
//   };

//   const handleSubmenuToggle = (index) => {
//     setActiveSubmenu(activeSubmenu === index ? null : index);
//   };

//   useEffect(() => {
//     if (isProfileDropdownOpen && user && !userDetails && !loading) {
//       fetchUserDetails();
//     }
//   }, [isProfileDropdownOpen]);

//   const fetchUserDetails = async () => {
//     setLoading(true);
//     try {
//       // const response = await axios.get('http://localhost:5000/profile', {
//       //   headers: {
//       //     Authorization: `Bearer ${localStorage.getItem('token')}`
//       //   }
//       // });
//       const response = await axios.get(`http://localhost:5000/profile/${user.type}/${user.id}`);
//       const details = response.data.data;
//       let formattedDetails = {
//         name: details.name || details.username,
//         email: details.email,
//         phone_number: details.phone_number
//       };

//       if (user.type === 'college') {
//         formattedDetails = {
//           ...formattedDetails,
//           address: details.address,
//           contact_person: details.contact_person,
//           contact_position: details.contact_position
//         };
//       } else if (user.type === 'mnc') {
//         formattedDetails = {
//           ...formattedDetails,
//           company_name: details.name,
//           industry: details.industry,
//           contact_person: details.contact_person,
//           contact_position: details.contact_position
//         };
//       }

//       setUserDetails(formattedDetails);
//     } catch (err) {
//       console.error('Error fetching user details:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     // localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     onLogout();
//     navigate('/login');
//   };

//   const getUserTypeColor = () => {
//     switch(user?.type) {
//       case 'student': return 'bg-blue-600';
//       case 'college': return 'bg-green-600';
//       case 'mnc': return 'bg-purple-600';
//       case 'admin': return 'bg-red-600';
//       default: return 'bg-[#6B46C1]';
//     }
//   };

//   const getUserTypeDisplay = () => {
//     switch(user?.type) {
//       case 'student': return 'Student';
//       case 'college': return 'College';
//       case 'mnc': return 'MNC';
//       case 'admin': return 'Admin';
//       default: return 'User';
//     }
//   };

//   return (
//     <nav className={`fixed top-0 h-[60px] w-full shadow-md p-[15px] flex items-center justify-between z-20 transition-all duration-300 ${
//       isScrolled ? 'bg-[#030060] shadow-lg' : 'bg-[#fdfaf5]'
//     }`}>
//       <div className="flex items-center space-x-6">
//         <div className="text-2xl font-bold">
//           <img src="https://campustocareer.tech/uploads/setting/1737912027-57XbFeEPxz.png" alt="Logo" />
//         </div>
        
//         <div 
//           className="relative"
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           <button
//             className={`border rounded-[5px] p-[5px] w-[100px] bg-transparent transition-colors duration-300 ${
//               isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//             }`}
//           >
//             Courses
//           </button>

//           {isDropdownOpen && (
//             <div className={`absolute top-full left-0 mt-2 w-[250px] rounded-[5px] shadow-md ${
//               isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
//             }`}>
//               <div className="py-2">
//                 <div className="relative">
//                   <a
//                     className={`block px-4 py-2 transition-colors duration-300 ${
//                       isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
//                     }`}
//                     onMouseEnter={() => handleSubmenuToggle(1)}
//                   >
//                     Development
//                   </a>
//                   {activeSubmenu === 1 && (
//                     <div className={`absolute left-full top-0 w-[250px] rounded-[5px] shadow-md ${
//                       isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
//                     }`}>
//                       <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Web Development</a>
//                       <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Data Science</a>
//                       <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Mobile Development</a>
//                       <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Programming Language</a>
//                       <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Game Development</a>
//                     </div>
//                   )}
//                 </div>
//                 <a className={`block px-4 py-2 transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Marketing</a>
//                 <a className={`block px-4 py-2 transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Health & Fitness</a>
//                 <a className={`block px-4 py-2 transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Finance & Accounting</a>
//                 <hr className={`my-2 ${isScrolled ? 'border-white' : 'border-[#333]'}`} />
//                 <a className={`block px-4 py-2 transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>All Courses</a>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search Course..."
//             className={`border rounded-[5px] p-[8px] w-[250px] pl-10 bg-transparent placeholder-opacity-100 transition-colors duration-300 ${
//               isScrolled ? 'text-white placeholder-white' : 'text-[#333] placeholder-[#333]'
//             }`}
//           />
//           <span
//             className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
//               isScrolled ? 'text-white' : 'text-[#333]'
//             }`}
//           >
//             🔍
//           </span>
//         </div>
//       </div>

//       <div className="flex items-center space-x-4 ml-10">
//         <a className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Pages</a>
//         <a className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Forum</a>
//         <a className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Blog</a>
//         <a className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Contact</a>
//         <div className="relative">
//           <span className={`transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-[#333]'}`}>🔔</span>
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
//         </div>

//         {user ? (
//           <div className="relative">
//             <button
//               onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
//               className={`text-white p-2 px-4 rounded hover:bg-white transition-colors duration-300 ${getUserTypeColor()} hover:text-[#6B46C1]`}
//             >
//               {getUserTypeDisplay()}
//             </button>
            
//             {isProfileDropdownOpen && (
//               <div className={`absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 z-30 ${
//                 isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
//               }`}>
//                 {loading ? (
//                   <div className="px-4 py-3">
//                     <p className={`text-sm ${isScrolled ? 'text-gray-300' : 'text-gray-500'}`}>
//                       Loading user details...
//                     </p>
//                   </div>
//                 ) : userDetails ? (
//                   <>
//                     <div className="px-4 py-3 space-y-2">
//                       <p className={`text-lg font-bold ${isScrolled ? 'text-white' : 'text-gray-900'}`}>
//                         {userDetails.name}
//                       </p>
//                       <p className={`text-sm ${isScrolled ? 'text-gray-300' : 'text-gray-600'}`}>
//                         <span className="font-medium">Email:</span> {userDetails.email}
//                       </p>
//                       {userDetails.phone_number && (
//                         <p className={`text-sm ${isScrolled ? 'text-gray-300' : 'text-gray-600'}`}>
//                           <span className="font-medium">Phone:</span> {userDetails.phone_number}
//                         </p>
//                       )}
                      
//                       {user.type === 'college' && (
//                         <>
//                           {userDetails.address && (
//                             <p className={`text-sm ${isScrolled ? 'text-gray-300' : 'text-gray-600'}`}>
//                               <span className="font-medium">Address:</span> {userDetails.address}
//                             </p>
//                           )}
//                           {userDetails.contact_person && (
//                             <p className={`text-sm ${isScrolled ? 'text-gray-300' : 'text-gray-600'}`}>
//                               <span className="font-medium">Contact:</span> {userDetails.contact_person} ({userDetails.contact_position})
//                             </p>
//                           )}
//                         </>
//                       )}
                      
//                       {user.type === 'mnc' && (
//                         <>
//                           {userDetails.company_name && (
//                             <p className={`text-sm ${isScrolled ? 'text-gray-300' : 'text-gray-600'}`}>
//                               <span className="font-medium">Company:</span> {userDetails.company_name}
//                             </p>
//                           )}
//                           {userDetails.industry && (
//                             <p className={`text-sm ${isScrolled ? 'text-gray-300' : 'text-gray-600'}`}>
//                               <span className="font-medium">Industry:</span> {userDetails.industry}
//                             </p>
//                           )}
//                           {userDetails.contact_person && (
//                             <p className={`text-sm ${isScrolled ? 'text-gray-300' : 'text-gray-600'}`}>
//                               <span className="font-medium">Contact:</span> {userDetails.contact_person} ({userDetails.contact_position})
//                             </p>
//                           )}
//                         </>
//                       )}
//                     </div>
//                     <div className="border-t border-gray-200"></div>
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full text-center px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-b-md transition-colors duration-300"
//                     >
//                       Logout
//                     </button>
//                   </>
//                 ) : (
//                   <div className="px-4 py-3">
//                     <p className={`text-sm ${isScrolled ? 'text-gray-300' : 'text-gray-500'}`}>
//                       Failed to load user details
//                     </p>
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full text-center px-4 py-2 mt-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-300"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         ) : (
//           <>
//             <Link to="/login" className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Login</Link>
//             <Link to="/register" className="bg-[#6B46C1] text-white p-[5px] rounded-[5px] w-[80px] hover:bg-white hover:text-[#6B46C1] transition-colors duration-300">Sign Up</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Header;













import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({ user, onLogout, isScrolled }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
    setActiveSubmenu(null);
  };

  const handleSubmenuToggle = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  useEffect(() => {
    if (isProfileDropdownOpen && user && !userDetails && !loading) {
      fetchUserDetails();
    }
  }, [isProfileDropdownOpen, user]);

  // const fetchUserDetails = async () => {
  //   setLoading(true);
  //   try {
  //     // Using the original /profile endpoint without tokens
  //     const response = await axios.post('http://localhost:5000/profile', {
  //       userType: user.type,
  //       userId: user.id
  //     });
      
  //     const details = response.data;
  //     const formattedDetails = {
  //       name: details.name || details.username,
  //       email: details.email,
  //       phone_number: details.phone_number,
  //       ...(user.type === 'college' && {
  //         address: details.address,
  //         contact_person: details.contact_person,
  //         contact_position: details.contact_position
  //       }),
  //       ...(user.type === 'mnc' && {
  //         company_name: details.name,
  //         industry: details.industry,
  //         contact_person: details.contact_person,
  //         contact_position: details.contact_position
  //       })
  //     };
      
  //     setUserDetails(formattedDetails);
  //   } catch (err) {
  //     console.error('Error fetching user details:', err);
  //     setUserDetails(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/profile', {
        userType: user.type,
        userId: user.id
      });
  
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch user details');
      }
  
      const details = response.data.data;
      const formattedDetails = {
        name: details.name || details.username,
        email: details.email,
        phone_number: details.phone_number,
        ...(user.type === 'college' && {
          address: details.address,
          contact_person: details.contact_person,
          contact_position: details.contact_position
        }),
        ...(user.type === 'mnc' && {
          company_name: details.name,
          industry: details.industry,
          contact_person: details.contact_person,
          contact_position: details.contact_position
        })
      };
      
      setUserDetails(formattedDetails);
    } catch (err) {
      console.error('Error fetching user details:', err);
      setUserDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    onLogout();
    navigate('/login');
  };

  return (
    <nav className={`fixed top-0 h-[60px] w-full shadow-md p-[15px] flex items-center justify-between z-20 transition-all duration-300 ${
      isScrolled ? 'bg-[#030060] shadow-lg' : 'bg-[#fdfaf5]'
    }`}>
      <div className="flex items-center space-x-6">
        <div className="text-2xl font-bold">
          <img src="https://campustocareer.tech/uploads/setting/1737912027-57XbFeEPxz.png" alt="Logo" />
        </div>
        
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className={`border rounded-[5px] p-[5px] w-[100px] bg-transparent transition-colors duration-300 ${
              isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
            }`}
          >
            Courses
          </button>

          {isDropdownOpen && (
            <div className={`absolute top-full left-0 mt-2 w-[250px] rounded-[5px] shadow-md ${
              isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
            }`}>
              <div className="py-2">
                <div className="relative">
                  <a
                    className={`block px-4 py-2 transition-colors duration-300 ${
                      isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                    }`}
                    onMouseEnter={() => handleSubmenuToggle(1)}
                  >
                    Development
                  </a>
                  {activeSubmenu === 1 && (
                    <div className={`absolute left-full top-0 w-[250px] rounded-[5px] shadow-md ${
                      isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
                    }`}>
                      <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Web Development</a>
                      <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Data Science</a>
                      <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Mobile Development</a>
                      <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Programming Language</a>
                      <a className={`block px-4 py-2 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Game Development</a>
                    </div>
                  )}
                </div>
                <a className={`block px-4 py-2 transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Marketing</a>
                <a className={`block px-4 py-2 transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Health & Fitness</a>
                <a className={`block px-4 py-2 transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Finance & Accounting</a>
                <hr className={`my-2 ${isScrolled ? 'border-white' : 'border-[#333]'}`} />
                <a className={`block px-4 py-2 transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>All Courses</a>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search Course..."
            className={`border rounded-[5px] p-[8px] w-[250px] pl-10 bg-transparent placeholder-opacity-100 transition-colors duration-300 ${
              isScrolled ? 'text-white placeholder-white' : 'text-[#333] placeholder-[#333]'
            }`}
          />
          <span
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
              isScrolled ? 'text-white' : 'text-[#333]'
            }`}
          >
            🔍
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4 ml-10">
        <a className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Pages</a>
        <a className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Forum</a>
        <a className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Blog</a>
        <a className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Contact</a>
        <div className="relative">
          <span className={`transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-[#333]'}`}>🔔</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
        </div>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className={`text-white p-2 px-4 rounded hover:bg-white transition-colors duration-300 ${
                user.type === 'student' ? 'bg-blue-600' : 
                user.type === 'college' ? 'bg-green-600' : 
                'bg-purple-600'
              } hover:text-[#6B46C1]`}
            >
              {user.type === 'student' ? 'Student' : 
               user.type === 'college' ? 'College' : 
               'MNC'}
            </button>
            
            {isProfileDropdownOpen && (
              <div className={`absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 z-30 ${
                isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
              }`}>
                {loading ? (
                  <div className="px-4 py-3">
                    <p className={`text-sm ${isScrolled ? 'text-gray-300' : 'text-gray-500'}`}>
                      Loading user details...
                    </p>
                  </div>
                ) : userDetails ? (
                  <>
                    <div className="px-4 py-3 space-y-2">
                      <p className={`text-lg font-bold ${isScrolled ? 'text-white' : 'text-gray-900'}`}>
                        {userDetails.name}
                      </p>
                      <p className={`text-sm ${isScrolled ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-medium">Email:</span> {userDetails.email}
                      </p>
                      {userDetails.phone_number && (
                        <p className={`text-sm ${isScrolled ? 'text-gray-300' : 'text-gray-600'}`}>
                          <span className="font-medium">Phone:</span> {userDetails.phone_number}
                        </p>
                      )}
                      {user.type === 'college' && userDetails.address && (
                        <p className={`text-sm ${isScrolled ? 'text-gray-300' : 'text-gray-600'}`}>
                          <span className="font-medium">Address:</span> {userDetails.address}
                        </p>
                      )}
                      {user.type === 'mnc' && userDetails.industry && (
                        <p className={`text-sm ${isScrolled ? 'text-gray-300' : 'text-gray-600'}`}>
                          <span className="font-medium">Industry:</span> {userDetails.industry}
                        </p>
                      )}
                    </div>
                    <div className="border-t border-gray-200"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-center px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-b-md transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="px-4 py-3">
                    <p className={`text-sm ${isScrolled ? 'text-gray-300' : 'text-gray-500'}`}>
                      Failed to load user details
                    </p>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-center px-4 py-2 mt-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className={`transition-colors duration-300 ${isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'}`}>Login</Link>
            <Link to="/register" className="bg-[#6B46C1] text-white p-[5px] rounded-[5px] w-[80px] hover:bg-white hover:text-[#6B46C1] transition-colors duration-300">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;