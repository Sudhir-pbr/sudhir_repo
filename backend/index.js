
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'learning_platform',
});

// Test database connection (skip in test environment)
if (process.env.NODE_ENV !== 'test') {
  pool.getConnection()
    .then(() => console.log('Connected to MySQL database'))
    .catch(err => console.error('Database connection failed:', err));
}

// Endpoint to fetch user details
app.get('/user/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(500).json({ message: `Server error: ${err.message}` });
  }
});

// Endpoint to fetch all colleges
app.get('/colleges', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM colleges');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching colleges:', err);
    res.status(500).json({ message: `Server error: ${err.message}` });
  }
});

app.get('/activities', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM activities'); // ✅ Use 'pool' instead of 'db'
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching activities:', err);
    res.status(500).json({ message: `Server error: ${err.message}` });
  }
});

// Endpoint to fetch a single college by ID
app.get('/colleges/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute('SELECT * FROM colleges WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'College not found' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Error fetching college:', err);
    res.status(500).json({ message: `Server error: ${err.message}` });
  }
});

// Endpoint to fetch all courses
app.get('/courses', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM courses');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ message: `Server error: ${err.message}` });
  }
});

// Endpoint to fetch a single course by ID
app.get('/courses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute('SELECT * FROM courses WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Error fetching course:', err);
    res.status(500).json({ message: `Server error: ${err.message}` });
  }
});

// Endpoint to add a new course
app.post('/courses', async (req, res) => {
  const { name, image_url, description, rating, reviews, price, level, duration, language, subtitles, lectures, assignments, resources, lifetime_access, certificate } = req.body;
  try {
    if (!name || !image_url || !description || !rating || !reviews || !price || !level || !duration || !language || !subtitles || lectures === undefined || assignments === undefined || resources === undefined || lifetime_access === undefined || certificate === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    await pool.execute(
      'INSERT INTO courses (name, image_url, description, rating, reviews, price, level, duration, language, subtitles, lectures, assignments, resources, lifetime_access, certificate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, image_url, description, rating, reviews, price, level, duration, language, subtitles, lectures, assignments, resources, lifetime_access, certificate]
    );

    res.status(201).json({ message: 'Course added successfully' });
  } catch (err) {
    console.error('Error adding course:', err);
    res.status(500).json({ message: `Server error: ${err.message}` });
  }
});

// Endpoint to update a course
app.put('/courses/:id', async (req, res) => {
  const { id } = req.params;
  const { name, image_url, description, rating, reviews, price, level, duration, language, subtitles, lectures, assignments, resources, lifetime_access, certificate } = req.body;
  try {
    if (!name || !image_url || !description || !rating || !reviews || !price || !level || !duration || !language || !subtitles || lectures === undefined || assignments === undefined || resources === undefined || lifetime_access === undefined || certificate === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const [existingCourses] = await pool.execute('SELECT * FROM courses WHERE id = ?', [id]);
    if (existingCourses.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await pool.execute(
      'UPDATE courses SET name = ?, image_url = ?, description = ?, rating = ?, reviews = ?, price = ?, level = ?, duration = ?, language = ?, subtitles = ?, lectures = ?, assignments = ?, resources = ?, lifetime_access = ?, certificate = ? WHERE id = ?',
      [name, image_url, description, rating, reviews, price, level, duration, language, subtitles, lectures, assignments, resources, lifetime_access, certificate, id]
    );

    res.status(200).json({ message: 'Course updated successfully' });
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).json({ message: `Server error: ${err.message}` });
  }
});

// Endpoint to register a user
app.post('/register', async (req, res) => {
  const { username, password, email, phone_number } = req.body;
  try {
    const [existingUsers] = await pool.execute('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    await pool.execute(
      'INSERT INTO users (username, password, email, phone_number) VALUES (?, ?, ?, ?)',
      [username, password, email, phone_number]
    );

    res.status(200).json({ message: 'User registered successfully', username });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: `Server error: ${err.message}` });
  }
});

module.exports = app; // Export the app for testing

if (require.main === module) {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}