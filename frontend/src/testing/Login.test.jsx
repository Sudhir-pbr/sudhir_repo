import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Login from '../components/Login.jsx'; // Adjust path if needed

// Mock react-router-dom's useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  beforeEach(() => {
    mock.reset();
    mockNavigate.mockClear();
  });

  afterAll(() => {
    mock.restore();
    console.error.mockRestore();
  });

  it('renders login form', () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    mock.onGet('http://localhost:5000/user/testuser').reply(200, {
      username: 'testuser',
      password: 'password123',
      email: 'test@example.com',
      phone_number: '1234567890',
    });

    render(<MemoryRouter><Login /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', {
        state: { username: 'testuser' },
      });
    });
  });

  it('displays error message on login failure', async () => {
    mock.onGet('http://localhost:5000/user/testuser').reply(200, {
      username: 'testuser',
      password: 'wrongpassword',
      email: 'test@example.com',
      phone_number: '1234567890',
    });

    render(<MemoryRouter><Login /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
    });
  });
});