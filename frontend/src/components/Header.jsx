

// import { useState, useEffect } from 'react';

// const Header = ({ username, onFetchUserDetails, isScrolled }) => {
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
//         <button
//           onClick={onFetchUserDetails}
//           className="bg-[#6B46C1] text-white p-[5px] rounded-[5px] w-[80px] hover:bg-white hover:text-[#6B46C1] transition-colors duration-300"
//           aria-label="View user details"
//         >
//           User
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Header;






import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isAuthenticated, user, onFetchUserDetails, onLogout, isScrolled }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
    setActiveSubmenu(null);
  };

  const handleSubmenuToggle = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  return (
    <nav
      className={`fixed top-0 h-[60px] w-full shadow-md p-[15px] flex items-center justify-between z-20 transition-all duration-300 ${
        isScrolled ? 'bg-[#030060] shadow-lg' : 'bg-[#fdfaf5]'
      }`}
    >
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
                {/* Development */}
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
                      <a className={`block px-4 py-2 ${
                        isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                      }`}>Web Development</a>
                      <a className={`block px-4 py-2 ${
                        isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                      }`}>Data Science</a>
                      <a className={`block px-4 py-2 ${
                        isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                      }`}>Mobile Development</a>
                      <a className={`block px-4 py-2 ${
                        isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                      }`}>Programming Language</a>
                      <a className={`block px-4 py-2 ${
                        isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                      }`}>Game Development</a>
                    </div>
                  )}
                </div>

                {/* IT & Software */}
                <div className="relative">
                  <a
                    className={`block px-4 py-2 transition-colors duration-300 ${
                      isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                    }`}
                    onMouseEnter={() => handleSubmenuToggle(2)}
                  >
                    IT & Software
                  </a>
                  {activeSubmenu === 2 && (
                    <div className={`absolute left-full top-0 w-[250px] rounded-[5px] shadow-md ${
                      isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
                    }`}>
                      <a className={`block px-4 py-2 ${
                        isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                      }`}>IT Certifications</a>
                      <a className={`block px-4 py-2 ${
                        isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                      }`}>Network & Security</a>
                      <a className={`block px-4 py-2 ${
                        isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                      }`}>Hardware</a>
                      <a className={`block px-4 py-2 ${
                        isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                      }`}>Operating System & Servers</a>
                    </div>
                  )}
                </div>

                {/* Office Productivity */}
                <div className="relative">
                  <a
                    className={`block px-4 py-2 transition-colors duration-300 ${
                      isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                    }`}
                    onMouseEnter={() => handleSubmenuToggle(3)}
                  >
                    Office Productivity
                  </a>
                  {activeSubmenu === 3 && (
                    <div className={`absolute left-full top-0 w-[250px] rounded-[5px] shadow-md ${
                      isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
                    }`}>
                      <a className={`block px-4 py-2 ${
                        isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                      }`}>Microsoft</a>
                      <a className={`block px-4 py-2 ${
                        isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                      }`}>Apple</a>
                      <a className={`block px-4 py-2 ${
                        isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                      }`}>Google</a>
                    </div>
                  )}
                </div>

                {/* Personal Development */}
                <div className="relative">
                  <a
                    className={`block px-4 py-2 transition-colors duration-300 ${
                      isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                    }`}
                    onMouseEnter={() => handleSubmenuToggle(4)}
                  >
                    Personal Development
                  </a>
                  {activeSubmenu === 4 && (
                    <div className={`absolute left-full top-0 w-[250px] rounded-[5px] shadow-md ${
                      isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
                    }`}>
                      <a className={`block px-4 py-2 ${
                        isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                      }`}>Career Development</a>
                      <a className={`block px-4 py-2 ${
                        isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                      }`}>Creativity</a>
                    </div>
                  )}
                </div>

                {/* Business */}
                <div className="relative">
                  <a
                    className={`block px-4 py-2 transition-colors duration-300 ${
                      isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                    }`}
                    onMouseEnter={() => handleSubmenuToggle(5)}
                  >
                    Business
                  </a>
                  {activeSubmenu === 5 && (
                    <div className={`absolute left-full top-0 w-[250px] rounded-[5px] shadow-md ${
                      isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
                    }`}>
                      <a className={`block px-4 py-2 ${
                        isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                      }`}>Communication</a>
                      <a className={`block px-4 py-2 ${
                        isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                      }`}>Management</a>
                      <a className={`block px-4 py-2 ${
                        isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                      }`}>Sales</a>
                    </div>
                  )}
                </div>

                {/* Marketing */}
                <a
                  className={`block px-4 py-2 transition-colors duration-300 ${
                    isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                  }`}
                >
                  Marketing
                </a>

                {/* Design */}
                <div className="relative">
                  <a
                    className={`block px-4 py-2 transition-colors duration-300 ${
                      isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                    }`}
                    onMouseEnter={() => handleSubmenuToggle(6)}
                  >
                    Design
                  </a>
                  {activeSubmenu === 6 && (
                    <div className={`absolute left-full top-0 w-[250px] rounded-[5px] shadow-md ${
                      isScrolled ? 'bg-[#1A3C61]' : 'bg-white'
                    }`}>
                      <a className={`block px-4 py-2 ${
                        isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                      }`}>Web Design</a>
                      <a className={`block px-4 py-2 ${
                        isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                      }`}>Graphic Design</a>
                      <a className={`block px-4 py-2 ${
                        isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                      }`}>Game Design</a>
                      <a className={`block px-4 py-2 ${
                        isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                      }`}>Fashion Design</a>
                      <a className={`block px-4 py-2 ${
                        isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                      }`}>User Experience Design</a>
                    </div>
                  )}
                </div>

                {/* Health & Fitness */}
                <a
                  className={`block px-4 py-2 transition-colors duration-300 ${
                    isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                  }`}
                >
                  Health & Fitness
                </a>

                {/* Finance & Accounting */}
                <a
                  className={`block px-4 py-2 transition-colors duration-300 ${
                    isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                  }`}
                >
                  Finance & Accounting
                </a>

                <hr className={`my-2 ${isScrolled ? 'border-white' : 'border-[#333]'}`} />

                {/* All Courses */}
                <a
                  className={`block px-4 py-2 transition-colors duration-300 ${
                    isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
                  }`}
                >
                  All Courses
                </a>
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
        <a
          className={`transition-colors duration-300 ${
            isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
          }`}
        >
          Pages
        </a>
        <a
          className={`transition-colors duration-300 ${
            isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
          }`}
        >
          Forum
        </a>
        <a
          className={`transition-colors duration-300 ${
            isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
          }`}
        >
          Blog
        </a>
        <a
          className={`transition-colors duration-300 ${
            isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
          }`}
        >
          Contact
        </a>
        <div className="relative">
          <span
            className={`transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-[#333]'}`}
          >
            🔔
          </span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            0
          </span>
        </div>

        {isAuthenticated ? (
          <button
            onClick={onFetchUserDetails}
            className="user-button bg-[#6B46C1] text-white p-[5px] rounded-[5px] w-[80px] hover:bg-white hover:text-[#6B46C1] transition-colors duration-300"
          >
            User
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-white hover:text-[#FF6F61]' : 'text-[#333] hover:text-[#6B46C1]'
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-[#6B46C1] text-white p-[5px] rounded-[5px] w-[80px] hover:bg-white hover:text-[#6B46C1] transition-colors duration-300"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;