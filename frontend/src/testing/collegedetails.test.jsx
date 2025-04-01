import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import CollegeDetails from '../components/CollegeDetails'; // Update this path

// Mock axios
jest.mock('axios');

// Mock Header and Footer components - UPDATE THESE PATHS
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

// ... rest of the test file remains the same ...

// Mock useLocation hook
const mockLocation = {
  state: {
    username: 'testuser'
  }
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: () => jest.fn(),
}));

describe('CollegeDetails Component', () => {
  const mockCollege = {
    id: '1',
    name: 'Test University',
    streams: 'Engineering, Business',
    description: 'A prestigious university',
    rating: 4.5,
    reviews: 1200,
    image_url: 'https://example.com/college.jpg'
  };

  const mockUser = {
    username: 'testuser',
    email: 'test@example.com',
    phone_number: '1234567890'
  };

  beforeEach(() => {
    useLocation.mockImplementation(() => mockLocation);
    axios.get.mockImplementation((url) => {
      if (url.includes('/colleges/')) {
        return Promise.resolve({ data: mockCollege });
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

  test('renders college details correctly', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/colleges/1']}>
          <Routes>
            <Route path="/colleges/:id" element={<CollegeDetails />} />
          </Routes>
        </MemoryRouter>
      );
    });

    expect(await screen.findByText('Test University')).toBeInTheDocument();
    expect(screen.getByText('Engineering, Business')).toBeInTheDocument();
    expect(screen.getByText('A prestigious university')).toBeInTheDocument();
    expect(screen.getByText('4.5 ★★★★★ (1200 Students)')).toBeInTheDocument();
  });
  test('toggles user dropdown when user button is clicked', async () => {
    // Mock responses
    axios.get.mockImplementation((url) => {
      if (url.includes('/user/')) {
        return Promise.resolve({ 
          data: {
            username: 'testuser',
            email: 'test@example.com',
            phone_number: '1234567890'
          }
        });
      }
      if (url.includes('/colleges/')) {
        return Promise.resolve({ data: mockCollege });
      }
      return Promise.reject(new Error('Not found'));
    });
  
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/colleges/1']}>
          <Routes>
            <Route path="/colleges/:id" element={<CollegeDetails />} />
          </Routes>
        </MemoryRouter>
      );
    });
  
    // Wait for college data to load
    await screen.findByText('Test University');
  
    // Click the user button
    const userButton = screen.getByTestId('user-button');
    await act(async () => {
      fireEvent.click(userButton);
    });
  
    // Verify dropdown using the actual class name
    await waitFor(() => {
      const dropdown = document.querySelector('.user-dropdown');
      expect(dropdown).toBeInTheDocument();
      
      // Check content using text matching
      expect(dropdown.textContent).toMatch(/Username:.*testuser/);
      expect(dropdown.textContent).toMatch(/Email:.*test@example.com/);
      expect(dropdown.textContent).toMatch(/Phone:.*1234567890/);
      expect(dropdown.textContent).toMatch(/Logout/);
    });
  });
  test('handles scroll events correctly', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/colleges/1']}>
          <Routes>
            <Route path="/colleges/:id" element={<CollegeDetails />} />
          </Routes>
        </MemoryRouter>
      );
    });

    expect(screen.getByTestId('scrolled-status')).toHaveTextContent('not-scrolled');

    await act(async () => {
      window.scrollY = 100;
      fireEvent.scroll(window);
    });

    expect(screen.getByTestId('scrolled-status')).toHaveTextContent('scrolled');
  });

  test('shows error message when college data fails to load', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network error'));

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/colleges/1']}>
          <Routes>
            <Route path="/colleges/:id" element={<CollegeDetails />} />
          </Routes>
        </MemoryRouter>
      );
    });

    expect(await screen.findByText('Failed to load college details. Please try again later.')).toBeInTheDocument();
  });
});