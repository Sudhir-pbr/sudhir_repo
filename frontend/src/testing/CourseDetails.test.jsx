import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import CourseDetails from '../components/CourseDetails.jsx';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

// Suppress console output during tests
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.log.mockRestore();
  console.error.mockRestore();
});

jest.mock('../components/Header.jsx', () => ({ username, onFetchUserDetails, isScrolled }) => (
  <div data-testid="header">
    <button onClick={onFetchUserDetails}>Fetch User</button>
  </div>
));
jest.mock('../components/Footer.jsx', () => () => <div data-testid="footer">Footer</div>);

const mock = new MockAdapter(axios);

const mockCourse = {
  id: 1,
  name: 'Test Course',
  description: 'Learn testing',
  price: '$99',
  image_url: 'https://example.com/image.jpg',
  video_url: 'https://example.com/video.mp4',
  level: 'Beginner',
  duration: '10 hours',
  lectures: 5,
  language: 'English',
  subtitles: 'English',
  assignments: 2,
  resources: 3,
  lifetime_access: true,
  certificate: true,
  curriculum: 'Curriculum details for Test Course will be displayed here.',
};

const mockUser = {
  username: 'testuser',
  email: 'test@example.com',
  phone_number: '123-456-7890',
};

const renderWithRouter = (id = '1') =>
  render(
    <MemoryRouter initialEntries={[`/courses/${id}`]}>
      <Routes>
        <Route path="/courses/:id" element={<CourseDetails />} />
      </Routes>
    </MemoryRouter>
  );

describe('CourseDetails Component', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('displays loading state initially', async () => {
    mock.onGet('http://localhost:5000/courses/1').reply(200, mockCourse);
    renderWithRouter();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  it('renders course details after successful fetch', async () => {
    mock.onGet('http://localhost:5000/courses/1').reply(200, mockCourse);
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText('Test Course')).toBeInTheDocument();
      expect(screen.getByText('$99')).toBeInTheDocument();
    });
  });

  it('displays error message on fetch failure', async () => {
    mock.onGet('http://localhost:5000/courses/1').reply(500);
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText('Failed to load course details')).toBeInTheDocument();
    });
  });

  it('switches between tabs without errors', async () => {
    mock.onGet('http://localhost:5000/courses/1').reply(200, mockCourse);
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText('What you will learn')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Curriculum'));
    await waitFor(() => {
      expect(screen.getByText('Curriculum details for Test Course will be displayed here.')).toBeInTheDocument();
    });
  });

  it('fetches and toggles user details on button click', async () => {
    mock.onGet('http://localhost:5000/courses/1').reply(200, mockCourse);
    mock.onGet('http://localhost:5000/user/testuser').reply(200, mockUser);
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText('Test Course')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Fetch User'));
    await waitFor(() => {
      expect(screen.getByText('User Details')).toBeInTheDocument();
    });
  });
});