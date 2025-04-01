
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || 'testuser';
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Redirect to Login if not logged in
  useEffect(() => {
    if (!username || username === 'testuser') {
      navigate('/login', { state: { message: 'Please login to continue' } });
    }
  }, [username, navigate]);

  const fetchUserDetails = async () => {
    try {
      console.log(`Fetching user details for ${username}...`);
      const response = await axios.get(`http://localhost:5000/user/${username}`);
      console.log('User details response:', response.data);
      setUserDetails(response.data);
      setShowUserDetails(!showUserDetails);
    } catch (err) {
      console.error('Error fetching user details:', err);
      setUserDetails(null);
      setShowUserDetails(false);
    }
  };

  const handleLogout = () => {
    console.log('Logging out, navigating to /');
    navigate('/', { replace: true });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/courses/${id}`);
        setCourse(response.data);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Failed to load course details');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handlePlayClick = () => {
    setIsVideoPlaying(true);
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* <Header username={username} onFetchUserDetails={fetchUserDetails} isScrolled={isScrolled} /> */}
      <Header 
  isAuthenticated={!!username} 
  user={{ username: username }}
  onFetchUserDetails={fetchUserDetails}
  isScrolled={isScrolled} 
/>
      {showUserDetails && userDetails && (
        <div className="fixed right-0 top-[70px] bg-white shadow-md p-4 rounded-[5px] w-[200px] sm:w-[250px] z-10">
          <h3 className="text-base sm:text-lg font-bold mb-2 text-[#333]">User Details</h3>
          <p className="text-[#333] text-sm sm:text-base">
            <strong>Username:</strong> {userDetails.username}
          </p>
          <p className="text-[#333] text-sm sm:text-base">
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p className="text-[#333] text-sm sm:text-base">
            <strong>Phone Number:</strong> {userDetails.phone_number}
          </p>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white p-2 rounded-[5px] w-full hover:bg-red-600 transition-colors duration-300 text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      )}
      <div className="pt-[50px] flex-1">
        {/* div-name: Course Name and Details */}
        <div
          className="h-[400px] sm:h-[550px] bg-gradient-to-r from-[#1A3C61] to-[#6B46C1] flex items-center justify-between px-4 sm:px-10"
          style={{ backgroundImage: 'linear-gradient(to right, #1A3C61, #6B46C1)' }}
        >
          <div className="ml-4 sm:ml-[120px]">
            <h1 className="text-3xl sm:text-5xl font-sans-bold text-white mb-4 sm:mb-6">{course.name}</h1>
            <h4 className="text-sm sm:text-base text-slate-400 mb-2 sm:mb-4">{course.name}</h4>
            <p className="text-white text-sm sm:text-base">{course.level || 'Level not specified'}</p>
            <p className="text-amber-500 text-sm sm:text-base">
              {course.rating} ★★★★★ ({course.reviews})
            </p>
          </div>
        </div>

        {/* Main Content: Tabs and Sidebar */}
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto py-6 px-4 sm:px-0">
          {/* div-top and div-white: Tabs and Tab Content */}
          <div className="w-full md:w-[850px] mt-[-40px] bg-white">
            <div className="flex-1 pr-0 md:pr-6">
              {/* div-top: Tabs */}
              <div className="div-top flex flex-wrap space-x-2 sm:space-x-6 border-b border-gray-200 mb-6 px-4 sm:px-6">
                {['Overview', 'Curriculum', 'Discussion', 'Review', 'Instructor'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 text-sm sm:text-lg font-medium ${
                      activeTab === tab
                        ? 'text-[#1A3C61] border-b-2 border-[#6B46C1]'
                        : 'text-gray-500 hover:text-[#1A3C61]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* div-white: Tab Content */}
              <div className="div-white px-4 sm:px-6">
                {activeTab === 'Overview' && (
                  <div>
                    <h2 className="text-xl sm:text-3xl font-sans font-semibold text-[#1a1c61] mt-6 sm:mt-[70px] mb-4">
                      What you will learn
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base">
                      {course.overview || 'Overview not available'}
                    </p>
                  </div>
                )}
                {activeTab === 'Curriculum' && (
                  <div>
                    <h2 className="text-xl sm:text-3xl font-sans font-semibold text-[#1a1c61] mt-6 sm:mt-[70px] mb-4">
                      Curriculum
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base whitespace-pre-line">
                      {course.curriculum || 'Curriculum not available'}
                    </p>
                  </div>
                )}
                {activeTab === 'Discussion' && (
                  <div>
                    <h2 className="text-xl sm:text-3xl font-sans font-semibold text-[#1a1c61] mt-6 sm:mt-[70px] mb-4">
                      Discussion
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base">
                      {course.discussion || 'Discussion not available'}
                    </p>
                  </div>
                )}
                {activeTab === 'Review' && (
                  <div>
                    <h2 className="text-xl sm:text-3xl font-sans font-semibold text-[#1a1c61] mt-6 sm:mt-[70px] mb-4">
                      Review
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base">
                      {course.review || 'Reviews not available'}
                    </p>
                  </div>
                )}
                {activeTab === 'Instructor' && (
                  <div>
                    <h2 className="text-xl sm:text-3xl font-sans font-semibold text-[#1a1c61] mt-6 sm:mt-[70px] mb-4">
                      Instructor
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base">
                      {course.instructor || 'Instructor details not available'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* div-right: Sidebar */}
          <div className="w-full md:w-[400px] bg-white shadow-md rounded-[4px] mt-6 md:mt-[-350px] mb-6 md:mb-[20px] p-4 md:p-[5px] md:ml-6">
            <div className="w-full h-[150px] sm:h-[200px] object-contain bg-white mt-4 sm:mt-[80px] mb-4 sm:mb-[80px] flex items-center justify-center relative">
              {isVideoPlaying ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${course.video_url.split('v=')[1]}?autoplay=1`}
                  title={course.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-[10px]"
                ></iframe>
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={course.image_url || 'https://via.placeholder.com/300x150?text=No+Image'}
                    alt={course.name}
                    className="w-full h-full object-cover rounded-[10px]"
                  />
                  <button
                    onClick={handlePlayClick}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#6B46C1] text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-[#1A3C61] transition-colors duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            <div className="text-left mb-4">
              <span className="text-xl sm:text-2xl font-bold text-red-500">{course.price}</span>
            </div>
            <ul className="space-y-2 mb-6 text-sm sm:text-base">
              <li className="flex justify-between">
                <span className="text-gray-700">Course Duration:</span>
                <span className="text-gray-500">{course.duration || 'Not specified'}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">Lecture Created:</span>
                <span className="text-gray-500">{course.lectures || '0'}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">Language:</span>
                <span className="text-gray-500">{course.language || 'Not specified'}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">Subtitles:</span>
                <span className="text-gray-500">{course.subtitles || 'Not specified'}</span>
              </li>
            </ul>
            <button className="w-full bg-[#6B46C1] text-white p-2 sm:p-[10px] rounded-[5px] hover:bg-[#1A3C61] transition-colors duration-300 mb-2 text-sm sm:text-base">
              Enroll the Course →
            </button>
            <div className="flex justify-between text-sm sm:text-base">
              <button className="text-gray-700 hover:text-[#6B46C1]">Add to Wishlist</button>
              <button className="text-gray-700 hover:text-[#6B46C1]">Share</button>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#1A3C61] mt-4 sm:mt-6 mb-2">
              This course includes:
            </h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="flex items-center space-x-2">
                <span className="text-gray-700">🎥 {course.lectures || '0'} Lectures</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-gray-700">📝 {course.assignments || '0'} Assignments</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-gray-700">📚 {course.resources || '0'} Downloadable Resources</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-gray-700">
                  ⏳ {course.lifetime_access ? 'Full Lifetime Access' : 'Limited Access'}
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-gray-700">
                  🏆 {course.certificate ? 'Certificate of Completion' : 'No Certificate'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseDetails;