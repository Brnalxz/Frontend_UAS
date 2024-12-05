// app.js

// Core Modules
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Middleware
const authenticate = require('./Middleware/authMiddleware');
const isAdmin = require('./Middleware/adminMiddleware');

// Routes
const authRoute = require('./Routes/authRoute');
const adminRoutes = require('./Routes/adminRoutes');

// Initialize App
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Add this line here

// Routes
app.use('/auth', authRoute);
app.use('/admin', authenticate, adminRoutes); // Protected route with middleware

// Error Handling and Default Routes (if any)
app.get('/', (req, res) => {
    res.send('Welcome to the application!');
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
