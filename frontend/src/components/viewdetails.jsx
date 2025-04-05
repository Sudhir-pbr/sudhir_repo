


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
  const [userDetails, setUserDetails] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const navigationState = location.state || {};
  const type = navigationState.type;
  const username = navigationState.username;

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside handling for user dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      const userButton = document.querySelector('.user-button');
      const dropdown = document.querySelector('.user-dropdown');
      
      if (dropdown && !dropdown.contains(event.target) && 
          userButton && !userButton.contains(event.target)) {
        setShowUserDetails(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!type || typeof type !== 'string') {
          throw new Error('MISSING_TYPE');
        }

        const validTypes = ['colleges', 'courses', 'activities'];
        if (!validTypes.includes(type)) {
          throw new Error('INVALID_TYPE');
        }

        const response = await axios.get(`http://localhost:5000/${type}`);
        
        if (!response.data) {
          throw new Error('EMPTY_RESPONSE');
        }

        setItems(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (err) {
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

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${username}`);
      setUserDetails(response.data);
      setShowUserDetails(!showUserDetails);
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };

  const handleLogout = () => {
    navigate('/', { replace: true });
  };

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
        isAuthenticated={!!username}
        user={{ username: username }}
        onFetchUserDetails={fetchUserDetails}
        isScrolled={isScrolled}
      />

      {showUserDetails && userDetails && (
        <div className="fixed right-4 top-[70px] bg-white shadow-lg rounded-md p-4 w-64 z-50 border border-gray-200 user-dropdown" data-testid="user-dropdown">
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