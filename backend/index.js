
// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // MySQL connection pool
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'learning_platform',
// });

// // Test database connection (skip in test environment)
// if (process.env.NODE_ENV !== 'test') {
//   pool.getConnection()
//     .then(() => console.log('Connected to MySQL database'))
//     .catch(err => console.error('Database connection failed:', err));
// }

// // Endpoint to fetch user details
// app.get('/user/:username', async (req, res) => {
//   const { username } = req.params;
//   try {
//     const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
//     if (rows.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(rows[0]);
//   } catch (err) {
//     console.error('Error fetching user details:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });

// // Endpoint to fetch all colleges
// app.get('/colleges', async (req, res) => {
//   try {
//     const [rows] = await pool.execute('SELECT * FROM colleges');
//     res.status(200).json(rows);
//   } catch (err) {
//     console.error('Error fetching colleges:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });

// app.get('/activities', async (req, res) => {
//   try {
//     const [rows] = await pool.execute('SELECT * FROM activities'); // ✅ Use 'pool' instead of 'db'
//     res.status(200).json(rows);
//   } catch (err) {
//     console.error('Error fetching activities:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });

// // Endpoint to fetch a single college by ID
// app.get('/colleges/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const [rows] = await pool.execute('SELECT * FROM colleges WHERE id = ?', [id]);
//     if (rows.length === 0) {
//       return res.status(404).json({ message: 'College not found' });
//     }
//     res.status(200).json(rows[0]);
//   } catch (err) {
//     console.error('Error fetching college:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });

// // Endpoint to fetch all courses
// app.get('/courses', async (req, res) => {
//   try {
//     const [rows] = await pool.execute('SELECT * FROM courses');
//     res.status(200).json(rows);
//   } catch (err) {
//     console.error('Error fetching courses:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });

// // Endpoint to fetch a single course by ID
// app.get('/courses/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const [rows] = await pool.execute('SELECT * FROM courses WHERE id = ?', [id]);
//     if (rows.length === 0) {
//       return res.status(404).json({ message: 'Course not found' });
//     }
//     res.status(200).json(rows[0]);
//   } catch (err) {
//     console.error('Error fetching course:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });

// // Endpoint to add a new course
// app.post('/courses', async (req, res) => {
//   const { name, image_url, description, rating, reviews, price, level, duration, language, subtitles, lectures, assignments, resources, lifetime_access, certificate } = req.body;
//   try {
//     if (!name || !image_url || !description || !rating || !reviews || !price || !level || !duration || !language || !subtitles || lectures === undefined || assignments === undefined || resources === undefined || lifetime_access === undefined || certificate === undefined) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     await pool.execute(
//       'INSERT INTO courses (name, image_url, description, rating, reviews, price, level, duration, language, subtitles, lectures, assignments, resources, lifetime_access, certificate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//       [name, image_url, description, rating, reviews, price, level, duration, language, subtitles, lectures, assignments, resources, lifetime_access, certificate]
//     );

//     res.status(201).json({ message: 'Course added successfully' });
//   } catch (err) {
//     console.error('Error adding course:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });

// // Endpoint to update a course
// app.put('/courses/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, image_url, description, rating, reviews, price, level, duration, language, subtitles, lectures, assignments, resources, lifetime_access, certificate } = req.body;
//   try {
//     if (!name || !image_url || !description || !rating || !reviews || !price || !level || !duration || !language || !subtitles || lectures === undefined || assignments === undefined || resources === undefined || lifetime_access === undefined || certificate === undefined) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const [existingCourses] = await pool.execute('SELECT * FROM courses WHERE id = ?', [id]);
//     if (existingCourses.length === 0) {
//       return res.status(404).json({ message: 'Course not found' });
//     }

//     await pool.execute(
//       'UPDATE courses SET name = ?, image_url = ?, description = ?, rating = ?, reviews = ?, price = ?, level = ?, duration = ?, language = ?, subtitles = ?, lectures = ?, assignments = ?, resources = ?, lifetime_access = ?, certificate = ? WHERE id = ?',
//       [name, image_url, description, rating, reviews, price, level, duration, language, subtitles, lectures, assignments, resources, lifetime_access, certificate, id]
//     );

//     res.status(200).json({ message: 'Course updated successfully' });
//   } catch (err) {
//     console.error('Error updating course:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });

// // Endpoint to register a user
// app.post('/register', async (req, res) => {
//   const { username, password, email, phone_number } = req.body;
//   try {
//     const [existingUsers] = await pool.execute('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);
//     if (existingUsers.length > 0) {
//       return res.status(400).json({ message: 'Username or email already exists' });
//     }

//     await pool.execute(
//       'INSERT INTO users (username, password, email, phone_number) VALUES (?, ?, ?, ?)',
//       [username, password, email, phone_number]
//     );

//     res.status(200).json({ message: 'User registered successfully', username });
//   } catch (err) {
//     console.error('Error during registration:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });

// module.exports = app; // Export the app for testing

// if (require.main === module) {
//   const PORT = 5000;
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }









// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // MySQL connection pool
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'learning_platform',
// });

// // Test database connection (skip in test environment)
// if (process.env.NODE_ENV !== 'test') {
//   pool.getConnection()
//     .then(() => console.log('Connected to MySQL database'))
//     .catch(err => console.error('Database connection failed:', err));
// }

// // Endpoint to fetch user details
// app.get('/users/:username', async (req, res) => {
//   const { username } = req.params;
//   try {
//     const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
//     if (rows.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(rows[0]);
//   } catch (err) {
//     console.error('Error fetching user details:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });






// app.post('/login', async (req, res) => {
//   const { userType, username, password } = req.body;

//   try {
//     let table;
//     switch(userType) {
//       case 'student': table = 'student_logins'; break;
//       case 'college': table = 'college_logins'; break;
//       case 'mnc': table = 'mnc_logins'; break;
//       default: return res.status(400).json({ message: 'Invalid user type' });
//     }

//     const [users] = await pool.execute(
//       `SELECT * FROM ${table} WHERE username = ?`,
//       [username]
//     );

//     if (users.length === 0) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const user = users[0];

//     // Verify password (use bcrypt.compare in production)
//     if (user.password !== password) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // For colleges and MNCs, check verification status
//     if ((userType === 'college' || userType === 'mnc') && !user.is_verified) {
//       return res.status(403).json({ 
//         message: 'Account pending verification. Please contact admin.' 
//       });
//     }

//     // Update last login
//     await pool.execute(
//       `UPDATE ${table} SET last_login = NOW() WHERE id = ?`,
//       [user.id]
//     );

//     // Return user data (omit password)
//     const { password: _, ...userData } = user;
//     res.status(200).json(userData);

//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Login failed' });
//   }
// });








// // Endpoint to fetch all colleges
// app.get('/colleges', async (req, res) => {
//   try {
//     const [rows] = await pool.execute('SELECT * FROM colleges');
//     res.status(200).json(rows);
//   } catch (err) {
//     console.error('Error fetching colleges:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });

// app.get('/activities', async (req, res) => {
//   try {
//     const [rows] = await pool.execute('SELECT * FROM activities'); // ✅ Use 'pool' instead of 'db'
//     res.status(200).json(rows);
//   } catch (err) {
//     console.error('Error fetching activities:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });

// // Endpoint to fetch a single college by ID
// app.get('/colleges/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const [rows] = await pool.execute('SELECT * FROM colleges WHERE id = ?', [id]);
//     if (rows.length === 0) {
//       return res.status(404).json({ message: 'College not found' });
//     }
//     res.status(200).json(rows[0]);
//   } catch (err) {
//     console.error('Error fetching college:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });

// // Endpoint to fetch all courses
// app.get('/courses', async (req, res) => {
//   try {
//     const [rows] = await pool.execute('SELECT * FROM courses');
//     res.status(200).json(rows);
//   } catch (err) {
//     console.error('Error fetching courses:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });

// // Endpoint to fetch a single course by ID
// app.get('/courses/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const [rows] = await pool.execute('SELECT * FROM courses WHERE id = ?', [id]);
//     if (rows.length === 0) {
//       return res.status(404).json({ message: 'Course not found' });
//     }
//     res.status(200).json(rows[0]);
//   } catch (err) {
//     console.error('Error fetching course:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });

// // Endpoint to add a new course
// app.post('/courses', async (req, res) => {
//   const { name, image_url, description, rating, reviews, price, level, duration, language, subtitles, lectures, assignments, resources, lifetime_access, certificate } = req.body;
//   try {
//     if (!name || !image_url || !description || !rating || !reviews || !price || !level || !duration || !language || !subtitles || lectures === undefined || assignments === undefined || resources === undefined || lifetime_access === undefined || certificate === undefined) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     await pool.execute(
//       'INSERT INTO courses (name, image_url, description, rating, reviews, price, level, duration, language, subtitles, lectures, assignments, resources, lifetime_access, certificate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//       [name, image_url, description, rating, reviews, price, level, duration, language, subtitles, lectures, assignments, resources, lifetime_access, certificate]
//     );

//     res.status(201).json({ message: 'Course added successfully' });
//   } catch (err) {
//     console.error('Error adding course:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });

// // Endpoint to update a course
// app.put('/courses/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, image_url, description, rating, reviews, price, level, duration, language, subtitles, lectures, assignments, resources, lifetime_access, certificate } = req.body;
//   try {
//     if (!name || !image_url || !description || !rating || !reviews || !price || !level || !duration || !language || !subtitles || lectures === undefined || assignments === undefined || resources === undefined || lifetime_access === undefined || certificate === undefined) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const [existingCourses] = await pool.execute('SELECT * FROM courses WHERE id = ?', [id]);
//     if (existingCourses.length === 0) {
//       return res.status(404).json({ message: 'Course not found' });
//     }

//     await pool.execute(
//       'UPDATE courses SET name = ?, image_url = ?, description = ?, rating = ?, reviews = ?, price = ?, level = ?, duration = ?, language = ?, subtitles = ?, lectures = ?, assignments = ?, resources = ?, lifetime_access = ?, certificate = ? WHERE id = ?',
//       [name, image_url, description, rating, reviews, price, level, duration, language, subtitles, lectures, assignments, resources, lifetime_access, certificate, id]
//     );

//     res.status(200).json({ message: 'Course updated successfully' });
//   } catch (err) {
//     console.error('Error updating course:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });

// // // Endpoint to register a user
// // app.post('/register', async (req, res) => {
// //   const { username, password, email, phone_number } = req.body;
// //   try {
// //     const [existingUsers] = await pool.execute('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);
// //     if (existingUsers.length > 0) {
// //       return res.status(400).json({ message: 'Username or email already exists' });
// //     }

// //     await pool.execute(
// //       'INSERT INTO users (username, password, email, phone_number) VALUES (?, ?, ?, ?)',
// //       [username, password, email, phone_number]
// //     );

// //     res.status(200).json({ message: 'User registered successfully', username });
// //   } catch (err) {
// //     console.error('Error during registration:', err);
// //     res.status(500).json({ message: `Server error: ${err.message}` });
// //   }
// // });




// app.post('/register', async (req, res) => {
//   const { userType, username, password, email, phone_number } = req.body;

//   try {
//     // Check if username exists in any login table
//     const [existing] = await pool.execute(
//       `SELECT username FROM student_logins WHERE username = ?
//        UNION SELECT username FROM college_logins WHERE username = ?
//        UNION SELECT username FROM mnc_logins WHERE username = ?`,
//       [username, username, username]
//     );

//     if (existing.length > 0) {
//       return res.status(400).json({ message: 'Username already exists' });
//     }

//     // Hash password (use bcrypt in production)
//     const hashedPassword = password; // In real app, hash this

//     if (userType === 'student') {
//       await pool.execute(
//         'INSERT INTO student_logins (username, password, email, phone_number) VALUES (?, ?, ?, ?)',
//         [username, hashedPassword, email, phone_number]
//       );
//     } 
//     else if (userType === 'college') {
//       const { college_id } = req.body; // Should be provided during registration
      
//       await pool.execute(
//         `INSERT INTO college_logins 
//         (username, password, email, phone_number, college_id, verification_documents) 
//         VALUES (?, ?, ?, ?, ?, ?)`,
//         [username, hashedPassword, email, phone_number, college_id, req.body.documents_path]
//       );
//     }
//     else if (userType === 'mnc') {
//       const { mnc_id } = req.body;
      
//       await pool.execute(
//         `INSERT INTO mnc_logins 
//         (username, password, email, phone_number, mnc_id, verification_documents) 
//         VALUES (?, ?, ?, ?, ?, ?)`,
//         [username, hashedPassword, email, phone_number, mnc_id, req.body.documents_path]
//       );
//     }

//     res.status(201).json({ message: 'Registration successful' });
//   } catch (err) {
//     console.error('Registration error:', err);
//     res.status(500).json({ message: 'Registration failed' });
//   }
// });

// // Endpoint to get pending verifications
// app.get('/admin/pending-verifications', async (req, res) => {
//   try {
//     // Verify admin privileges here (add your auth middleware)
    
//     const [pendingColleges] = await pool.execute(
//       'SELECT id, username, college_name, email, created_at FROM colleges WHERE is_verified = FALSE'
//     );
    
//     const [pendingMncs] = await pool.execute(
//       'SELECT id, username, company_name, email, created_at FROM mncs WHERE is_verified = FALSE'
//     );
    
//     res.status(200).json({
//       colleges: pendingColleges,
//       mncs: pendingMncs
//     });
//   } catch (err) {
//     console.error('Error fetching pending verifications:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Endpoint to get verification details
// app.get('/admin/verification-details/:type/:id', async (req, res) => {
//   try {
//     // Verify admin privileges here
    
//     const { type, id } = req.params;
//     let details;
    
//     if (type === 'college') {
//       const [rows] = await pool.execute(
//         'SELECT * FROM colleges WHERE id = ?',
//         [id]
//       );
//       details = rows[0];
//     } else if (type === 'mnc') {
//       const [rows] = await pool.execute(
//         'SELECT * FROM mncs WHERE id = ?',
//         [id]
//       );
//       details = rows[0];
//     } else {
//       return res.status(400).json({ message: 'Invalid type' });
//     }
    
//     if (!details) {
//       return res.status(404).json({ message: 'Not found' });
//     }
    
//     res.status(200).json(details);
//   } catch (err) {
//     console.error('Error fetching verification details:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Endpoint to approve/reject verification
// app.post('/admin/verify-account', async (req, res) => {
//   try {
//     // Verify admin privileges here
    
//     const { type, id, action, notes } = req.body; // action: 'approve' or 'reject'
    
//     if (!['college', 'mnc'].includes(type)) {
//       return res.status(400).json({ message: 'Invalid type' });
//     }
    
