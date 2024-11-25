require('dotenv').config();

const app = require('express')();
const http = require('http').Server(app);

const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
if (!uri) {
    throw new Error('MONGO_URI is not defined. Check your environment variables.');
}

const PORT = process.env.PORT || 5000;

const mongoose = require('mongoose');
mongoose.connect(uri 
    // useNewUrlParser: true, 
    // useUnifiedTopology: true,
    // ssl: true,
)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// mongoose.connection.on('error', (err) => {
//     console.error('Connection error:', err);
// });

// mongoose.connection.on('disconnected', () => {
//     console.warn('Disconnected from MongoDB');
// });

// mongoose.connection.on('connected', () => {
//     console.log('Connected to MongoDB successfully');
// });


const Users = require('./models/usersModel');

http.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});

async function signUp() {
    try {
        await Users.create({
            name: 'test',
            email: 'test@gmail.com'
        });
        console.log('User created successfully');
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

signUp();


// async function testConnection() {
//     try {
//         const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//         await client.connect();
//         console.log('Connected to MongoDB successfully!');
//         await client.close();
//     } catch (err) {
//         console.error('MongoDB connection test failed:', err);
//     }
// }

// testConnection();