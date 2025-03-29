import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Register from '../components/register.jsx';

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Suppress console.error globally for all tests
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error before any test runs
});

describe('Register Component', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  beforeEach(() => {
    window.alert = jest.fn();
    mock.reset();
    mockNavigate.mockClear();
    // Remove jest.clearAllMocks() to preserve console.error mock
  });

  afterAll(() => {
    mock.restore();
    jest.restoreAllMocks(); // Restore console.error after all tests
  });

  it('renders registration form', () => {
    render(<MemoryRouter><Register /></MemoryRouter>);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  it('displays OTP form after successful registration', async () => {
    mock.onPost('http://localhost:5000/register').reply(200, { message: 'User registered successfully' });
    render(<MemoryRouter><Register /></MemoryRouter>);
    
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '1234567890' } });
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(screen.getByLabelText('Enter OTP')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Verify OTP' })).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('displays error message on registration failure', async () => {
    mock.onPost('http://localhost:5000/register').reply(400, { message: 'Username taken' });
    render(<MemoryRouter><Register /></MemoryRouter>);
    
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '1234567890' } });
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(screen.getByText('Username taken')).toBeInTheDocument();
    });
  });

  it('verifies OTP and navigates on success', async () => {
    mock.onPost('http://localhost:5000/register').reply(200, { message: 'User registered successfully' });

    render(<MemoryRouter><Register /></MemoryRouter>);
    
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '1234567890' } });
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    let generatedOtp;
    await waitFor(() => {
      expect(screen.getByLabelText('Enter OTP')).toBeInTheDocument();
      const alertCall = window.alert.mock.calls[0][0];
      generatedOtp = alertCall.match(/\d{4}/)[0];
    });

    fireEvent.change(screen.getByLabelText('Enter OTP'), { target: { value: generatedOtp } });
    fireEvent.click(screen.getByRole('button', { name: 'Verify OTP' }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { state: { username: 'testuser' } });
    });
  });
});