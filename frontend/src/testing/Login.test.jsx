
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Login';
import axios from 'axios';

// Mock axios
jest.mock('axios');

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock console.error to keep test output clean
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  const renderLogin = () => {
    return render(
      <MemoryRouter>
        <Login onLogin={mockOnLogin} />
      </MemoryRouter>
    );
  };

  test('renders login form correctly', () => {
    renderLogin();
    
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
  });

  test('handles successful login and navigation', async () => {
    const mockUser = {
      username: 'testuser',
      password: 'correctpassword'
    };
    
    axios.get.mockResolvedValueOnce({ data: mockUser });
    renderLogin();

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'correctpassword' }
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith(mockUser);
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', {
        state: { username: 'testuser' }
      });
    });
  });

  test('shows error when password is incorrect', async () => {
    const mockUser = {
      username: 'testuser',
      password: 'correctpassword'
    };
    
    axios.get.mockResolvedValueOnce({ data: mockUser });
    renderLogin();

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' }
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
    });
  });

  test('shows error when user does not exist', async () => {
    axios.get.mockRejectedValueOnce({ response: { status: 404 } });
    renderLogin();

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'nonexistent' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
    });
  });

  test('shows error when API request fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));
    renderLogin();

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/login failed/i)).toBeInTheDocument();
    });
  });
});