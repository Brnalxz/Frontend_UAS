const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Path absolut ke folder views
const viewsPath = path.join(__dirname, '..', 'views');
app.use(express.static(viewsPath));

// Route: Halaman Utama
app.get('/', (req, res) => {
    res.sendFile(path.join(viewsPath, 'home.html'));
});

app.get('/echoes', (req,res) => {
    res.sendFile(path.join(viewsPath, 'echoes.html'))
});

app.get('/forum', (req,res) => {
    res.sendFile(path.join(viewsPath, 'forum.html'))
});

app.get('/resonators', (req,res) => {
    res.sendFile(path.join(viewsPath, 'resonators.html'))
});

app.get('/weapon', (req,res) => {
    res.sendFile(path.join(viewsPath, 'weapon.html'))
});

// Endpoint Signup
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send('All fields are required.');
        }

        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email is already in use. Please log in.');
        }

        const existingUsername = await collection.findOne({ username });
        if (existingUsername) {
            return res.status(400).send('Username is already taken.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new collection({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();

        res.status(201).send('User created successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred. Please try again.');
    }
});

// Endpoint Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('All fields are required.');
        }

        const user = await collection.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found. Please sign up first.');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).send('Incorrect password.');
        }

        res.status(200).send('Login successful!');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred. Please try again.');
    }
});

// Jalankan server
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
