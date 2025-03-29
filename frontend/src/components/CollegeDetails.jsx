
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header'; // Import Header component
import Footer from './Footer'; // Import Footer component

const CollegeDetails = () => {
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [isScrolled, setIsScrolled] = useState(false); // Add scroll state
  const [showScrollTop, setShowScrollTop] = useState(false); // Add scroll-to-top state

  const { id } = useParams(); // Get college ID from URL
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;

  // Redirect to Login if not logged in
  useEffect(() => {
    if (!username) {
      navigate('/login', { state: { message: 'Please login to continue' } });
    }
  }, [username, navigate]);

  // Add scroll handling logic (same as ViewDetails)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch college details
  useEffect(() => {
    const fetchCollegeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/colleges/${id}`);
        setCollege(response.data);
      } catch (err) {
        setError('Failed to load college details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCollegeDetails();
    } else {
      setError('Invalid college ID.');
      setLoading(false);
    }
  }, [id]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard', { state: { username } });
  };

  const handleFetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${username}`);
      console.log(response.data);
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  if (error || !college) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#1A3C61] to-[#6B46C1] flex flex-col">
        <Header
          username={username}
          onFetchUserDetails={handleFetchUserDetails}
          isScrolled={isScrolled}
        />
        <main className="flex-1 px-4 sm:px-10 py-8 text-center pt-[70px]">
          <p className="text-red-500 text-lg sm:text-xl mb-4">{error || 'College not found.'}</p>
          <button
            onClick={handleBackToDashboard}
            className="bg-[#6B46C1] text-white py-2 px-4 sm:px-6 rounded-full hover:bg-[#5A3AA8] transition-colors duration-300 text-sm sm:text-base"
          >
            Back to Dashboard ←
          </button>
        </main>
        <Footer />
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 bg-[#6B46C1] text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-[#1A3C61] transition-colors duration-300"
            aria-label="Scroll to top"
          >
            ↑
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Use the same Header as ViewDetails */}
      <Header
        username={username}
        onFetchUserDetails={handleFetchUserDetails}
        isScrolled={isScrolled}
      />

      {/* Main Content */}
      <div className="pt-[50px] flex-1">
        {/* div-name: College Name and Details */}
        <div
          className="h-[400px] sm:h-[550px] bg-gradient-to-r from-[#1A3C61] to-[#6B46C1] flex items-center justify-between px-4 sm:px-10"
          style={{ backgroundImage: 'linear-gradient(to right, #1A3C61, #6B46C1)' }}
        >
          <div className="ml-4 sm:ml-[120px]">
            <h1 className="text-3xl sm:text-5xl font-sans-bold text-white mb-4 sm:mb-6">{college.name}</h1>
            <h4 className="text-sm sm:text-base text-slate-400 mb-2 sm:mb-4">{college.streams}</h4>
           
            <p className="text-amber-500 text-sm sm:text-base">
              {college.rating} ★★★★★ ({college.reviews} Students)
            </p>
          </div>
        </div>

        {/* Main Content: Tabs and Image */}
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto py-6 px-4 sm:px-0">
          {/* div-top and div-white: Tabs and Tab Content */}
          <div className="w-full md:w-[850px] mt-[-40px] bg-white">
            <div className="flex-1 pr-0 md:pr-6">
              {/* div-top: Tabs */}
              <div className="div-top flex flex-wrap space-x-2 sm:space-x-6 border-b border-gray-200 mb-6 px-4 sm:px-6">
                {['Overview', 'Curriculum', 'Discussion', 'Review', 'Instructor'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
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
              <div className="div-white px-4 sm:px-6 h-auto">
                {activeTab === 'Overview' && (
                  <div>
                    <h2 className="text-xl sm:text-3xl font-sans font-semibold text-[#1a1c61] mt-6 sm:mt-[70px] mb-4">
                      What you will learn
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base">
                      {college.description || 'Explore a wide range of academic programs and research opportunities at this prestigious institution.'}
                    </p>
                  </div>
                )}
                {activeTab === 'Curriculum' && (
                  <div>
                    <h2 className="text-xl sm:text-3xl font-sans font-semibold text-[#1a1c61] mt-6 sm:mt-[70px] mb-4">
                      Curriculum
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base">
                      Details about the academic programs and courses offered by the college.
                    </p>
                  </div>
                )}
                {activeTab === 'Discussion' && (
                  <div>
                    <h2 className="text-xl sm:text-3xl font-sans font-semibold text-[#1a1c61] mt-6 sm:mt-[70px] mb-4">
                      Discussion
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base">
                      Join the community discussion about this college.
                    </p>
                  </div>
                )}
                {activeTab === 'Review' && (
                  <div>
                    <h2 className="text-xl sm:text-3xl font-sans font-semibold text-[#1a1c61] mt-6 sm:mt-[70px] mb-4">
                      Reviews
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base">
                      Read reviews from students and alumni.
                    </p>
                  </div>
                )}
                {activeTab === 'Instructor' && (
                  <div>
                    <h2 className="text-xl sm:text-3xl font-sans font-semibold text-[#1a1c61] mt-6 sm:mt-[70px] mb-4">
                      Faculty
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base">
                      Learn about the faculty and their expertise.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* div-right: Image and Free Label */}
          <div className="w-full md:w-[400px] bg-white shadow-md rounded-[4px] mt-6 md:mt-[-380px] mb-6 md:mb-[20px] p-4 md:p-[5px] md:ml-6">
            <div className="w-full h-[150px] sm:h-[200px] object-contain bg-white mt-4 sm:mt-[80px] mb-4 sm:mb-[80px] flex items-center justify-center relative">
              <img
                src={college.image_url || 'https://via.placeholder.com/300x150?text=No+Image'}
                alt={`Image of ${college.name}`}
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>
            <div className="text-left mb-4">
              <span className="text-xl sm:text-2xl font-bold text-red-500">Free</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add the Footer */}
      <Footer />

      {/* Add the Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-[#6B46C1] text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-[#1A3C61] transition-colors duration-300"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default CollegeDetails;