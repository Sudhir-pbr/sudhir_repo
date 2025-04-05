import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import ViewDetails from '../components/viewdetails';

jest.mock('axios');

jest.mock('../components/Header', () => ({ isAuthenticated, user, onFetchUserDetails, isScrolled }) => (
  <div data-testid="header-mock">
    <button 
      className="user-button" 
      onClick={onFetchUserDetails}
      data-testid="user-button"
    >
      {isAuthenticated ? 'User' : 'Login'}
    </button>
    <span data-testid="scrolled-status">{isScrolled ? 'scrolled' : 'not-scrolled'}</span>
  </div>
));

jest.mock('../components/Footer', () => () => <div data-testid="footer-mock">Footer</div>);

const mockLocation = {
  state: {
    type: 'courses',
    username: 'testuser'
  }
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: () => jest.fn(),
}));

describe('ViewDetails Component', () => {
  const mockItems = [
    {
      id: '1',
      name: 'Test Course',
      description: 'A great course',
      rating: 4.2,
      reviews: 500,
      price: 99.99,
      image_url: 'https://example.com/course.jpg'
    }
  ];

  const mockUser = {
    username: 'testuser',
    email: 'test@example.com',
    phone_number: '1234567890'
  };

  beforeEach(() => {
    useLocation.mockImplementation(() => mockLocation);
    axios.get.mockImplementation((url) => {
      if (url.includes('/courses')) {
        return Promise.resolve({ data: mockItems });
      }
      if (url.includes('/user/')) {
        return Promise.resolve({ data: mockUser });
      }
      return Promise.reject(new Error('Not found'));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders view details correctly with items', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/courses']}>
          <Routes>
            <Route path="/:type" element={<ViewDetails />} />
          </Routes>
        </MemoryRouter>
      );
    });

    expect(await screen.findByText('Courses')).toBeInTheDocument();
    expect(screen.getByText('Test Course')).toBeInTheDocument();
  });

  test('shows loading state initially', async () => {
    axios.get.mockImplementationOnce(() => new Promise(resolve => 
      setTimeout(() => resolve({ data: mockItems }), 100)
    ));

    render(
      <MemoryRouter initialEntries={['/courses']}>
        <Routes>
          <Route path="/:type" element={<ViewDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading content...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('Loading content...')).not.toBeInTheDocument();
    });
  });

  test('handles error state when data fails to load', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network error'));

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/courses']}>
          <Routes>
            <Route path="/:type" element={<ViewDetails />} />
          </Routes>
        </MemoryRouter>
      );
    });

    expect(await screen.findByText('Error loading content')).toBeInTheDocument();
  });

  test('toggles user dropdown when user button is clicked', async () => {
    // 1. Set up mock user data response
    axios.get.mockImplementationOnce((url) => {
      if (url.includes('/user/')) {
        return Promise.resolve({ 
          data: {
            username: 'testuser',
            email: 'test@example.com',
            phone_number: '1234567890'
          }
        });
      }
      return Promise.reject(new Error('Not found'));
    });
  
    // 2. Render the component
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/courses']}>
          <Routes>
            <Route path="/:type" element={<ViewDetails />} />
          </Routes>
        </MemoryRouter>
      );
    });
  
    // 3. Click the user button
    const userButton = screen.getByTestId('user-button');
    await act(async () => {
      fireEvent.click(userButton);
    });
  
    // 4. Wait for and verify the dropdown content
    await waitFor(() => {
      // Check the entire dropdown content at once
      const dropdown = screen.getByTestId('user-dropdown');
      expect(dropdown).toHaveTextContent('Username: testuser');
      expect(dropdown).toHaveTextContent('Email: test@example.com');
      expect(dropdown).toHaveTextContent('Phone: 1234567890');
      expect(dropdown).toHaveTextContent('Logout');
    });
  });
  
  test('shows empty state when no items are available', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/courses']}>
          <Routes>
            <Route path="/:type" element={<ViewDetails />} />
          </Routes>
        </MemoryRouter>
      );
    });

    expect(await screen.findByText('No content available in this section')).toBeInTheDocument();
  });
});