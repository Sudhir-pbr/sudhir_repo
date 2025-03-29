const request = require('supertest');
const mysql = require('mysql2/promise');

jest.mock('mysql2/promise', () => {
  const mockPool = {
    execute: jest.fn(),
    getConnection: jest.fn().mockResolvedValue({ release: jest.fn() }),
  };
  return { createPool: jest.fn(() => mockPool) };
});

const app = require('./index.js');

describe('Backend API', () => {
  let pool;

  beforeAll(() => {
    pool = mysql.createPool();
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error
  });

  beforeEach(() => {
    pool.execute.mockReset();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('GET /user/:username returns user data for existing user', async () => {
    pool.execute.mockResolvedValue([
      [{ username: 'testuser', email: 'test@example.com', phone_number: '1234567890', password: 'password123' }],
      []
    ]);

    const response = await request(app)
      .get('/user/testuser')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({
      username: 'testuser',
      email: 'test@example.com',
      phone_number: '1234567890',
      password: 'password123',
    });
  });

  it('GET /user/:username returns 404 for non-existing user', async () => {
    pool.execute.mockResolvedValue([[], []]);

    const response = await request(app)
      .get('/user/nonexistent')
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body).toEqual({ message: 'User not found' });
  });

  it('GET /user/:username returns 500 on database error', async () => {
    pool.execute.mockRejectedValue(new Error('Database failure'));

    const response = await request(app)
      .get('/user/testuser')
      .expect('Content-Type', /json/)
      .expect(500);

    expect(response.body.message).toMatch(/Server error: Database failure/);
  });

  it('POST /register creates a new user', async () => {
    pool.execute
      .mockResolvedValueOnce([[], []]) // No existing user
      .mockResolvedValueOnce([{ insertId: 1 }, []]); // Insert succeeds

    const response = await request(app)
      .post('/register')
      .send({ username: 'newuser', password: 'pass123', email: 'new@example.com', phone_number: '9876543210' })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ message: 'User registered successfully', username: 'newuser' });
  });
});