//     if (!['approve', 'reject'].includes(action)) {
//       return res.status(400).json({ message: 'Invalid action' });
//     }
    
//     const table = type === 'college' ? 'colleges' : 'mncs';
//     const nameField = type === 'college' ? 'college_name' : 'company_name';
    
//     if (action === 'approve') {
//       await pool.execute(
//         `UPDATE ${table} SET is_verified = TRUE, admin_notes = ? WHERE id = ?`,
//         [notes || 'Account approved', id]
//       );
      
//       // Get the approved account details
//       const [rows] = await pool.execute(
//         `SELECT email, ${nameField} as name FROM ${table} WHERE id = ?`,
//         [id]
//       );
      
//       // Here you would typically send an approval email
//       // sendApprovalEmail(rows[0].email, rows[0].name);
      
//       res.status(200).json({ message: 'Account approved successfully' });
//     } else {
//       // For rejection, you might want to delete the account or just mark it as rejected
//       await pool.execute(
//         `UPDATE ${table} SET admin_notes = ? WHERE id = ?`,
//         [notes || 'Account rejected', id]
//       );
      
//       res.status(200).json({ message: 'Account rejected' });
//     }
//   } catch (err) {
//     console.error('Error during verification:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });






// //API Endpoints
// // app.get('/api/stats', async (req, res) => {
// //   try {
// //     const [candidateStats] = await pool.query(`
// //       SELECT 
// //         COUNT(*) as total,
// //         SUM(status = 'shortlisted') as shortlisted,
// //         SUM(status = 'interview') as interviews,
// //         SUM(status = 'offer') as offers
// //       FROM candidates
// //     `);
    
// //     const [collegeStats] = await pool.query('SELECT SUM(offers) as totalOffers FROM colleges');
    
// //     res.json({
// //       ...candidateStats[0],
// //       offers: Math.max(candidateStats[0].offers, collegeStats[0].totalOffers || 0)
// //     });
// //   } catch (err) {
// //     handleError(res, 'Stats endpoint error:', err);
// //   }
// // });

// app.get('/api/candidates', async (req, res) => {
//   try {
//     const [rows] = await pool.execute('SELECT * FROM candidates');
    
//     const candidates = rows.map(row => ({
//       ...row,
//       // Convert skills string to array if needed
//       skills: row.skills 
//         ? typeof row.skills === 'string'
//           ? row.skills.split(',').map(skill => skill.trim())
//           : row.skills
//         : []
//     }));
    
//     res.json(candidates);
//   } catch (err) {
//     console.error('Error:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// app.get('/api/colleges', async (req, res) => {
//   try {
//     const [rows] = await pool.query('SELECT * FROM colleges');
//     res.json(rows);
//   } catch (err) {
//     handleError(res, 'Colleges endpoint error:', err);
//   }
// });




// app.get('/api/stats', async (req, res) => {
//   try {
//     const [stats] = await pool.query(`
//       SELECT 
//         COUNT(DISTINCT p.company_id) as mncs_visited,
//         SUM(CASE WHEN p.status = 'Selected' THEN 1 ELSE 0 END) as students_selected,
//         MAX(p.package) as highest_package,
//         COUNT(DISTINCT CASE WHEN d.drive_date > CURDATE() THEN p.company_id END) as upcoming_drives
//       FROM placements p
//       LEFT JOIN drives d ON d.company_id = p.company_id
//     `);

//     const formattedStats = [
//       {
//         title: 'MNCs Visited',
//         value: stats[0].mncs_visited || 0,
//         description: 'Total companies visited'
//       },
//       {
//         title: 'Students Selected',
//         value: stats[0].students_selected || 0,
//         description: 'Students placed this year'
//       },
//       {
//         title: 'Highest Package',
//         value: stats[0].highest_package ? `₹${stats[0].highest_package}L` : '₹0L',
//         description: 'Highest offered package'
//       },
//       {
//         title: 'Upcoming Drives',
//         value: stats[0].upcoming_drives || 0,
//         description: 'Scheduled recruitment drives'
//       }
//     ];

//     res.json(formattedStats);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });





// app.get('/api/companies', async (req, res) => {
//   try {
//     const [companies] = await pool.query(`
//       SELECT 
//         c.id,
//         c.name,
//         GROUP_CONCAT(DISTINCT r.name SEPARATOR ', ') as roles,
//         COUNT(p.id) as selected,
//         MAX(p.package) as package,
//         MIN(d.drive_date) as date,
//         MAX(d.process) as process
//       FROM companies c
//       LEFT JOIN placements p ON p.company_id = c.id AND p.status = 'Selected'
//       LEFT JOIN drives d ON d.company_id = c.id
//       LEFT JOIN roles r ON r.company_id = c.id
//       GROUP BY c.id
//       ORDER BY selected DESC
//     `);

//     res.json(companies.map(company => ({
//       ...company,
//       process: company.process || 'Technical Test, Interviews'
//     })));
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// app.get('/api/students', async (req, res) => {
//   try {
//     const [students] = await pool.query(`
//       SELECT 
//         s.id,
//         s.name,
//         d.name as department,
//         c.name as company,
//         p.package,
//         p.status
//       FROM students s
//       LEFT JOIN placements p ON p.student_id = s.id
//       LEFT JOIN companies c ON c.id = p.company_id
//       LEFT JOIN departments d ON d.id = s.department_id
//       ORDER BY p.created_at DESC
//       LIMIT 20
//     `);

//     res.json(students);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });


// module.exports = app; // Export the app for testing

// if (require.main === module) {
//   const PORT = 5000;
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }



















// require('dotenv').config();
// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const multer = require('multer');
// const path = require('path');
// const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
// const fs = require('fs');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Database configuration
// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || 'password',
//   database: process.env.DB_NAME || 'learning_platform',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// // File upload configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     let uploadPath = 'uploads/';
//     if (req.body.userType === 'college') uploadPath += 'colleges/';
//     if (req.body.userType === 'mnc') uploadPath += 'mncs/';
    
