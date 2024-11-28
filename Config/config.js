require('dotenv').config();
const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;
if (!uri) {
    throw new Error('MONGO_URI is not defined. Check your .env file');
}
const connect = mongoose.connect(uri);

connect.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));