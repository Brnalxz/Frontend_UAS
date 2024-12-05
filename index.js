require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const mongoose = require('mongoose');
const Users = require('./models/usersModel');
const config = require('./Config/config');

const app = express();

// Connect to MongoDB
config.connect;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Path to static files
const viewsPath = path.join(__dirname, 'views');
app.use(express.static(viewsPath));

// Initialize admin account
async function initializeAdmin() {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const existingAdmin = await Users.findOne({ email: adminEmail });

        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            const admin = new Users({
                username: 'AdminMaster',
                email: adminEmail,
                password: hashedPassword,
                role: 'admin',
            });
            await admin.save();
            console.log('Admin account created successfully!');
        } else {
            console.log('Admin account already exists.');
        }
    } catch (error) {
        console.error('Error initializing admin account:', error);
    }
}
initializeAdmin();

// Routes
const authRoutes = require('./Routes/authRoutes');
const adminRoutes = require('./Routes/adminRoutes');

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