//     fs.mkdirSync(uploadPath, { recursive: true });
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({ 
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   fileFilter: (req, file, cb) => {
//     const filetypes = /pdf|doc|docx|jpg|jpeg|png/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
    
//     if (extname && mimetype) {
//       return cb(null, true);
//     } else {
//       cb(new Error('Only PDF, DOC, JPG, and PNG files are allowed'));
//     }
//   }
// });

// // Email transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// // JWT Secret
// const JWT_SECRET = process.env.JWT_SECRET || 'your-strong-secret-here';

// // Auth Middleware
// const authenticate = (roles = []) => {
//   return async (req, res, next) => {
//     try {
//       const token = req.headers.authorization?.split(' ')[1];
//       if (!token) {
//         return res.status(401).json({ success: false, message: 'Authentication required' });
//       }

//       const decoded = jwt.verify(token, JWT_SECRET);
      
//       // Check if user exists and has proper role
//       let table;
//       switch(decoded.role) {
//         case 'student': table = 'student_logins'; break;
//         case 'college': table = 'college_logins'; break;
//         case 'mnc': table = 'mnc_logins'; break;
//         case 'admin': table = 'admins'; break;
//         default: return res.status(403).json({ success: false, message: 'Invalid role' });
//       }

//       const [users] = await pool.execute(
//         `SELECT * FROM ${table} WHERE id = ?`,
//         [decoded.id]
//       );

//       if (!users.length) {
//         return res.status(403).json({ success: false, message: 'User not found' });
//       }
      
//       const user = users[0];
      
//       // Check if role is authorized
//       if (roles.length && !roles.includes(decoded.role)) {
//         return res.status(403).json({ success: false, message: 'Insufficient permissions' });
//       }

//       // Check if account is active
//       if (user.is_active === 0) {
//         return res.status(403).json({ success: false, message: 'Account is deactivated' });
//       }

//       // For colleges and MNCs, check verification status
//       if ((decoded.role === 'college' || decoded.role === 'mnc') && !user.is_verified) {
//         return res.status(403).json({ 
//           success: false, 
//           message: 'Account pending verification. Please contact admin.' 
//         });
//       }

//       req.user = user;
//       req.user.role = decoded.role;
//       next();
//     } catch (err) {
//       console.error('Authentication error:', err);
//       return res.status(401).json({ success: false, message: 'Invalid or expired token' });
//     }
//   };
// };

// // Helper function to send emails
// const sendEmail = async (to, subject, text, html = null) => {
//   try {
//     await transporter.sendMail({
//       from: `"Learning Platform" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       text,
//       html: html || text
//     });
//     return true;
//   } catch (err) {
//     console.error('Email sending error:', err);
//     return false;
//   }
// };

// // Routes

// // Health check endpoint
// app.get('/', (req, res) => {
//   res.status(200).json({ 
//     success: true, 
//     message: 'Learning Platform API is running',
//     timestamp: new Date().toISOString()
//   });
// });

// // Login endpoint
// app.post('/login', async (req, res) => {
//   const { userType, username, password } = req.body;

//   try {
//     // Determine table based on user type
//     let table, role;
//     switch(userType) {
//       case 'student': 
//         table = 'student_logins';
//         role = 'student';
//         break;
//       case 'college': 
//         table = 'college_logins';
//         role = 'college';
//         break;
//       case 'mnc': 
//         table = 'mnc_logins';
//         role = 'mnc';
//         break;
//       case 'admin':
//         table = 'admins';
//         role = 'admin';
//         break;
//       default: 
//         return res.status(400).json({ 
//           success: false, 
//           message: 'Invalid user type' 
//         });
//     }

//     // Find user
//     const [users] = await pool.execute(
//       `SELECT * FROM ${table} WHERE username = ?`,
//       [username]
//     );

//     if (!users.length) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Invalid username or password' 
//       });
//     }

//     const user = users[0];

//     // Verify password
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Invalid username or password' 
//       });
//     }

//     // For colleges and MNCs, check verification status
//     if ((role === 'college' || role === 'mnc') && !user.is_verified) {
//       return res.status(403).json({ 
//         success: false,
//         message: 'Account pending verification. Please contact admin.' 
//       });
//     }

//     // Check if account is active
//     if (user.is_active === 0) {
//       return res.status(403).json({ 
//         success: false,
//         message: 'Account is deactivated. Please contact admin.' 
//       });
//     }

//     // Update last login
//     await pool.execute(
//       `UPDATE ${table} SET last_login = NOW() WHERE id = ?`,
//       [user.id]
//     );

//     // Create JWT token
//     const token = jwt.sign(
//       { 
//         id: user.id, 
//         role, 
//         username: user.username,
//         email: user.email
//       },
//       JWT_SECRET,
//       { expiresIn: '1d' }
//     );

//     // Return user data (without password) and token
//     const { password: _, ...userData } = user;
//     res.status(200).json({ 
//       success: true,
//       data: { 
//         ...userData, 
//         role, 
//         token 
//       } 
//     });

//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Login failed. Please try again later.' 
//     });
//   }
// });

// // Registration endpoint
// app.post('/register', upload.single('documents'), async (req, res) => {
//   const { userType, username, password, email, phone_number } = req.body;
//   const documentsPath = req.file ? req.file.path.replace(/\\/g, '/') : null;

//   try {
//     // Validate required fields
//     if (!userType || !username || !password || !email) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Missing required fields' 
//       });
//     }

//     // Check if username or email exists in any login table
//     const [existing] = await pool.execute(
//       `SELECT username FROM student_logins WHERE username = ? OR email = ?
//        UNION SELECT username FROM college_logins WHERE username = ? OR email = ?
//        UNION SELECT username FROM mnc_logins WHERE username = ? OR email = ?`,
//       [username, email, username, email, username, email]
//     );

//     if (existing.length > 0) {
//       // Delete uploaded file if username/email exists
//       if (req.file) fs.unlink(req.file.path, () => {});
      
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Username or email already exists' 
//       });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     if (userType === 'student') {
//       await pool.execute(
//         'INSERT INTO student_logins (username, password, email, phone_number) VALUES (?, ?, ?, ?)',
//         [username, hashedPassword, email, phone_number]
//       );
      
//       res.status(201).json({ 
//         success: true,
//         message: 'Student registration successful' 
//       });
//     } 
//     else if (userType === 'college') {
//       const { college_name, address, contact_person, contact_position } = req.body;
      
//       if (!college_name || !address || !contact_person || !contact_position) {
//         if (req.file) fs.unlink(req.file.path, () => {});
//         return res.status(400).json({ 
//           success: false, 
//           message: 'Missing college information' 
//         });
//       }

//       // Start transaction
//       const connection = await pool.getConnection();
//       await connection.beginTransaction();

//       try {
//         // First create college record
//         const [collegeResult] = await connection.execute(
//           `INSERT INTO colleges 
//           (name, address, contact_person, contact_position) 
//           VALUES (?, ?, ?, ?)`,
//           [college_name, address, contact_person, contact_position]
//         );
        
//         // Then create login record
//         await connection.execute(
//           `INSERT INTO college_logins 
//           (username, password, email, phone_number, college_id, verification_documents) 
//           VALUES (?, ?, ?, ?, ?, ?)`,
//           [username, hashedPassword, email, phone_number, collegeResult.insertId, documentsPath]
//         );
        
//         await connection.commit();
        
//         // Notify admin
//         await sendEmail(
//           process.env.ADMIN_EMAIL,
//           'New College Registration',
//           `A new college has registered:\n\n` +
//           `Name: ${college_name}\n` +
//           `Username: ${username}\n` +
//           `Contact: ${contact_person} (${contact_position})\n\n` +
//           `Please review in admin panel.`
//         );
        
//         res.status(201).json({ 
//           success: true,
//           message: 'College registration submitted for admin approval' 
//         });
//       } catch (err) {
//         await connection.rollback();
//         throw err;
//       } finally {
//         connection.release();
//       }
//     }
//     else if (userType === 'mnc') {
//       const { company_name, industry, address, contact_person, contact_position } = req.body;
      
//       if (!company_name || !industry || !address || !contact_person || !contact_position) {
//         if (req.file) fs.unlink(req.file.path, () => {});
//         return res.status(400).json({ 
//           success: false, 
//           message: 'Missing MNC information' 
//         });
//       }

//       // Start transaction
//       const connection = await pool.getConnection();
//       await connection.beginTransaction();

//       try {
//         // First create MNC record
//         const [mncResult] = await connection.execute(
//           `INSERT INTO mncs 
//           (name, industry, address, contact_person, contact_position) 
//           VALUES (?, ?, ?, ?, ?)`,
//           [company_name, industry, address, contact_person, contact_position]
//         );
        
//         // Then create login record
//         await connection.execute(
//           `INSERT INTO mnc_logins 
//           (username, password, email, phone_number, mnc_id, verification_documents) 
//           VALUES (?, ?, ?, ?, ?, ?)`,
//           [username, hashedPassword, email, phone_number, mncResult.insertId, documentsPath]
//         );
        
//         await connection.commit();
        
//         // Notify admin
//         await sendEmail(
//           process.env.ADMIN_EMAIL,
//           'New MNC Registration',
//           `A new MNC has registered:\n\n` +
//           `Name: ${company_name}\n` +
//           `Industry: ${industry}\n` +
//           `Username: ${username}\n` +
//           `Contact: ${contact_person} (${contact_position})\n\n` +
//           `Please review in admin panel.`
//         );
        
//         res.status(201).json({ 
//           success: true,
//           message: 'MNC registration submitted for admin approval' 
//         });
//       } catch (err) {
//         await connection.rollback();
//         throw err;
//       } finally {
//         connection.release();
//       }
//     } else {
//       if (req.file) fs.unlink(req.file.path, () => {});
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid user type' 
//       });
//     }
//   } catch (err) {
//     console.error('Registration error:', err);
    
//     // Delete uploaded file if registration failed
//     if (req.file) fs.unlink(req.file.path, () => {});
    
//     res.status(500).json({ 
//       success: false,
//       message: 'Registration failed. Please try again.' 
//     });
//   }
// });

// // Admin endpoints
// app.get('/admin/pending-verifications', authenticate(['admin']), async (req, res) => {
//   try {
//     const [pendingColleges] = await pool.execute(
//       `SELECT cl.id, cl.username, cl.email, cl.created_at, cl.verification_documents,
//        c.name as college_name, c.address, c.contact_person, c.contact_position
//        FROM college_logins cl
//        JOIN colleges c ON c.id = cl.college_id
//        WHERE cl.is_verified = FALSE AND cl.is_active = TRUE`
//     );
    
//     const [pendingMncs] = await pool.execute(
//       `SELECT ml.id, ml.username, ml.email, ml.created_at, ml.verification_documents,
//        m.name as company_name, m.industry, m.address, m.contact_person, m.contact_position
//        FROM mnc_logins ml
//        JOIN mncs m ON m.id = ml.mnc_id
//        WHERE ml.is_verified = FALSE AND ml.is_active = TRUE`
//     );
    
//     res.status(200).json({ 
//       success: true,
//       data: {
//         colleges: pendingColleges,
//         mncs: pendingMncs
//       }
//     });
//   } catch (err) {
//     console.error('Error fetching pending verifications:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to fetch pending verifications' 
//     });
//   }
// });

// app.get('/admin/verification-details/:type/:id', authenticate(['admin']), async (req, res) => {
//   try {
//     const { type, id } = req.params;
//     let details;
    
//     if (type === 'college') {
//       const [rows] = await pool.execute(
//         `SELECT cl.*, c.name as college_name, c.address, c.contact_person, c.contact_position
//          FROM college_logins cl
//          JOIN colleges c ON c.id = cl.college_id
//          WHERE cl.id = ?`,
//         [id]
//       );
//       details = rows[0];
//     } else if (type === 'mnc') {
//       const [rows] = await pool.execute(
//         `SELECT ml.*, m.name as company_name, m.industry, m.address, m.contact_person, m.contact_position
//          FROM mnc_logins ml
//          JOIN mncs m ON m.id = ml.mnc_id
//          WHERE ml.id = ?`,
//         [id]
//       );
//       details = rows[0];
//     } else {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Invalid account type' 
//       });
//     }
    
//     if (!details) {
//       return res.status(404).json({ 
//         success: false,
//         message: 'Account not found' 
//       });
//     }
    
//     res.status(200).json({ 
//       success: true,
//       data: details
//     });
//   } catch (err) {
//     console.error('Error fetching verification details:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to fetch account details' 
//     });
//   }
// });

// app.post('/admin/verify-account', authenticate(['admin']), async (req, res) => {
//   try {
//     const { type, id, action, notes } = req.body;
    
//     if (!['college', 'mnc'].includes(type)) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Invalid account type' 
//       });
//     }
    
//     if (!['approve', 'reject'].includes(action)) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Invalid action' 
//       });
//     }
    
//     const loginTable = type === 'college' ? 'college_logins' : 'mnc_logins';
//     const mainTable = type === 'college' ? 'colleges' : 'mncs';
//     const nameField = type === 'college' ? 'college_name' : 'company_name';
    
//     // Get account details
//     const [account] = await pool.execute(
//       `SELECT l.email, l.username, m.name 
//        FROM ${loginTable} l
//        JOIN ${mainTable} m ON m.id = l.${type}_id
//        WHERE l.id = ? AND l.is_verified = FALSE`,
//       [id]
//     );
    
//     if (!account.length) {
//       return res.status(404).json({ 
//         success: false,
//         message: 'Account not found or already verified' 
//       });
//     }
    
//     const { email, username, name } = account[0];
//     const adminNotes = notes || (action === 'approve' ? 'Account approved by admin' : 'Account rejected by admin');
    
//     if (action === 'approve') {
//       await pool.execute(
//         `UPDATE ${loginTable} SET is_verified = TRUE, admin_notes = ? WHERE id = ?`,
//         [adminNotes, id]
//       );
      
//       // Send approval email
//       const emailSent = await sendEmail(
//         email,
//         'Account Approved',
//         `Dear ${username},\n\n` +
//         `Your ${type} account (${name}) has been approved by the administrator.\n\n` +
//         `You can now login to the system using your credentials.\n\n` +
//         `Best regards,\nThe Learning Platform Team`,
//         `<p>Dear ${username},</p>
//          <p>Your ${type} account (<strong>${name}</strong>) has been approved by the administrator.</p>
//          <p>You can now login to the system using your credentials.</p>
//          <p>Best regards,<br>The Learning Platform Team</p>`
//       );
      
//       if (!emailSent) {
//         console.warn(`Failed to send approval email to ${email}`);
//       }
      
//       res.status(200).json({ 
//         success: true,
//         message: 'Account approved successfully' 
//       });
//     } else {
//       await pool.execute(
//         `UPDATE ${loginTable} SET is_active = FALSE, admin_notes = ? WHERE id = ?`,
//         [adminNotes, id]
//       );
      
//       // Send rejection email
//       const emailSent = await sendEmail(
//         email,
//         'Account Rejected',
//         `Dear ${username},\n\n` +
//         `We regret to inform you that your ${type} account (${name}) registration has been rejected.\n\n` +
//         `Reason: ${notes || 'Not specified'}\n\n` +
//         `If you believe this is a mistake, please contact the administrator.\n\n` +
//         `Best regards,\nThe Learning Platform Team`,
//         `<p>Dear ${username},</p>
//          <p>We regret to inform you that your ${type} account (<strong>${name}</strong>) registration has been rejected.</p>
//          <p>Reason: ${notes || 'Not specified'}</p>
//          <p>If you believe this is a mistake, please contact the administrator.</p>
//          <p>Best regards,<br>The Learning Platform Team</p>`
//       );
      
//       if (!emailSent) {
//         console.warn(`Failed to send rejection email to ${email}`);
//       }
      
//       res.status(200).json({ 
//         success: true,
//         message: 'Account rejected' 
//       });
//     }
//   } catch (err) {
//     console.error('Error during verification:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to process verification' 
//     });
//   }
// });

// // Password reset endpoints
// app.post('/request-password-reset', async (req, res) => {
//   const { email, userType } = req.body;
  
//   try {
//     if (!email || !userType) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Email and user type are required' 
//       });
//     }

//     let table;
//     switch(userType) {
//       case 'student': table = 'student_logins'; break;
//       case 'college': table = 'college_logins'; break;
//       case 'mnc': table = 'mnc_logins'; break;
//       default: return res.status(400).json({ 
//         success: false,
//         message: 'Invalid user type' 
//       });
//     }
    
//     const [users] = await pool.execute(
//       `SELECT id, email FROM ${table} WHERE email = ? AND is_active = TRUE`,
//       [email]
//     );
    
//     if (users.length) {
//       const user = users[0];
//       const resetToken = jwt.sign(
//         { 
//           id: user.id, 
//           email: user.email, 
//           userType,
//           purpose: 'password_reset'
//         },
//         JWT_SECRET,
//         { expiresIn: '1h' }
//       );
      
//       const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
      
//       const emailSent = await sendEmail(
//         email,
//         'Password Reset Request',
//         `You requested to reset your password. Click this link to proceed:\n\n${resetLink}\n\n` +
//         `This link will expire in 1 hour. If you didn't request this, please ignore this email.`,
//         `<p>You requested to reset your password. Click <a href="${resetLink}">this link</a> to proceed:</p>
//          <p><a href="${resetLink}">${resetLink}</a></p>
//          <p>This link will expire in 1 hour. If you didn't request this, please ignore this email.</p>`
//       );
      
//       if (!emailSent) {
//         console.error(`Failed to send password reset email to ${email}`);
//       }
//     }
    
//     // Always return success to prevent email enumeration
//     res.status(200).json({ 
//       success: true,
//       message: 'If an account exists with this email, a reset link has been sent' 
//     });
//   } catch (err) {
//     console.error('Password reset request error:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to process password reset request' 
//     });
//   }
// });

// app.post('/reset-password', async (req, res) => {
//   const { token, newPassword } = req.body;
  
//   try {
//     if (!token || !newPassword) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Token and new password are required' 
//       });
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
    
//     // Verify this is a password reset token
//     if (decoded.purpose !== 'password_reset') {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Invalid token type' 
//       });
//     }
    
//     const { id, userType, email } = decoded;
    
//     let table;
//     switch(userType) {
//       case 'student': table = 'student_logins'; break;
//       case 'college': table = 'college_logins'; break;
//       case 'mnc': table = 'mnc_logins'; break;
//       default: return res.status(400).json({ 
//         success: false,
//         message: 'Invalid token' 
//       });
//     }
    
//     // Verify password strength
//     if (newPassword.length < 8) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Password must be at least 8 characters long' 
//       });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
    
//     await pool.execute(
//       `UPDATE ${table} SET password = ? WHERE id = ? AND email = ?`,
//       [hashedPassword, id, email]
//     );
    
//     // Notify user of password change
//     const emailSent = await sendEmail(
//       email,
//       'Password Changed Successfully',
//       'Your password has been successfully changed.\n\n' +
//       'If you did not make this change, please contact support immediately.',
//       `<p>Your password has been successfully changed.</p>
//        <p>If you did not make this change, please contact support immediately.</p>`
//     );
    
//     if (!emailSent) {
//       console.warn(`Failed to send password change notification to ${email}`);
//     }
    
//     res.status(200).json({ 
//       success: true,
//       message: 'Password reset successfully' 
//     });
//   } catch (err) {
//     console.error('Password reset error:', err);
//     res.status(400).json({ 
//       success: false,
//       message: err.name === 'TokenExpiredError' 
//         ? 'Token has expired' 
//         : 'Invalid or expired token' 
//     });
//   }
// });

// // User profile endpoint
// app.get('/profile', authenticate(), async (req, res) => {
//   try {
//     let table, joinClause = '';
//     switch(req.user.role) {
//       case 'student': 
//         table = 'student_logins';
//         break;
//       case 'college': 
//         table = 'college_logins';
//         joinClause = 'JOIN colleges c ON c.id = college_id';
//         break;
//       case 'mnc': 
//         table = 'mnc_logins';
//         joinClause = 'JOIN mncs m ON m.id = mnc_id';
//         break;
//       case 'admin':
//         table = 'admins';
//         break;
//     }

//     const [users] = await pool.execute(
//       `SELECT l.* ${joinClause ? ', c.*' : ''}
//        FROM ${table} l
//        ${joinClause}
//        WHERE l.id = ?`,
//       [req.user.id]
//     );

//     if (!users.length) {
//       return res.status(404).json({ 
//         success: false,
//         message: 'User not found' 
//       });
//     }

//     const user = users[0];
//     const { password, ...userData } = user;
    
//     res.status(200).json({ 
//       success: true,
//       data: userData 
//     });
//   } catch (err) {
//     console.error('Profile fetch error:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to fetch profile' 
//     });
//   }
// });

// // Existing endpoints (courses, colleges, etc.)
// app.get('/colleges', async (req, res) => {
//   try {
//     const [rows] = await pool.execute(
//       'SELECT id, name, address FROM colleges WHERE is_active = TRUE'
//     );
//     res.status(200).json({ 
//       success: true,
//       data: rows 
//     });
//   } catch (err) {
//     console.error('Error fetching colleges:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to fetch colleges' 
//     });
//   }
// });

// app.get('/colleges/:id', async (req, res) => {
//   try {
//     const [rows] = await pool.execute(
//       'SELECT id, name, address, contact_person, contact_position FROM colleges WHERE id = ? AND is_active = TRUE',
//       [req.params.id]
//     );
    
//     if (!rows.length) {
//       return res.status(404).json({ 
//         success: false,
//         message: 'College not found' 
//       });
//     }
    
//     res.status(200).json({ 
//       success: true,
//       data: rows[0] 
//     });
//   } catch (err) {
//     console.error('Error fetching college:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to fetch college details' 
//     });
//   }
// });

// app.get('/courses', async (req, res) => {
//   try {
//     const [rows] = await pool.execute(
//       'SELECT id, name, description, level, duration FROM courses WHERE is_active = TRUE'
//     );
//     res.status(200).json({ 
//       success: true,
//       data: rows 
//     });
//   } catch (err) {
//     console.error('Error fetching courses:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to fetch courses' 
//     });
//   }
// });

// app.get('/courses/:id', async (req, res) => {
//   try {
//     const [rows] = await pool.execute(
//       `SELECT id, name, description, image_url, rating, reviews, price, 
//        level, duration, language, subtitles, lectures, assignments, 
//        resources, lifetime_access, certificate
//        FROM courses WHERE id = ? AND is_active = TRUE`,
//       [req.params.id]
//     );
    
//     if (!rows.length) {
//       return res.status(404).json({ 
//         success: false,
//         message: 'Course not found' 
//       });
//     }
    
//     res.status(200).json({ 
//       success: true,
//       data: rows[0] 
//     });
//   } catch (err) {
//     console.error('Error fetching course:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to fetch course details' 
//     });
//   }
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
  
//   // Multer file size limit error
//   if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
//     return res.status(413).json({ 
//       success: false,
//       message: 'File size too large. Maximum 5MB allowed.' 
//     });
//   }
  
//   // Multer file type error
//   if (err.message === 'Only PDF, DOC, JPG, and PNG files are allowed') {
//     return res.status(400).json({ 
//       success: false,
//       message: err.message 
//     });
//   }
  
//   res.status(500).json({ 
//     success: false,
//     message: 'Something went wrong!' 
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ 
//     success: false,
//     message: 'Endpoint not found' 
//   });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
// });        for email verification

















// require('dotenv').config();
// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const multer = require('multer');
// const path = require('path');
// const jwt = require('jsonwebtoken');
// const fs = require('fs');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Database configuration
// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || 'password',
//   database: process.env.DB_NAME || 'learning_platform',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // File upload configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     let uploadPath = 'uploads/';
//     if (req.body.userType === 'college') uploadPath += 'colleges/';
//     if (req.body.userType === 'mnc') uploadPath += 'mncs/';
    
//     fs.mkdirSync(uploadPath, { recursive: true });
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ 
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   fileFilter: (req, file, cb) => {
//     const filetypes = /pdf|doc|docx|jpg|jpeg|png/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
    
//     if (extname && mimetype) {
//       return cb(null, true);
//     } else {
//       cb(new Error('Only PDF, DOC, JPG, and PNG files are allowed'));
//     }
//   },
// });

// // JWT Secret
// const JWT_SECRET = process.env.JWT_SECRET || 'your-strong-secret-here';

// // Auth Middleware
// const authenticate = (roles = []) => {
//   return async (req, res, next) => {
//     try {
//       const token = req.headers.authorization?.split(' ')[1];
//       if (!token) {
//         return res.status(401).json({ success: false, message: 'Authentication required' });
//       }

//       const decoded = jwt.verify(token, JWT_SECRET);
      
//       let table;
//       switch(decoded.role) {
//         case 'student': table = 'student_logins'; break;
//         case 'college': table = 'college_logins'; break;
//         case 'mnc': table = 'mnc_logins'; break;
//         case 'admin': table = 'admins'; break;
//         default: return res.status(403).json({ success: false, message: 'Invalid role' });
//       }

//       const [users] = await pool.execute(
//         `SELECT * FROM ${table} WHERE id = ?`,
//         [decoded.id]
//       );

//       if (!users.length) {
//         return res.status(403).json({ success: false, message: 'User not found' });
//       }
      
//       const user = users[0];
      
//       if (roles.length && !roles.includes(decoded.role)) {
//         return res.status(403).json({ success: false, message: 'Insufficient permissions' });
//       }

//       if (user.is_active === 0) {
//         return res.status(403).json({ success: false, message: 'Account is deactivated' });
//       }

//       if ((decoded.role === 'college' || decoded.role === 'mnc') && !user.is_verified) {
//         return res.status(403).json({ 
//           success: false, 
//           message: 'Account pending verification. Please contact admin.' 
//         });
//       }

//       req.user = user;
//       req.user.role = decoded.role;
//       next();
//     } catch (err) {
//       console.error('Authentication error:', err);
//       return res.status(401).json({ success: false, message: 'Invalid or expired token' });
//     }
//   };
// };

// // Routes

// // Health check endpoint
// app.get('/', (req, res) => {
//   res.status(200).json({ 
//     success: true, 
//     message: 'Learning Platform API is running',
//     timestamp: new Date().toISOString(),
//   });
// });

// // Login endpoint
// app.post('/login', async (req, res) => {
//   const { userType, username, password } = req.body;

//   try {
//     let table, role;
//     switch(userType) {
//       case 'student': 
//         table = 'student_logins';
//         role = 'student';
//         break;
//       case 'college': 
//         table = 'college_logins';
//         role = 'college';
//         break;
//       case 'mnc': 
//         table = 'mnc_logins';
//         role = 'mnc';
//         break;
//       case 'admin':
//         table = 'admins';
//         role = 'admin';
//         break;
//       default: 
//         return res.status(400).json({ 
//           success: false, 
//           message: 'Invalid user type' 
//         });
//     }

//     const [users] = await pool.execute(
//       `SELECT * FROM ${table} WHERE username = ?`,
//       [username]
//     );

//     if (!users.length) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Invalid username or password' 
//       });
//     }

//     const user = users[0];

//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Invalid username or password' 
//       });
//     }

//     if ((role === 'college' || role === 'mnc') && !user.is_verified) {
//       return res.status(403).json({ 
//         success: false,
//         message: 'Account pending verification. Please contact admin.' 
//       });
//     }

//     if (user.is_active === 0) {
//       return res.status(403).json({ 
//         success: false,
//         message: 'Account is deactivated. Please contact admin.' 
//       });
//     }

//     await pool.execute(
//       `UPDATE ${table} SET last_login = NOW() WHERE id = ?`,
//       [user.id]
//     );

//     const token = jwt.sign(
//       { 
//         id: user.id, 
//         role, 
//         username: user.username,
//         email: user.email,
//       },
//       JWT_SECRET,
//       { expiresIn: '1d' }
//     );

//     const { password: _, ...userData } = user;
//     res.status(200).json({ 
//       success: true,
//       data: { 
//         ...userData, 
//         role, 
//         token 
//       } 
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Login failed. Please try again later.' 
//     });
//   }
// });

// // Registration endpoint
// app.post('/register', upload.single('documents'), async (req, res) => {
//   const { userType, username, password, email, phone_number } = req.body;
//   const documentsPath = req.file ? req.file.path.replace(/\\/g, '/') : null;

//   try {
//     if (!userType || !username || !password || !email) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Missing required fields' 
//       });
//     }

//     const [existing] = await pool.execute(
//       `SELECT username FROM student_logins WHERE username = ? OR email = ?
//        UNION SELECT username FROM college_logins WHERE username = ? OR email = ?
//        UNION SELECT username FROM mnc_logins WHERE username = ? OR email = ?`,
//       [username, email, username, email, username, email]
//     );

//     if (existing.length > 0) {
//       if (req.file) fs.unlink(req.file.path, () => {});
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Username or email already exists' 
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const otp = Math.floor(1000 + Math.random() * 9000).toString(); // Generate OTP

//     if (userType === 'student') {
//       const [result] = await pool.execute(
//         'INSERT INTO student_logins (username, password, email, phone_number) VALUES (?, ?, ?, ?)',
//         [username, hashedPassword, email, phone_number]
//       );

//       const token = jwt.sign(
//         { id: result.insertId, role: 'student', username, email },
//         JWT_SECRET,
//         { expiresIn: '1d' }
//       );

//       res.status(201).json({ 
//         success: true,
//         message: 'Student registration successful',
//         otp,
//         token,
//       });
//     } else if (userType === 'college') {
//       const { college_name, address, contact_person, contact_position } = req.body;
      
//       if (!college_name || !address || !contact_person || !contact_position) {
//         if (req.file) fs.unlink(req.file.path, () => {});
//         return res.status(400).json({ 
//           success: false, 
//           message: 'Missing college information' 
//         });
//       }

//       const connection = await pool.getConnection();
//       await connection.beginTransaction();

//       try {
//         const [collegeResult] = await connection.execute(
//           `INSERT INTO colleges 
//           (name, address, contact_person, contact_position) 
//           VALUES (?, ?, ?, ?)`,
//           [college_name, address, contact_person, contact_position]
//         );
        
//         const [loginResult] = await connection.execute(
//           `INSERT INTO college_logins 
//           (username, password, email, phone_number, college_id, verification_documents) 
//           VALUES (?, ?, ?, ?, ?, ?)`,
//           [username, hashedPassword, email, phone_number, collegeResult.insertId, documentsPath]
//         );
        
//         await connection.commit();

//         const token = jwt.sign(
//           { id: loginResult.insertId, role: 'college', username, email },
//           JWT_SECRET,
//           { expiresIn: '1d' }
//         );

//         res.status(201).json({ 
//           success: true,
//           message: 'College registration submitted for admin approval',
//           otp,
//           token,
//         });
//       } catch (err) {
//         await connection.rollback();
//         throw err;
//       } finally {
//         connection.release();
//       }
//     } else if (userType === 'mnc') {
//       const { company_name, industry, address, contact_person, contact_position } = req.body;
      
//       if (!company_name || !industry || !address || !contact_person || !contact_position) {
//         if (req.file) fs.unlink(req.file.path, () => {});
//         return res.status(400).json({ 
//           success: false, 
//           message: 'Missing MNC information' 
//         });
//       }

//       const connection = await pool.getConnection();
//       await connection.beginTransaction();

//       try {
//         const [mncResult] = await connection.execute(
//           `INSERT INTO mncs 
//           (name, industry, address, contact_person, contact_position) 
//           VALUES (?, ?, ?, ?, ?)`,
//           [company_name, industry, address, contact_person, contact_position]
//         );
        
//         const [loginResult] = await connection.execute(
//           `INSERT INTO mnc_logins 
//           (username, password, email, phone_number, mnc_id, verification_documents) 
//           VALUES (?, ?, ?, ?, ?, ?)`,
//           [username, hashedPassword, email, phone_number, mncResult.insertId, documentsPath]
//         );
        
//         await connection.commit();

//         const token = jwt.sign(
//           { id: loginResult.insertId, role: 'mnc', username, email },
//           JWT_SECRET,
//           { expiresIn: '1d' }
//         );

//         res.status(201).json({ 
//           success: true,
//           message: 'MNC registration submitted for admin approval',
//           otp,
//           token,
//         });
//       } catch (err) {
//         await connection.rollback();
//         throw err;
//       } finally {
//         connection.release();
//       }
//     } else {
//       if (req.file) fs.unlink(req.file.path, () => {});
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid user type' 
//       });
//     }
//   } catch (err) {
//     console.error('Registration error:', err);
//     if (req.file) fs.unlink(req.file.path, () => {});
//     res.status(500).json({ 
//       success: false,
//       message: 'Registration failed. Please try again.',
//     });
//   }
// });

// // Admin endpoints
// app.get('/admin/pending-verifications', authenticate(['admin']), async (req, res) => {
//   try {
//     const [pendingColleges] = await pool.execute(
//       `SELECT cl.id, cl.username, cl.email, cl.created_at, cl.verification_documents,
//        c.name as college_name, c.address, c.contact_person, c.contact_position
//        FROM college_logins cl
//        JOIN colleges c ON c.id = cl.college_id
//        WHERE cl.is_verified = FALSE AND cl.is_active = TRUE`
//     );
    
//     const [pendingMncs] = await pool.execute(
//       `SELECT ml.id, ml.username, ml.email, ml.created_at, ml.verification_documents,
//        m.name as company_name, m.industry, m.address, m.contact_person, m.contact_position
//        FROM mnc_logins ml
//        JOIN mncs m ON m.id = ml.mnc_id
//        WHERE ml.is_verified = FALSE AND ml.is_active = TRUE`
//     );
    
//     res.status(200).json({ 
//       success: true,
//       data: {
//         colleges: pendingColleges,
//         mncs: pendingMncs,
//       },
//     });
//   } catch (err) {
//     console.error('Error fetching pending verifications:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to fetch pending verifications',
//     });
//   }
// });

// app.get('/admin/verification-details/:type/:id', authenticate(['admin']), async (req, res) => {
//   try {
//     const { type, id } = req.params;
//     let details;
    
//     if (type === 'college') {
//       const [rows] = await pool.execute(
//         `SELECT cl.*, c.name as college_name, c.address, c.contact_person, c.contact_position
//          FROM college_logins cl
//          JOIN colleges c ON c.id = cl.college_id
//          WHERE cl.id = ?`,
//         [id]
//       );
//       details = rows[0];
//     } else if (type === 'mnc') {
//       const [rows] = await pool.execute(
//         `SELECT ml.*, m.name as company_name, m.industry, m.address, m.contact_person, m.contact_position
//          FROM mnc_logins ml
//          JOIN mncs m ON m.id = ml.mnc_id
//          WHERE ml.id = ?`,
//         [id]
//       );
//       details = rows[0];
//     } else {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Invalid account type' 
//       });
//     }
    
//     if (!details) {
//       return res.status(404).json({ 
//         success: false,
//         message: 'Account not found' 
//       });
//     }
    
//     res.status(200).json({ 
//       success: true,
//       data: details,
//     });
//   } catch (err) {
//     console.error('Error fetching verification details:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to fetch account details' 
//     });
//   }
// });

// app.post('/admin/verify-account', authenticate(['admin']), async (req, res) => {
//   try {
//     const { type, id, action, notes } = req.body;
    
//     if (!['college', 'mnc'].includes(type)) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Invalid account type' 
//       });
//     }
    
//     if (!['approve', 'reject'].includes(action)) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Invalid action' 
//       });
//     }
    
//     const loginTable = type === 'college' ? 'college_logins' : 'mnc_logins';
//     const mainTable = type === 'college' ? 'colleges' : 'mncs';
//     const nameField = type === 'college' ? 'college_name' : 'company_name';
    
//     const [account] = await pool.execute(
//       `SELECT l.email, l.username, m.name 
//        FROM ${loginTable} l
//        JOIN ${mainTable} m ON m.id = l.${type}_id
//        WHERE l.id = ? AND l.is_verified = FALSE`,
//       [id]
//     );
    
//     if (!account.length) {
//       return res.status(404).json({ 
//         success: false,
//         message: 'Account not found or already verified' 
//       });
//     }
    
//     const { username, name } = account[0];
//     const adminNotes = notes || (action === 'approve' ? 'Account approved by admin' : 'Account rejected by admin');
    
//     if (action === 'approve') {
//       await pool.execute(
//         `UPDATE ${loginTable} SET is_verified = TRUE, admin_notes = ? WHERE id = ?`,
//         [adminNotes, id]
//       );
      
//       res.status(200).json({ 
//         success: true,
//         message: 'Account approved successfully' 
//       });
//     } else {
//       await pool.execute(
//         `UPDATE ${loginTable} SET is_active = FALSE, admin_notes = ? WHERE id = ?`,
//         [adminNotes, id]
//       );
      
//       res.status(200).json({ 
//         success: true,
//         message: 'Account rejected' 
//       });
//     }
//   } catch (err) {
//     console.error('Error during verification:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to process verification' 
//     });
//   }
// });

// // Password reset endpoints
// app.post('/request-password-reset', async (req, res) => {
//   const { email, userType } = req.body;
  
//   try {
//     if (!email || !userType) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Email and user type are required' 
//       });
//     }

//     let table;
//     switch(userType) {
//       case 'student': table = 'student_logins'; break;
//       case 'college': table = 'college_logins'; break;
//       case 'mnc': table = 'mnc_logins'; break;
//       default: return res.status(400).json({ 
//         success: false,
//         message: 'Invalid user type' 
//       });
//     }
    
//     const [users] = await pool.execute(
//       `SELECT id, email FROM ${table} WHERE email = ? AND is_active = TRUE`,
//       [email]
//     );
    
//     if (users.length) {
//       const user = users[0];
//       const resetToken = jwt.sign(
//         { 
//           id: user.id, 
//           email: user.email, 
//           userType,
//           purpose: 'password_reset'
//         },
//         JWT_SECRET,
//         { expiresIn: '1h' }
//       );
      
//       // Since no email, return reset token directly (for testing purposes)
//       res.status(200).json({ 
//         success: true,
//         message: 'Reset token generated (normally sent via email)',
//         resetToken,
//       });
//     } else {
//       res.status(200).json({ 
//         success: true,
//         message: 'If an account exists with this email, a reset link would be sent' 
//       });
//     }
//   } catch (err) {
//     console.error('Password reset request error:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to process password reset request' 
//     });
//   }
// });

// app.post('/reset-password', async (req, res) => {
//   const { token, newPassword } = req.body;
  
//   try {
//     if (!token || !newPassword) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Token and new password are required' 
//       });
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
    
//     if (decoded.purpose !== 'password_reset') {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Invalid token type' 
//       });
//     }
    
//     const { id, userType, email } = decoded;
    
//     let table;
//     switch(userType) {
//       case 'student': table = 'student_logins'; break;
//       case 'college': table = 'college_logins'; break;
//       case 'mnc': table = 'mnc_logins'; break;
//       default: return res.status(400).json({ 
//         success: false,
//         message: 'Invalid token' 
//       });
//     }
    
//     if (newPassword.length < 8) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Password must be at least 8 characters long' 
//       });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
    
//     await pool.execute(
//       `UPDATE ${table} SET password = ? WHERE id = ? AND email = ?`,
//       [hashedPassword, id, email]
//     );
    
//     res.status(200).json({ 
//       success: true,
//       message: 'Password reset successfully' 
//     });
//   } catch (err) {
//     console.error('Password reset error:', err);
//     res.status(400).json({ 
//       success: false,
//       message: err.name === 'TokenExpiredError' 
//         ? 'Token has expired' 
//         : 'Invalid or expired token' 
//     });
//   }
// });

// // User profile endpoint
// app.get('/profile', authenticate(), async (req, res) => {
//   try {
//     let table, joinClause = '';
//     switch(req.user.role) {
//       case 'student': 
//         table = 'student_logins';
//         break;
//       case 'college': 
//         table = 'college_logins';
//         joinClause = 'JOIN colleges c ON c.id = college_id';
//         break;
//       case 'mnc': 
//         table = 'mnc_logins';
//         joinClause = 'JOIN mncs m ON m.id = mnc_id';
//         break;
//       case 'admin':
//         table = 'admins';
//         break;
//     }

//     const [users] = await pool.execute(
//       `SELECT l.* ${joinClause ? ', c.*' : ''}
//        FROM ${table} l
//        ${joinClause}
//        WHERE l.id = ?`,
//       [req.user.id]
//     );

//     if (!users.length) {
//       return res.status(404).json({ 
//         success: false,
//         message: 'User not found' 
//       });
//     }

//     const user = users[0];
//     const { password, ...userData } = user;
    
//     res.status(200).json({ 
//       success: true,
//       data: userData 
//     });
//   } catch (err) {
//     console.error('Profile fetch error:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to fetch profile' 
//     });
//   }
// });

// // Other endpoints
// app.get('/colleges', async (req, res) => {
//   try {
//     const [rows] = await pool.execute(
//       'SELECT id, name, address FROM colleges WHERE is_active = TRUE'
//     );
//     res.status(200).json({ 
//       success: true,
//       data: rows 
//     });
//   } catch (err) {
//     console.error('Error fetching colleges:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to fetch colleges' 
//     });
//   }
// });

// app.get('/colleges/:id', async (req, res) => {
//   try {
//     const [rows] = await pool.execute(
//       'SELECT id, name, address, contact_person, contact_position FROM colleges WHERE id = ? AND is_active = TRUE',
//       [req.params.id]
//     );
    
//     if (!rows.length) {
//       return res.status(404).json({ 
//         success: false,
//         message: 'College not found' 
//       });
//     }
    
//     res.status(200).json({ 
//       success: true,
//       data: rows[0] 
//     });
//   } catch (err) {
//     console.error('Error fetching college:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to fetch college details' 
//     });
//   }
// });

// app.get('/courses', async (req, res) => {
//   try {
//     const [rows] = await pool.execute(
//       'SELECT id, name, description, level, duration FROM courses WHERE is_active = TRUE'
//     );
//     res.status(200).json({ 
//       success: true,
//       data: rows 
//     });
//   } catch (err) {
//     console.error('Error fetching courses:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to fetch courses' 
//     });
//   }
// });

// app.get('/courses/:id', async (req, res) => {
//   try {
//     const [rows] = await pool.execute(
//       `SELECT id, name, description, image_url, rating, reviews, price, 
//        level, duration, language, subtitles, lectures, assignments, 
//        resources, lifetime_access, certificate
//        FROM courses WHERE id = ? AND is_active = TRUE`,
//       [req.params.id]
//     );
    
//     if (!rows.length) {
//       return res.status(404).json({ 
//         success: false,
//         message: 'Course not found' 
//       });
//     }
    
//     res.status(200).json({ 
//       success: true,
//       data: rows[0] 
//     });
//   } catch (err) {
//     console.error('Error fetching course:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to fetch course details' 
//     });
//   }
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
  
//   if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
//     return res.status(413).json({ 
//       success: false,
//       message: 'File size too large. Maximum 5MB allowed.',
//     });
//   }
  
//   if (err.message === 'Only PDF, DOC, JPG, and PNG files are allowed') {
//     return res.status(400).json({ 
//       success: false,
//       message: err.message,
//     });
//   }
  
//   res.status(500).json({ 
//     success: false,
//     message: 'Something went wrong!',
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ 
//     success: false,
//     message: 'Endpoint not found',
//   });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
// });
























// require('dotenv').config();
// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const multer = require('multer');
// const path = require('path');
// const jwt = require('jsonwebtoken');
// const fs = require('fs');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Database configuration
// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || 'password',
//   database: process.env.DB_NAME || 'learning_platform',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // File upload configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     let uploadPath = 'uploads/';
//     if (req.body.userType === 'college') uploadPath += 'colleges/';
//     if (req.body.userType === 'mnc') uploadPath += 'mncs/';
    
//     fs.mkdirSync(uploadPath, { recursive: true });
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ 
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   fileFilter: (req, file, cb) => {
//     const filetypes = /pdf|doc|docx|jpg|jpeg|png/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
    
//     if (extname && mimetype) {
//       return cb(null, true);
//     } else {
//       cb(new Error('Only PDF, DOC, JPG, and PNG files are allowed'));
//     }
//   },
// });

// // JWT Secret
// const JWT_SECRET = process.env.JWT_SECRET || 'your-strong-secret-here';

// // Auth Middleware
// const authenticate = (roles = []) => {
//   return async (req, res, next) => {
//     try {
//       const token = req.headers.authorization?.split(' ')[1];
//       if (!token) {
//         return res.status(401).json({ success: false, message: 'Authentication required' });
//       }

//       const decoded = jwt.verify(token, JWT_SECRET);
      
//       let table;
//       switch(decoded.role) {
//         case 'student': table = 'student_logins'; break;
//         case 'college': table = 'college_logins'; break;
//         case 'mnc': table = 'mnc_logins'; break;
//         case 'admin': table = 'admins'; break;
//         default: return res.status(403).json({ success: false, message: 'Invalid role' });
//       }

//       const [users] = await pool.execute(
//         `SELECT * FROM ${table} WHERE id = ?`,
//         [decoded.id]
//       );

//       if (!users.length) {
//         return res.status(403).json({ success: false, message: 'User not found' });
//       }
      
//       const user = users[0];
      
//       if (roles.length && !roles.includes(decoded.role)) {
//         return res.status(403).json({ success: false, message: 'Insufficient permissions' });
//       }

//       if (user.is_active === 0) {
//         return res.status(403).json({ success: false, message: 'Account is deactivated' });
//       }

//       if ((decoded.role === 'college' || decoded.role === 'mnc') && !user.is_verified) {
//         return res.status(403).json({ 
//           success: false, 
//           message: 'Account pending verification. Please contact admin.' 
//         });
//       }

//       req.user = user;
//       req.user.role = decoded.role;
//       next();
//     } catch (err) {
//       console.error('Authentication error:', err);
//       return res.status(401).json({ success: false, message: 'Invalid or expired token' });
//     }
//   };
// };

// // Routes

// app.get('/', (req, res) => {
//   res.status(200).json({ 
//     success: true, 
//     message: 'Learning Platform API is running',
//     timestamp: new Date().toISOString(),
//   });
// });

// app.use(express.json());

// // Generate Admin Token
// app.get('/generate-admin-token', async (req, res) => {
//   try {
//     const token = crypto.randomBytes(32).toString('hex');
//     const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

//     await db.execute(
//       'INSERT INTO admin_tokens (token, expires_at) VALUES (?, ?)',
//       [token, expiresAt]
//     );

//     const adminLink = `http://localhost:3000/admin-dashboard/${token}`;
//     res.json({ link: adminLink });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to generate token' });
//   }
// });

// app.listen(5000, () => {
//   console.log('Server running on port 5000');
// });



// app.post('/login', async (req, res) => {
//   const { userType, username, password } = req.body;

//   try {
//     let table, role;
//     switch(userType) {
//       case 'student': 
//         table = 'student_logins';
//         role = 'student';
//         break;
//       case 'college': 
//         table = 'college_logins';
//         role = 'college';
//         break;
//       case 'mnc': 
//         table = 'mnc_logins';
//         role = 'mnc';
//         break;
//       case 'admin':
//         table = 'admins';
//         role = 'admin';
//         break;
//       default: 
//         return res.status(400).json({ success: false, message: 'Invalid user type' });
//     }

//     console.log(`Querying ${table} for username: ${username}`);
//     const [users] = await pool.execute(
//       `SELECT * FROM ${table} WHERE username = ?`,
//       [username]
//     );
//     console.log('Found users:', users);

//     if (!users.length) {
//       return res.status(401).json({ success: false, message: 'Invalid username or password' });
//     }

//     const user = users[0];
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ success: false, message: 'Invalid username or password' });
//     }

//     if ((role === 'college' || role === 'mnc') && !user.is_verified) {
//       return res.status(403).json({ success: false, message: 'Account pending verification. Please contact admin.' });
//     }

//     if (user.is_active === 0) {
//       return res.status(403).json({ success: false, message: 'Account is deactivated. Please contact admin.' });
//     }

//     await pool.execute(`UPDATE ${table} SET last_login = NOW() WHERE id = ?`, [user.id]);

//     const token = jwt.sign({ id: user.id, role, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

//     const { password: _, ...userData } = user;
//     res.status(200).json({ success: true, data: { ...userData, role, token } });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ success: false, message: 'Login failed. Please try again later.' });
//   }
// });









// app.post('/register', upload.single('documents'), async (req, res) => {
//   const { userType, username, password, email, phone_number } = req.body;
//   const documentsPath = req.file ? req.file.path.replace(/\\/g, '/') : null;

//   try {
//     if (!userType || !username || !password || !email) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Missing required fields' 
//       });
//     }

//     const [existing] = await pool.execute(
//       `SELECT username FROM student_logins WHERE username = ? OR email = ?
//        UNION SELECT username FROM college_logins WHERE username = ? OR email = ?
//        UNION SELECT username FROM mnc_logins WHERE username = ? OR email = ?`,
//       [username, email, username, email, username, email]
//     );

//     if (existing.length > 0) {
//       if (req.file) fs.unlink(req.file.path, () => {});
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Username or email already exists' 
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const otp = Math.floor(1000 + Math.random() * 9000).toString();

//     if (userType === 'student') {
//       const [result] = await pool.execute(
//         'INSERT INTO student_logins (username, password, email, phone_number) VALUES (?, ?, ?, ?)',
//         [username, hashedPassword, email, phone_number]
//       );

//       const token = jwt.sign(
//         { id: result.insertId, role: 'student', username, email },
//         JWT_SECRET,
//         { expiresIn: '1d' }
//       );

//       res.status(201).json({ 
//         success: true,
//         message: 'Student registration successful',
//         otp,
//         token,
//       });
//     } else if (userType === 'college') {
//       const { college_name, address, contact_person, contact_position } = req.body;
      
//       if (!college_name || !address || !contact_person || !contact_position) {
//         if (req.file) fs.unlink(req.file.path, () => {});
//         return res.status(400).json({ 
//           success: false, 
//           message: 'Missing college information' 
//         });
//       }

//       const connection = await pool.getConnection();
//       await connection.beginTransaction();

//       try {
//         const [institutionResult] = await connection.execute(
//           `INSERT INTO institutions
//           (name, address, contact_person, contact_position) 
//           VALUES (?, ?, ?, ?)`,
//           [college_name, address, contact_person, contact_position]
//         );
        
//         const [loginResult] = await connection.execute(
//           `INSERT INTO college_logins 
//           (username, password, email, phone_number, institution_id, verification_documents) 
//           VALUES (?, ?, ?, ?, ?, ?)`,
//           [username, hashedPassword, email, phone_number, institutionResult.insertId, documentsPath]
//         );
        
//         await connection.commit();

//         const token = jwt.sign(
//           { id: loginResult.insertId, role: 'college', username, email },
//           JWT_SECRET,
//           { expiresIn: '1d' }
//         );

//         res.status(201).json({ 
//           success: true,
//           message: 'College registration submitted for admin approval',
//           otp,
//           token,
//         });
//       } catch (err) {
//         await connection.rollback();
//         throw err;
//       } finally {
//         connection.release();
//       }
//     } else if (userType === 'mnc') {
//       const { company_name, industry, address, contact_person, contact_position } = req.body;
      
//       if (!company_name || !industry || !address || !contact_person || !contact_position) {
//         if (req.file) fs.unlink(req.file.path, () => {});
//         return res.status(400).json({ 
//           success: false, 
//           message: 'Missing MNC information' 
//         });
//       }

//       const connection = await pool.getConnection();
//       await connection.beginTransaction();

//       try {
//         const [mncResult] = await connection.execute(
//           `INSERT INTO mncs 
//           (name, industry, address, contact_person, contact_position) 
//           VALUES (?, ?, ?, ?, ?)`,
//           [company_name, industry, address, contact_person, contact_position]
//         );
        
//         const [loginResult] = await connection.execute(
//           `INSERT INTO mnc_logins 
//           (username, password, email, phone_number, mnc_id, verification_documents) 
//           VALUES (?, ?, ?, ?, ?, ?)`,
//           [username, hashedPassword, email, phone_number, mncResult.insertId, documentsPath]
//         );
        
//         await connection.commit();

//         const token = jwt.sign(
//           { id: loginResult.insertId, role: 'mnc', username, email },
//           JWT_SECRET,
//           { expiresIn: '1d' }
//         );

//         res.status(201).json({ 
//           success: true,
//           message: 'MNC registration submitted for admin approval',
//           otp,
//           token,
//         });
//       } catch (err) {
//         await connection.rollback();
//         throw err;
//       } finally {
//         connection.release();
//       }
//     } else {
//       if (req.file) fs.unlink(req.file.path, () => {});
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid user type' 
//       });
//     }
//   } catch (err) {
//     console.error('Registration error:', err);
//     if (req.file) fs.unlink(req.file.path, () => {});
//     res.status(500).json({ 
//       success: false,
//       message: 'Registration failed. Please try again.',
//     });
//   }
// });

// // Admin endpoints
// app.get('/admin/pending-verifications', authenticate(['admin']), async (req, res) => {
//   try {
//     const [pendingColleges] = await pool.execute(
//       `SELECT cl.id, cl.username, cl.email, cl.created_at, cl.verification_documents,
//        c.name as college_name, c.address, c.contact_person, c.contact_position
//        FROM college_logins cl
//        JOIN colleges c ON c.id = cl.college_id
//        WHERE cl.is_verified = FALSE AND cl.is_active = TRUE`
//     );
    
//     const [pendingMncs] = await pool.execute(
//       `SELECT ml.id, ml.username, ml.email, ml.created_at, ml.verification_documents,
//        m.name as company_name, m.industry, m.address, m.contact_person, m.contact_position
//        FROM mnc_logins ml
//        JOIN mncs m ON m.id = ml.mnc_id
//        WHERE ml.is_verified = FALSE AND ml.is_active = TRUE`
//     );
    
//     res.status(200).json({ 
//       success: true,
//       data: {
//         colleges: pendingColleges,
//         mncs: pendingMncs,
//       },
//     });
//   } catch (err) {
//     console.error('Error fetching pending verifications:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to fetch pending verifications',
//     });
//   }
// });

// app.get('/admin/verification-details/:type/:id', authenticate(['admin']), async (req, res) => {
//   try {
//     const { type, id } = req.params;
//     let details;
    
//     if (type === 'college') {
//       const [rows] = await pool.execute(
//         `SELECT cl.*, c.name as college_name, c.address, c.contact_person, c.contact_position
//          FROM college_logins cl
//          JOIN colleges c ON c.id = cl.college_id
//          WHERE cl.id = ?`,
//         [id]
//       );
//       details = rows[0];
//     } else if (type === 'mnc') {
//       const [rows] = await pool.execute(
//         `SELECT ml.*, m.name as company_name, m.industry, m.address, m.contact_person, m.contact_position
//          FROM mnc_logins ml
//          JOIN mncs m ON m.id = ml.mnc_id
//          WHERE ml.id = ?`,
//         [id]
//       );
//       details = rows[0];
//     } else {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Invalid account type' 
//       });
//     }
    
//     if (!details) {
//       return res.status(404).json({ 
//         success: false,
//         message: 'Account not found' 
//       });
//     }
    
//     res.status(200).json({ 
//       success: true,
//       data: details,
//     });
//   } catch (err) {
//     console.error('Error fetching verification details:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to fetch account details' 
//     });
//   }
// });

// app.post('/admin/verify-account', authenticate(['admin']), async (req, res) => {
//   try {
//     const { type, id, action, notes } = req.body;
    
//     if (!['college', 'mnc'].includes(type)) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Invalid account type' 
//       });
//     }
    
//     if (!['approve', 'reject'].includes(action)) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Invalid action' 
//       });
//     }
    
//     const loginTable = type === 'college' ? 'college_logins' : 'mnc_logins';
//     const mainTable = type === 'college' ? 'colleges' : 'mncs';
//     const nameField = type === 'college' ? 'college_name' : 'company_name';
    
//     const [account] = await pool.execute(
//       `SELECT l.email, l.username, m.name 
//        FROM ${loginTable} l
//        JOIN ${mainTable} m ON m.id = l.${type}_id
//        WHERE l.id = ? AND l.is_verified = FALSE`,
//       [id]
//     );
    
//     if (!account.length) {
//       return res.status(404).json({ 
//         success: false,
//         message: 'Account not found or already verified' 
//       });
//     }
    
//     const { username, name } = account[0];
//     const adminNotes = notes || (action === 'approve' ? 'Account approved by admin' : 'Account rejected by admin');
    
//     if (action === 'approve') {
//       await pool.execute(
//         `UPDATE ${loginTable} SET is_verified = TRUE, admin_notes = ? WHERE id = ?`,
//         [adminNotes, id]
//       );
      
//       res.status(200).json({ 
//         success: true,
//         message: 'Account approved successfully' 
//       });
//     } else {
//       await pool.execute(
//         `UPDATE ${loginTable} SET is_active = FALSE, admin_notes = ? WHERE id = ?`,
//         [adminNotes, id]
//       );
      
//       res.status(200).json({ 
//         success: true,
//         message: 'Account rejected' 
//       });
//     }
//   } catch (err) {
//     console.error('Error during verification:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to process verification' 
//     });
//   }
// });

// app.post('/request-password-reset', async (req, res) => {
//   const { email, userType } = req.body;
  
//   try {
//     if (!email || !userType) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Email and user type are required' 
//       });
//     }

//     let table;
//     switch(userType) {
//       case 'student': table = 'student_logins'; break;
//       case 'college': table = 'college_logins'; break;
//       case 'mnc': table = 'mnc_logins'; break;
//       default: return res.status(400).json({ 
//         success: false,
//         message: 'Invalid user type' 
//       });
//     }
    
//     const [users] = await pool.execute(
//       `SELECT id, email FROM ${table} WHERE email = ? AND is_active = TRUE`,
//       [email]
//     );
    
//     if (users.length) {
//       const user = users[0];
//       const resetToken = jwt.sign(
//         { 
//           id: user.id, 
//           email: user.email, 
//           userType,
//           purpose: 'password_reset'
//         },
//         JWT_SECRET,
//         { expiresIn: '1h' }
//       );
      
//       res.status(200).json({ 
//         success: true,
//         message: 'Reset token generated (normally sent via email)',
//         resetToken,
//       });
//     } else {
//       res.status(200).json({ 
//         success: true,
//         message: 'If an account exists with this email, a reset link would be sent' 
//       });
//     }
//   } catch (err) {
//     console.error('Password reset request error:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to process password reset request' 
//     });
//   }
// });

// app.post('/reset-password', async (req, res) => {
//   const { token, newPassword } = req.body;
  
//   try {
//     if (!token || !newPassword) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Token and new password are required' 
//       });
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
    
//     if (decoded.purpose !== 'password_reset') {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Invalid token type' 
//       });
//     }
    
//     const { id, userType, email } = decoded;
    
//     let table;
//     switch(userType) {
//       case 'student': table = 'student_logins'; break;
//       case 'college': table = 'college_logins'; break;
//       case 'mnc': table = 'mnc_logins'; break;
//       default: return res.status(400).json({ 
//         success: false,
//         message: 'Invalid token' 
//       });
//     }
    
//     if (newPassword.length < 8) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Password must be at least 8 characters long' 
//       });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
    
//     await pool.execute(
//       `UPDATE ${table} SET password = ? WHERE id = ? AND email = ?`,
//       [hashedPassword, id, email]
//     );
    
//     res.status(200).json({ 
//       success: true,
//       message: 'Password reset successfully' 
//     });
//   } catch (err) {
//     console.error('Password reset error:', err);
//     res.status(400).json({ 
//       success: false,
//       message: err.name === 'TokenExpiredError' 
//         ? 'Token has expired' 
//         : 'Invalid or expired token' 
//     });
//   }
// });

// // app.get('/profile', authenticate(), async (req, res) => {
// //   try {
// //     let table, joinClause = '';
// //     switch(req.user.role) {
// //       case 'student': 
// //         table = 'student_logins';
// //         break;
// //       case 'college': 
// //         table = 'college_logins';
// //         joinClause = 'JOIN colleges c ON c.id = college_id';
// //         break;
// //       case 'mnc': 
// //         table = 'mnc_logins';
// //         joinClause = 'JOIN mncs m ON m.id = mnc_id';
// //         break;
// //       case 'admin':
// //         table = 'admins';
// //         break;
// //     }

// //     const [users] = await pool.execute(
// //       `SELECT l.* ${joinClause ? ', c.*' : ''}
// //        FROM ${table} l
// //        ${joinClause}
// //        WHERE l.id = ?`,
// //       [req.user.id]
// //     );

// //     if (!users.length) {
// //       return res.status(404).json({ 
// //         success: false,
// //         message: 'User not found' 
// //       });
// //     }

// //     const user = users[0];
// //     const { password, ...userData } = user;
    
// //     res.status(200).json({ 
// //       success: true,
// //       data: userData 
// //     });
// //   } catch (err) {
// //     console.error('Profile fetch error:', err);
// //     res.status(500).json({ 
// //       success: false,
// //       message: 'Failed to fetch profile' 
// //     });
// //   }
// // });
// // Replace your existing /profile endpoint with this:
// app.post('/profile', async (req, res) => {
//   const { userType, userId } = req.body;

//   try {
//     let table, joinClause = '', selectFields = 'l.*';
    
//     switch(userType) {
//       case 'student':
//         table = 'student_logins';
//         break;
//       case 'college':
//         table = 'college_logins';
//         joinClause = 'LEFT JOIN institutions c ON c.id = l.institution_id';
//         selectFields += ', c.name as name, c.address, c.contact_person, c.contact_position';
//         break;
//       case 'mnc':
//         table = 'mnc_logins';
//         joinClause = 'LEFT JOIN mncs m ON m.id = l.mnc_id';
//         selectFields += ', m.name as name, m.industry, m.contact_person, m.contact_position';
//         break;
//       default:
//         return res.status(400).json({ 
//           success: false,
//           message: 'Invalid user type' 
//         });
//     }

//     const [users] = await pool.execute(
//       `SELECT ${selectFields} 
//        FROM ${table} l
//        ${joinClause}
//        WHERE l.id = ?`,
//       [userId]
//     );

//     if (users.length === 0) {
//       return res.status(404).json({ 
//         success: false,
//         message: 'User not found' 
//       });
//     }

//     const user = users[0];
//     // Remove sensitive fields
//     const { password, verification_documents, ...userData } = user;
    
//     res.status(200).json({
//       success: true,
//       data: userData
//     });
//   } catch (err) {
//     console.error('Error fetching profile:', err);
//     res.status(500).json({ 
//       success: false,
//       message: 'Failed to fetch profile data' 
//     });
//   }
// });

// // Endpoint to fetch all colleges
// app.get('/colleges', async (req, res) => {
//   try {
//     const [rows] = await pool.execute('SELECT * FROM colleges');
//     res.status(200).json(rows);
//   } catch (err) {
//     console.error('Error fetching colleges:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });

// app.get('/activities', async (req, res) => {
//   try {
//     const [rows] = await pool.execute('SELECT * FROM activities'); // ✅ Use 'pool' instead of 'db'
//     res.status(200).json(rows);
//   } catch (err) {
//     console.error('Error fetching activities:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });

// // Endpoint to fetch a single college by ID
// app.get('/colleges/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const [rows] = await pool.execute('SELECT * FROM colleges WHERE id = ?', [id]);
//     if (rows.length === 0) {
//       return res.status(404).json({ message: 'College not found' });
//     }
//     res.status(200).json(rows[0]);
//   } catch (err) {
//     console.error('Error fetching college:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });

// // Endpoint to fetch all courses
// app.get('/courses', async (req, res) => {
//   try {
//     const [rows] = await pool.execute('SELECT * FROM courses');
//     res.status(200).json(rows);
//   } catch (err) {
//     console.error('Error fetching courses:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });

// // Endpoint to fetch a single course by ID
// app.get('/courses/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const [rows] = await pool.execute('SELECT * FROM courses WHERE id = ?', [id]);
//     if (rows.length === 0) {
//       return res.status(404).json({ message: 'Course not found' });
//     }
//     res.status(200).json(rows[0]);
//   } catch (err) {
//     console.error('Error fetching course:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });

// // Endpoint to add a new course
// app.post('/courses', async (req, res) => {
//   const { name, image_url, description, rating, reviews, price, level, duration, language, subtitles, lectures, assignments, resources, lifetime_access, certificate } = req.body;
//   try {
//     if (!name || !image_url || !description || !rating || !reviews || !price || !level || !duration || !language || !subtitles || lectures === undefined || assignments === undefined || resources === undefined || lifetime_access === undefined || certificate === undefined) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     await pool.execute(
//       'INSERT INTO courses (name, image_url, description, rating, reviews, price, level, duration, language, subtitles, lectures, assignments, resources, lifetime_access, certificate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//       [name, image_url, description, rating, reviews, price, level, duration, language, subtitles, lectures, assignments, resources, lifetime_access, certificate]
//     );

//     res.status(201).json({ message: 'Course added successfully' });
//   } catch (err) {
//     console.error('Error adding course:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });

// // Endpoint to update a course
// app.put('/courses/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, image_url, description, rating, reviews, price, level, duration, language, subtitles, lectures, assignments, resources, lifetime_access, certificate } = req.body;
//   try {
//     if (!name || !image_url || !description || !rating || !reviews || !price || !level || !duration || !language || !subtitles || lectures === undefined || assignments === undefined || resources === undefined || lifetime_access === undefined || certificate === undefined) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const [existingCourses] = await pool.execute('SELECT * FROM courses WHERE id = ?', [id]);
//     if (existingCourses.length === 0) {
//       return res.status(404).json({ message: 'Course not found' });
//     }

//     await pool.execute(
//       'UPDATE courses SET name = ?, image_url = ?, description = ?, rating = ?, reviews = ?, price = ?, level = ?, duration = ?, language = ?, subtitles = ?, lectures = ?, assignments = ?, resources = ?, lifetime_access = ?, certificate = ? WHERE id = ?',
//       [name, image_url, description, rating, reviews, price, level, duration, language, subtitles, lectures, assignments, resources, lifetime_access, certificate, id]
//     );

//     res.status(200).json({ message: 'Course updated successfully' });
//   } catch (err) {
//     console.error('Error updating course:', err);
//     res.status(500).json({ message: `Server error: ${err.message}` });
//   }
// });




// app.get('/api/candidates', async (req, res) => {
//   try {
//     const [rows] = await pool.execute('SELECT * FROM candidates');
    
//     const candidates = rows.map(row => ({
//       ...row,
//       // Convert skills string to array if needed
//       skills: row.skills 
//         ? typeof row.skills === 'string'
//           ? row.skills.split(',').map(skill => skill.trim())
//           : row.skills
//         : []
//     }));
    
//     res.json(candidates);
//   } catch (err) {
//     console.error('Error:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// app.get('/api/colleges', async (req, res) => {
//   try {
//     const [rows] = await pool.query('SELECT * FROM colleges');
//     res.json(rows);
//   } catch (err) {
//     handleError(res, 'Colleges endpoint error:', err);
//   }
// });




// app.get('/api/placement-stats', async (req, res) => {
//   try {
//     const [stats] = await pool.query(`
//       SELECT 
//         COUNT(DISTINCT p.company_id) as mncs_visited,
//         SUM(CASE WHEN p.status = 'Selected' THEN 1 ELSE 0 END) as students_selected,
//         MAX(p.package) as highest_package,
//         COUNT(DISTINCT CASE WHEN d.drive_date > CURDATE() THEN p.company_id END) as upcoming_drives
//       FROM placements p
//       LEFT JOIN drives d ON d.company_id = p.company_id
//     `);

//     const formattedStats = [
//       {
//         title: 'MNCs Visited',
//         value: stats[0].mncs_visited || 0,
//         description: 'Total companies visited'
//       },
//       {
//         title: 'Students Selected',
//         value: stats[0].students_selected || 0,
//         description: 'Students placed this year'
//       },
//       {
//         title: 'Highest Package',
//         value: stats[0].highest_package ? `₹${stats[0].highest_package}L` : '₹0L',
//         description: 'Highest offered package'
//       },
//       {
//         title: 'Upcoming Drives',
//         value: stats[0].upcoming_drives || 0,
//         description: 'Scheduled recruitment drives'
//       }
//     ];

//     res.json(formattedStats);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });




// app.get('/api/candidate-stats', async (req, res) => {
//   try {
//     const [candidateStats] = await pool.query(`
//       SELECT 
//         COUNT(*) as total,
//         SUM(status = 'shortlisted') as shortlisted,
//         SUM(status = 'interview') as interviews,
//         SUM(status = 'offer') as offers
//       FROM candidates
//     `);
    
//     const [collegeStats] = await pool.query('SELECT SUM(offers) as totalOffers FROM colleges');
    
//     res.json({
//       ...candidateStats[0],
//       offers: Math.max(candidateStats[0].offers, collegeStats[0].totalOffers || 0)
//     });
//   } catch (err) {
//     handleError(res, 'Stats endpoint error:', err);
//   }
// });



// app.get('/api/companies', async (req, res) => {
//   try {
//     const [companies] = await pool.query(`
//       SELECT 
//         c.id,
//         c.name,
//         GROUP_CONCAT(DISTINCT r.name SEPARATOR ', ') as roles,
//         COUNT(p.id) as selected,
//         MAX(p.package) as package,
//         MIN(d.drive_date) as date,
//         MAX(d.process) as process
//       FROM companies c
//       LEFT JOIN placements p ON p.company_id = c.id AND p.status = 'Selected'
//       LEFT JOIN drives d ON d.company_id = c.id
//       LEFT JOIN roles r ON r.company_id = c.id
//       GROUP BY c.id
//       ORDER BY selected DESC
//     `);

//     res.json(companies.map(company => ({
//       ...company,
//       process: company.process || 'Technical Test, Interviews'
//     })));
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// app.get('/api/students', async (req, res) => {
//   try {
//     const [students] = await pool.query(`
//       SELECT 
//         s.id,
//         s.name,
//         d.name as department,
//         c.name as company,
//         p.package,
//         p.status
//       FROM students s
//       LEFT JOIN placements p ON p.student_id = s.id
//       LEFT JOIN companies c ON c.id = p.company_id
//       LEFT JOIN departments d ON d.id = s.department_id
//       ORDER BY p.created_at DESC
//       LIMIT 20
//     `);

//     res.json(students);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });





// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
  
//   if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
//     return res.status(413).json({ 
//       success: false,
//       message: 'File size too large. Maximum 5MB allowed.',
//     });
//   }
  
//   if (err.message === 'Only PDF, DOC, JPG, and PNG files are allowed') {
//     return res.status(400).json({ 
//       success: false,
//       message: err.message,
//     });
//   }
  
//   res.status(500).json({ 
//     success: false,
//     message: 'Something went wrong!',
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ 
//     success: false,
//     message: 'Endpoint not found',
//   });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
// });











require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const crypto = require('crypto'); // Added missing import for crypto

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database configuration
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'learning_platform',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/';
    if (req.body.userType === 'college') uploadPath += 'colleges/';
    if (req.body.userType === 'mnc') uploadPath += 'mncs/';
    
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|doc|docx|jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, JPG, and PNG files are allowed'));
    }
  },
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-strong-secret-here';

// Auth Middleware
const authenticate = (roles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      
      let table;
      switch(decoded.role) {
        case 'student': table = 'student_logins'; break;
        case 'college': table = 'college_logins'; break;
        case 'mnc': table = 'mnc_logins'; break;
        case 'admin': table = 'admins'; break;
        default: return res.status(403).json({ success: false, message: 'Invalid role' });
      }

      const [users] = await pool.execute(
        `SELECT * FROM ${table} WHERE id = ?`,
        [decoded.id]
      );

      if (!users.length) {
        return res.status(403).json({ success: false, message: 'User not found' });
      }
      
      const user = users[0];
      
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ success: false, message: 'Insufficient permissions' });
      }

      if (user.is_active === 0) {
        return res.status(403).json({ success: false, message: 'Account is deactivated' });
      }

      if ((decoded.role === 'college' || decoded.role === 'mnc') && !user.is_verified) {
        return res.status(403).json({ 
          success: false, 
          message: 'Account pending verification. Please contact admin.' 
        });
      }

      req.user = user;
      req.user.role = decoded.role;
      next();
    } catch (err) {
      console.error('Authentication error:', err);
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
  };
};

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Learning Platform API is running',
    timestamp: new Date().toISOString(),
  });
});

