import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Dashboard from '../components/Dashboard.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

jest.mock('../components/Header.jsx', () => ({ username, onFetchUserDetails, isScrolled }) => (
  <div data-testid="header">
    <button onClick={onFetchUserDetails}>User</button>
  </div>
));
jest.mock('../components/Footer.jsx', () => () => <div data-testid="footer">Footer</div>);

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.log.mockRestore();
  console.error.mockRestore();
});

const mock = new MockAdapter(axios);

const mockColleges = [
  { id: 1, name: 'College A', streams: 'Science', reviews: 10, rating: 4, image_url: 'url' },
];
const mockCourses = [
  { id: 1, name: 'Test Course', description: 'Learn', rating: 4.5, reviews: 20, price: '$99', image_url: 'url' },
];

describe('Dashboard Component', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('displays loading state initially', async () => {
    mock.onGet('http://localhost:5000/colleges').reply(200, mockColleges);
    mock.onGet('http://localhost:5000/courses').reply(200, mockCourses);
    render(<MemoryRouter initialEntries={[{ pathname: '/dashboard', state: { username: 'testuser' } }]}><Dashboard /></MemoryRouter>);
    expect(screen.getByText('Loading colleges...')).toBeInTheDocument();
    expect(screen.getByText('Loading courses...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('Loading colleges...')).not.toBeInTheDocument();
      expect(screen.queryByText('Loading courses...')).not.toBeInTheDocument();
    });
  });

  it('renders user info and courses after successful fetch', async () => {
    mock.onGet('http://localhost:5000/colleges').reply(200, mockColleges);
    mock.onGet('http://localhost:5000/courses').reply(200, mockCourses);
    mock.onGet('http://localhost:5000/user/testuser').reply(200, { username: 'testuser', email: 'test@example.com', phone_number: '1234567890' });
    render(<MemoryRouter initialEntries={[{ pathname: '/dashboard', state: { username: 'testuser' } }]}><Dashboard /></MemoryRouter>);
    fireEvent.click(screen.getByText('User'));
    await waitFor(() => {
      expect(screen.getByText((content, element) => content.includes('testuser'))).toBeInTheDocument();
      expect(screen.getAllByText('Test Course').length).toBeGreaterThan(0); // Check that 'Test Course' appears at least once
      expect(screen.getByText('College A')).toBeInTheDocument();
    });
  });

  it('displays error message on fetch failure', async () => {
    mock.onGet('http://localhost:5000/colleges').reply(500);
    mock.onGet('http://localhost:5000/courses').reply(500);
    render(<MemoryRouter initialEntries={[{ pathname: '/dashboard', state: { username: 'testuser' } }]}><Dashboard /></MemoryRouter>);
    await waitFor(() => {
      expect(screen.getByText('Failed to load colleges. Please try again later.')).toBeInTheDocument();
      expect(screen.getByText('Failed to load courses. Please try again later.')).toBeInTheDocument();
    });
  });
});