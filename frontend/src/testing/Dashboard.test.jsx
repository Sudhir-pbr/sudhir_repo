import React from 'react';
import { render, screen, waitFor, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Dashboard from '../components/Dashboard.jsx';

// Mock Header component
jest.mock('../components/Header.jsx', () => ({ isAuthenticated, user, onFetchUserDetails }) => (
  <div data-testid="header">
    <button onClick={onFetchUserDetails}>User</button>
    {user?.username && <div data-testid="username-display">{user.username}</div>}
  </div>
));

// Mock Footer component
jest.mock('../components/Footer.jsx', () => () => (
  <div data-testid="footer">Footer</div>
));

// Mock console.error to prevent test output clutter
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
  console.log.mockRestore();
});

const mock = new MockAdapter(axios);

describe('Dashboard Component', () => {
  const mockColleges = [
    { 
      id: 1, 
      name: 'College A', 
      streams: 'Science', 
      reviews: 10, 
      rating: 4, 
      image_url: 'url' 
    }
  ];

  const mockCourses = [
    { 
      id: 1, 
      name: 'Test Course', 
      description: 'Learn', 
      rating: 4.5, 
      reviews: 20, 
      price: '$99', 
      image_url: 'url' 
    }
  ];

  const mockActivities = [
    {
      id: 1,
      name: 'Test Activity',
      description: 'Activity description',
      date: '2023-01-01',
      participants: 50,
      image_url: 'url'
    }
  ];

  const mockUser = { 
    username: 'testuser', 
    email: 'test@example.com', 
    phone_number: '1234567890' 
  };

  const renderDashboard = (props = {}) => {
    const defaultProps = {
      isAuthenticated: true,
      user: mockUser,
      onLogout: jest.fn(),
      ...props
    };
    
    return render(
      <MemoryRouter>
        <Dashboard {...defaultProps} />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    mock.reset();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading states initially', async () => {
    mock.onGet('http://localhost:5000/colleges').reply(200, mockColleges);
    mock.onGet('http://localhost:5000/courses').reply(200, mockCourses);
    mock.onGet('http://localhost:5000/activities').reply(200, mockActivities);
    
    renderDashboard();

    expect(screen.getByText('Loading colleges...')).toBeInTheDocument();
    expect(screen.getByText('Loading courses...')).toBeInTheDocument();
    expect(screen.getByText('Loading activities...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.queryByText('Loading colleges...')).not.toBeInTheDocument();
      expect(screen.queryByText('Loading courses...')).not.toBeInTheDocument();
      expect(screen.queryByText('Loading activities...')).not.toBeInTheDocument();
    });
  });

  it('renders data after successful fetch', async () => {
    mock.onGet('http://localhost:5000/colleges').reply(200, mockColleges);
    mock.onGet('http://localhost:5000/courses').reply(200, mockCourses);
    mock.onGet('http://localhost:5000/activities').reply(200, mockActivities);
    
    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText('College A')).toBeInTheDocument();
      expect(screen.getByText('Test Course')).toBeInTheDocument();
      expect(screen.getByText('Test Activity')).toBeInTheDocument();
    });
  });

  it('displays error messages when fetch fails', async () => {
    mock.onGet('http://localhost:5000/colleges').reply(500);
    mock.onGet('http://localhost:5000/courses').reply(500);
    mock.onGet('http://localhost:5000/activities').reply(500);
    
    renderDashboard();

    await waitFor(() => {
      expect(screen.getByText('Failed to load colleges. Please try again later.')).toBeInTheDocument();
      expect(screen.getByText('Failed to load courses. Please try again later.')).toBeInTheDocument();
      expect(screen.getByText('Failed to load activities. Please try again later.')).toBeInTheDocument();
    });
  });

  it('shows user details when authenticated and user button clicked', async () => {
    mock.onGet('http://localhost:5000/colleges').reply(200, mockColleges);
    mock.onGet('http://localhost:5000/courses').reply(200, mockCourses);
    mock.onGet('http://localhost:5000/activities').reply(200, mockActivities);
    mock.onGet('http://localhost:5000/user/testuser').reply(200, mockUser);
    
    renderDashboard();

    fireEvent.click(screen.getByText('User'));
    
    await waitFor(() => {
      // Verify user details popup appears
      const userDetailsPopup = screen.getByText('User Details').closest('div');
      expect(userDetailsPopup).toBeInTheDocument();

      // Verify all user details are displayed correctly
      expect(within(userDetailsPopup).getByText(/Username:/)).toBeInTheDocument();
      expect(within(userDetailsPopup).getByText('testuser')).toBeInTheDocument();
      expect(within(userDetailsPopup).getByText(/Email:/)).toBeInTheDocument();
      expect(within(userDetailsPopup).getByText('test@example.com')).toBeInTheDocument();
      expect(within(userDetailsPopup).getByText(/Phone:/)).toBeInTheDocument();
      expect(within(userDetailsPopup).getByText('1234567890')).toBeInTheDocument();
    });
  });

  it('shows auth popup when not authenticated and trying to access protected features', async () => {
    mock.onGet('http://localhost:5000/colleges').reply(200, mockColleges);
    mock.onGet('http://localhost:5000/courses').reply(200, mockCourses);
    mock.onGet('http://localhost:5000/activities').reply(200, mockActivities);
    
    renderDashboard({ isAuthenticated: false, user: null });

    // Get all View ALL buttons and click the first one
    const viewAllButtons = screen.getAllByText('View ALL →');
    fireEvent.click(viewAllButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByText('Authentication Required')).toBeInTheDocument();
      expect(screen.getByText('Please login or register to access this feature.')).toBeInTheDocument();
    });
  });

  it('hides auth popup when cancel button is clicked', async () => {
    mock.onGet('http://localhost:5000/colleges').reply(200, mockColleges);
    mock.onGet('http://localhost:5000/courses').reply(200, mockCourses);
    mock.onGet('http://localhost:5000/activities').reply(200, mockActivities);
    
    renderDashboard({ isAuthenticated: false, user: null });

    // Get all View ALL buttons and click the first one
    const viewAllButtons = screen.getAllByText('View ALL →');
    fireEvent.click(viewAllButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByText('Authentication Required')).toBeInTheDocument();
    });

    // Click cancel
    fireEvent.click(screen.getByText('Cancel'));
    
    await waitFor(() => {
      expect(screen.queryByText('Authentication Required')).not.toBeInTheDocument();
    });
  });

  it('handles user fetch error without showing user details', async () => {
    mock.onGet('http://localhost:5000/colleges').reply(200, mockColleges);
    mock.onGet('http://localhost:5000/courses').reply(200, mockCourses);
    mock.onGet('http://localhost:5000/activities').reply(200, mockActivities);
    mock.onGet('http://localhost:5000/user/testuser').reply(500);
    
    renderDashboard();

    fireEvent.click(screen.getByText('User'));
    
    await waitFor(() => {
      expect(screen.queryByText('User Details')).not.toBeInTheDocument();
    });
  });
});