// Generate Admin Token
app.get('/generate-admin-token', async (req, res) => {
  try {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await pool.execute( // Changed db to pool
      'INSERT INTO admin_tokens (token, expires_at) VALUES (?, ?)',
      [token, expiresAt]
    );

    const adminLink = `http://localhost:5173/admin-dashboard/${token}`;
    res.json({ link: adminLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

app.post('/login', async (req, res) => {
  const { userType, username, password } = req.body;

  try {
    let table, role;
    switch(userType) {
      case 'student': 
        table = 'student_logins';
        role = 'student';
        break;
      case 'college': 
        table = 'college_logins';
        role = 'college';
        break;
      case 'mnc': 
        table = 'mnc_logins';
        role = 'mnc';
        break;
      case 'admin':
        table = 'admins';
        role = 'admin';
        break;
      default: 
        return res.status(400).json({ success: false, message: 'Invalid user type' });
    }

    console.log(`Querying ${table} for username: ${username}`);
    const [users] = await pool.execute(
      `SELECT * FROM ${table} WHERE username = ?`,
      [username]
    );
    console.log('Found users:', users);

    if (!users.length) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    if ((role === 'college' || role === 'mnc') && !user.is_verified) {
      return res.status(403).json({ success: false, message: 'Account pending verification. Please contact admin.' });
    }

    if (user.is_active === 0) {
      return res.status(403).json({ success: false, message: 'Account is deactivated. Please contact admin.' });
    }

    await pool.execute(`UPDATE ${table} SET last_login = NOW() WHERE id = ?`, [user.id]);

    const token = jwt.sign({ id: user.id, role, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

    const { password: _, ...userData } = user;
    res.status(200).json({ success: true, data: { ...userData, role, token } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Login failed. Please try again later.' });
  }
});

// [Your other routes remain unchanged...]


app.post('/register', upload.single('documents'), async (req, res) => {
  const { userType, username, password, email, phone_number } = req.body;
  const documentsPath = req.file ? req.file.path.replace(/\\/g, '/') : null;

  try {
    if (!userType || !username || !password || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    const [existing] = await pool.execute(
      `SELECT username FROM student_logins WHERE username = ? OR email = ?
       UNION SELECT username FROM college_logins WHERE username = ? OR email = ?
       UNION SELECT username FROM mnc_logins WHERE username = ? OR email = ?`,
      [username, email, username, email, username, email]
    );

    if (existing.length > 0) {
      if (req.file) fs.unlink(req.file.path, () => {});
      return res.status(400).json({ 
        success: false, 
        message: 'Username or email already exists' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    if (userType === 'student') {
      const [result] = await pool.execute(
        'INSERT INTO student_logins (username, password, email, phone_number) VALUES (?, ?, ?, ?)',
        [username, hashedPassword, email, phone_number]
      );

      const token = jwt.sign(
        { id: result.insertId, role: 'student', username, email },
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.status(201).json({ 
        success: true,
        message: 'Student registration successful',
        otp,
        token,
      });
    } else if (userType === 'college') {
      const { college_name, address, contact_person, contact_position } = req.body;
      
      if (!college_name || !address || !contact_person || !contact_position) {
        if (req.file) fs.unlink(req.file.path, () => {});
        return res.status(400).json({ 
          success: false, 
          message: 'Missing college information' 
        });
      }

      const connection = await pool.getConnection();
      await connection.beginTransaction();

      try {
        const [institutionResult] = await connection.execute(
          `INSERT INTO institutions
          (name, address, contact_person, contact_position) 
          VALUES (?, ?, ?, ?)`,
          [college_name, address, contact_person, contact_position]
        );
        
        const [loginResult] = await connection.execute(
          `INSERT INTO college_logins 
          (username, password, email, phone_number, institution_id, verification_documents) 
          VALUES (?, ?, ?, ?, ?, ?)`,
          [username, hashedPassword, email, phone_number, institutionResult.insertId, documentsPath]
        );
        
        await connection.commit();

        const token = jwt.sign(
          { id: loginResult.insertId, role: 'college', username, email },
          JWT_SECRET,
          { expiresIn: '1d' }
        );

        res.status(201).json({ 
          success: true,
          message: 'College registration submitted for admin approval',
          otp,
          token,
        });
      } catch (err) {
        await connection.rollback();
        throw err;
      } finally {
        connection.release();
      }
    } else if (userType === 'mnc') {
      const { company_name, industry, address, contact_person, contact_position } = req.body;
      
      if (!company_name || !industry || !address || !contact_person || !contact_position) {
        if (req.file) fs.unlink(req.file.path, () => {});
        return res.status(400).json({ 
          success: false, 
          message: 'Missing MNC information' 
        });
      }

      const connection = await pool.getConnection();
      await connection.beginTransaction();

      try {
        const [mncResult] = await connection.execute(
          `INSERT INTO mncs 
          (name, industry, address, contact_person, contact_position) 
          VALUES (?, ?, ?, ?, ?)`,
          [company_name, industry, address, contact_person, contact_position]
        );
        
        const [loginResult] = await connection.execute(
          `INSERT INTO mnc_logins 
          (username, password, email, phone_number, mnc_id, verification_documents) 
          VALUES (?, ?, ?, ?, ?, ?)`,
          [username, hashedPassword, email, phone_number, mncResult.insertId, documentsPath]
        );
        
        await connection.commit();

        const token = jwt.sign(
          { id: loginResult.insertId, role: 'mnc', username, email },
          JWT_SECRET,
          { expiresIn: '1d' }
        );

        res.status(201).json({ 
          success: true,
          message: 'MNC registration submitted for admin approval',
          otp,
          token,
        });
      } catch (err) {
        await connection.rollback();
        throw err;
      } finally {
        connection.release();
      }
    } else {
      if (req.file) fs.unlink(req.file.path, () => {});
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid user type' 
      });
    }
  } catch (err) {
    console.error('Registration error:', err);
    if (req.file) fs.unlink(req.file.path, () => {});
    res.status(500).json({ 
      success: false,
      message: 'Registration failed. Please try again.',
    });
  }
});


app.get('/admin/pending-verifications', async (req, res) => {
  const { token } = req.query;
  
  try {
    // 1. Validate token first
    const [validToken] = await pool.execute(
      'SELECT * FROM admin_tokens WHERE token = ? AND expires_at > NOW()',
      [token]
    );
    
    if (!validToken.length) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid or expired admin token' 
      });
    }

    // 2. Get pending colleges (updated query)
    const [colleges] = await pool.execute(`
      SELECT cl.id, cl.email, cl.created_at, cl.verification_documents,
             i.name as institution_name, i.address, 
             i.contact_person, i.contact_position
      FROM college_logins cl
      JOIN institutions i ON i.id = cl.institution_id
      WHERE cl.is_verified = 0 AND cl.is_active = 1
    `);

    // 3. Get pending MNCs (updated query)
    const [mncs] = await pool.execute(`
      SELECT ml.id, ml.email, ml.created_at, ml.verification_documents,
             m.name as company_name, m.industry, m.address,
             m.contact_person, m.contact_position
      FROM mnc_logins ml
      JOIN mncs m ON m.id = ml.mnc_id
      WHERE ml.is_verified = 0 AND ml.is_active = 1
    `);

    res.json({ 
      success: true,
      colleges,
      mncs
    });

  } catch (err) {
    console.error("Database error details:", {
      message: err.message,
      sql: err.sql,
      stack: err.stack
    });
    
    res.status(500).json({ 
      success: false,
      message: 'Database query failed',
      error: err.message // Send specific error to frontend
    });
  }
});

// Add this to your index.js
app.get('/admin/validate-token', async (req, res) => {
  const { token } = req.query;
  
  try {
    if (!token) {
      return res.status(400).json({ valid: false, message: 'Token is required' });
    }

    const [tokens] = await pool.execute(
      'SELECT * FROM admin_tokens WHERE token = ? AND expires_at > NOW()',
      [token]
    );

    if (tokens.length === 0) {
      return res.status(401).json({ valid: false, message: 'Invalid or expired token' });
    }

    res.status(200).json({ valid: true });
  } catch (err) {
    console.error('Token validation error:', err);
    res.status(500).json({ valid: false, message: 'Error validating token' });
  }
});

app.get('/admin/verification-details/:type/:id', async (req, res) => {
  const { type, id } = req.params;
  const { token } = req.query;

  console.log(`Fetching details for ${type} ID: ${id}`); // Debug log

  try {
    // 1. Validate admin token
    const [validToken] = await pool.execute(
      'SELECT * FROM admin_tokens WHERE token = ? AND expires_at > NOW()',
      [token]
    );
    
    if (!validToken.length) {
      console.log('Invalid token provided');
      return res.status(401).json({ success: false, message: 'Invalid admin token' });
    }

    // 2. Fetch account details
    let query, details;
    if (type === 'college') {
      query = `
        SELECT 
          cl.*, 
          i.name AS institution_name,
          i.address,
          i.contact_person,
          i.contact_position,
          i.is_active,
          i.created_at
        FROM college_logins cl
        JOIN institutions i ON i.id = cl.institution_id
        WHERE cl.id = ?`;
    } else if (type === 'mnc') {
      query = `
        SELECT 
          ml.*,
          m.name AS company_name,
          m.industry,
          m.address,
          m.contact_person,
          m.contact_position,
          m.is_active,
          m.verified,
          m.admin_notes
        FROM mnc_logins ml
        JOIN mncs m ON m.id = ml.mnc_id
        WHERE ml.id = ?`;
    }
    
    const [rows] = await pool.execute(query, [id]);
    details = rows[0];

    if (!details) {
      console.log('No account found with ID:', id);
      return res.status(404).json({ success: false, message: 'Account not found' });
    }

    // Transform data for consistent response
    const responseData = {
      ...details,
      college_name: details.institution_name || null,
      company_name: details.company_name || null
    };

    console.log('Successfully fetched details for:', responseData.email); // Debug log
    res.json({ success: true, data: responseData });

  } catch (err) {
    console.error('Database error:', {
      message: err.message,
      sql: err.sql,
      stack: err.stack
    });
    res.status(500).json({ 
      success: false,
      message: 'Database operation failed',
      error: err.message
    });
  }
});

app.post('/admin/verify-account', async (req, res) => {
  try {
    const { type, id, action, notes, token } = req.body;
    
    console.log('Request body:', req.body);
    
    const [validToken] = await pool.execute(
      'SELECT * FROM admin_tokens WHERE token = ? AND expires_at > NOW()',
      [token]
    );
    console.log('Valid token result:', validToken);
    
    if (!validToken.length) {
      return res.status(401).json({ success: false, message: 'Invalid or expired admin token' });
    }
    
    if (!['college', 'mnc'].includes(type)) {
      return res.status(400).json({ success: false, message: 'Invalid account type' });
    }
    
    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({ success: false, message: 'Invalid action' });
    }
    
    const loginTable = type === 'college' ? 'college_logins' : 'mnc_logins';
    const mainTable = type === 'college' ? 'institutions' : 'mncs';
    const nameField = type === 'college' ? 'institution_name' : 'company_name';
    
    const [account] = await pool.execute(
      `SELECT l.email, l.username, m.name AS ${nameField}
       FROM ${loginTable} l
       JOIN ${mainTable} m ON m.id = l.${type === 'college' ? 'institution' : 'mnc'}_id
       WHERE l.id = ? AND l.is_verified = FALSE`,
      [id]
    );
    
    if (!account.length) {
      return res.status(404).json({ success: false, message: 'Account not found or already verified' });
    }
    
    const adminNotes = notes || (action === 'approve' ? 'Account approved by admin' : 'Account rejected by admin');
    
    if (action === 'approve') {
      await pool.execute(
        `UPDATE ${loginTable} SET is_verified = TRUE, admin_notes = ? WHERE id = ?`,
        [adminNotes, id]
      );
      res.status(200).json({ success: true, message: 'Account approved successfully' });
    } else {
      await pool.execute(
        `UPDATE ${loginTable} SET is_active = FALSE, admin_notes = ? WHERE id = ?`,
        [adminNotes, id]
      );
      res.status(200).json({ success: true, message: 'Account rejected' });
    }
  } catch (err) {
    console.error('Error during verification:', err);
    res.status(500).json({ success: false, message: 'Failed to process verification', error: err.message });
  }
});

app.post('/request-password-reset', async (req, res) => {
  const { email, userType } = req.body;
  
  try {
    if (!email || !userType) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and user type are required' 
      });
    }

    let table;
    switch(userType) {
      case 'student': table = 'student_logins'; break;
      case 'college': table = 'college_logins'; break;
      case 'mnc': table = 'mnc_logins'; break;
      default: return res.status(400).json({ 
        success: false,
        message: 'Invalid user type' 
      });
    }
    
    const [users] = await pool.execute(
      `SELECT id, email FROM ${table} WHERE email = ? AND is_active = TRUE`,
      [email]
    );
    
    if (users.length) {
      const user = users[0];
      const resetToken = jwt.sign(
        { 
          id: user.id, 
          email: user.email, 
          userType,
          purpose: 'password_reset'
        },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      res.status(200).json({ 
        success: true,
        message: 'Reset token generated (normally sent via email)',
        resetToken,
      });
    } else {
      res.status(200).json({ 
        success: true,
        message: 'If an account exists with this email, a reset link would be sent' 
      });
    }
  } catch (err) {
    console.error('Password reset request error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Failed to process password reset request' 
    });
  }
});

app.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  
  try {
    if (!token || !newPassword) {
      return res.status(400).json({ 
        success: false,
        message: 'Token and new password are required' 
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (decoded.purpose !== 'password_reset') {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid token type' 
      });
    }
    
    const { id, userType, email } = decoded;
    
    let table;
    switch(userType) {
      case 'student': table = 'student_logins'; break;
      case 'college': table = 'college_logins'; break;
      case 'mnc': table = 'mnc_logins'; break;
      default: return res.status(400).json({ 
        success: false,
        message: 'Invalid token' 
      });
    }
    
    if (newPassword.length < 8) {
      return res.status(400).json({ 
        success: false,
        message: 'Password must be at least 8 characters long' 
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await pool.execute(
      `UPDATE ${table} SET password = ? WHERE id = ? AND email = ?`,
      [hashedPassword, id, email]
    );
    
    res.status(200).json({ 
      success: true,
      message: 'Password reset successfully' 
    });
  } catch (err) {
    console.error('Password reset error:', err);
    res.status(400).json({ 
      success: false,
      message: err.name === 'TokenExpiredError' 
        ? 'Token has expired' 
        : 'Invalid or expired token' 
    });
  }
});

// Replace your existing /profile endpoint with this:
app.post('/profile', async (req, res) => {
  const { userType, userId } = req.body;

  try {
    let table, joinClause = '', selectFields = 'l.*';
    
    switch(userType) {
      case 'student':
        table = 'student_logins';
        break;
      case 'college':
        table = 'college_logins';
        joinClause = 'LEFT JOIN institutions c ON c.id = l.institution_id';
        selectFields += ', c.name as name, c.address, c.contact_person, c.contact_position';
        break;
      case 'mnc':
        table = 'mnc_logins';
        joinClause = 'LEFT JOIN mncs m ON m.id = l.mnc_id';
        selectFields += ', m.name as name, m.industry, m.contact_person, m.contact_position';
        break;
      default:
        return res.status(400).json({ 
          success: false,
          message: 'Invalid user type' 
        });
    }

    const [users] = await pool.execute(
      `SELECT ${selectFields} 
       FROM ${table} l
       ${joinClause}
       WHERE l.id = ?`,
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    const user = users[0];
    // Remove sensitive fields
    const { password, verification_documents, ...userData } = user;
    
    res.status(200).json({
      success: true,
      data: userData
    });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch profile data' 
    });
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




app.get('/api/candidates', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM candidates');
    
    const candidates = rows.map(row => ({
      ...row,
      // Convert skills string to array if needed
      skills: row.skills 
        ? typeof row.skills === 'string'
          ? row.skills.split(',').map(skill => skill.trim())
          : row.skills
        : []
    }));
    
    res.json(candidates);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/colleges', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM colleges');
    res.json(rows);
  } catch (err) {
    handleError(res, 'Colleges endpoint error:', err);
  }
});




app.get('/api/placement-stats', async (req, res) => {
  try {
    const [stats] = await pool.query(`
      SELECT 
        COUNT(DISTINCT p.company_id) as mncs_visited,
        SUM(CASE WHEN p.status = 'Selected' THEN 1 ELSE 0 END) as students_selected,
        MAX(p.package) as highest_package,
        COUNT(DISTINCT CASE WHEN d.drive_date > CURDATE() THEN p.company_id END) as upcoming_drives
      FROM placements p
      LEFT JOIN drives d ON d.company_id = p.company_id
    `);

    const formattedStats = [
      {
        title: 'MNCs Visited',
        value: stats[0].mncs_visited || 0,
        description: 'Total companies visited'
      },
      {
        title: 'Students Selected',
        value: stats[0].students_selected || 0,
        description: 'Students placed this year'
      },
      {
        title: 'Highest Package',
        value: stats[0].highest_package ? `₹${stats[0].highest_package}L` : '₹0L',
        description: 'Highest offered package'
      },
      {
        title: 'Upcoming Drives',
        value: stats[0].upcoming_drives || 0,
        description: 'Scheduled recruitment drives'
      }
    ];

    res.json(formattedStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});




app.get('/api/candidate-stats', async (req, res) => {
  try {
    const [candidateStats] = await pool.query(`
      SELECT 
        COUNT(*) as total,
        SUM(status = 'shortlisted') as shortlisted,
        SUM(status = 'interview') as interviews,
        SUM(status = 'offer') as offers
      FROM candidates
    `);
    
    const [collegeStats] = await pool.query('SELECT SUM(offers) as totalOffers FROM colleges');
    
    res.json({
      ...candidateStats[0],
      offers: Math.max(candidateStats[0].offers, collegeStats[0].totalOffers || 0)
    });
  } catch (err) {
    handleError(res, 'Stats endpoint error:', err);
  }
});



app.get('/api/companies', async (req, res) => {
  try {
    const [companies] = await pool.query(`
      SELECT 
        c.id,
        c.name,
        GROUP_CONCAT(DISTINCT r.name SEPARATOR ', ') as roles,
        COUNT(p.id) as selected,
        MAX(p.package) as package,
        MIN(d.drive_date) as date,
        MAX(d.process) as process
      FROM companies c
      LEFT JOIN placements p ON p.company_id = c.id AND p.status = 'Selected'
      LEFT JOIN drives d ON d.company_id = c.id
      LEFT JOIN roles r ON r.company_id = c.id
      GROUP BY c.id
      ORDER BY selected DESC
    `);

    res.json(companies.map(company => ({
      ...company,
      process: company.process || 'Technical Test, Interviews'
    })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/students', async (req, res) => {
  try {
    const [students] = await pool.query(`
      SELECT 
        s.id,
        s.name,
        d.name as department,
        c.name as company,
        p.package,
        p.status
      FROM students s
      LEFT JOIN placements p ON p.student_id = s.id
      LEFT JOIN companies c ON c.id = p.company_id
      LEFT JOIN departments d ON d.id = s.department_id
      ORDER BY p.created_at DESC
      LIMIT 20
    `);

    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/api/student-dashboard/summary', authenticate(['student']), async (req, res) => {
  try {
    const studentId = req.user.id;
    console.log(`Fetching summary for student ID: ${studentId}`);

    const [skills] = await pool.execute(
      'SELECT COUNT(*) as mastered, (SELECT COUNT(*) FROM student_skills WHERE student_id = ?) as total FROM student_skills WHERE student_id = ? AND status = "Mastered"',
      [studentId, studentId]
    );
    console.log('Skills query result:', skills);

    const [avgScore] = await pool.execute(
      'SELECT AVG(grade) as average FROM student_skills WHERE student_id = ?',
      [studentId]
    );
    console.log('Avg score query result:', avgScore);

    const [jobMatches] = await pool.execute(
      'SELECT COUNT(*) as matches FROM job_applications WHERE student_id = ? AND match_percentage >= 80',
      [studentId]
    );
    console.log('Job matches query result:', jobMatches);

    const [applications] = await pool.execute(
      'SELECT COUNT(*) as total, SUM(status = "Applied") as accepted, SUM(status = "Rejected") as rejected, SUM(status IN ("Interview Scheduled", "Not Applied")) as pending FROM job_applications WHERE student_id = ?',
      [studentId]
    );
    console.log('Applications query result:', applications);

    // Handle null average explicitly
    const average = avgScore[0].average !== null ? Number(avgScore[0].average).toFixed(1) : "0.0";

    res.json({
      success: true,
      data: {
        skillsMastered: skills[0].mastered || 0,
        totalSkills: skills[0].total || 0,
        averageScore: average,
        jobMatches: jobMatches[0].matches || 0,
        applications: {
          total: applications[0].total || 0,
          accepted: applications[0].accepted || 0,
          rejected: applications[0].rejected || 0,
          pending: applications[0].pending || 0,
        },
      },
    });
  } catch (err) {
    console.error('Error in /api/student-dashboard/summary:', err.message, err.stack);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});





// Fetch skills breakdown
app.get('/api/student-dashboard/skills', authenticate(['student']), async (req, res) => {
  try {
    const studentId = req.user.id;
    const [skills] = await pool.execute(
      'SELECT skill_name, grade, progress, industry_demand, status FROM student_skills WHERE student_id = ?',
      [studentId]
    );
    res.json({ success: true, data: skills });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Fetch job applications
app.get('/api/student-dashboard/applications', authenticate(['student']), async (req, res) => {
  try {
    const studentId = req.user.id;
    const [applications] = await pool.execute(
      'SELECT company_name, match_percentage, required_skills, status FROM job_applications WHERE student_id = ?',
      [studentId]
    );
    res.json({ success: true, data: applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Fetch interview performance
app.get('/api/student-dashboard/interview', authenticate(['student']), async (req, res) => {
  try {
    const studentId = req.user.id;
    const [performance] = await pool.execute(
      'SELECT technical_knowledge, problem_solving, communication, system_design, cultural_fit, past_experience FROM interview_performance WHERE student_id = ?',
      [studentId]
    );
    res.json({ success: true, data: performance[0] || {} });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Fetch rejection reasons
app.get('/api/student-dashboard/rejections', authenticate(['student']), async (req, res) => {
  try {
    const studentId = req.user.id;
    const [rejections] = await pool.execute(
      'SELECT reason, count FROM rejection_reasons WHERE student_id = ?',
      [studentId]
    );
    res.json({ success: true, data: rejections });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});




// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ 
      success: false,
      message: 'File size too large. Maximum 5MB allowed.',
    });
  }
  
  if (err.message === 'Only PDF, DOC, JPG, and PNG files are allowed') {
    return res.status(400).json({ 
      success: false,
      message: err.message,
    });
  }
  
  res.status(500).json({ 
    success: false,
    message: 'Something went wrong!',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Endpoint not found',
  });
});

// Start server (only one app.listen)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});