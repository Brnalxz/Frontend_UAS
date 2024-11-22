const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/Login-tut");

connect.then(()=> {
    console.log("database connected");
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Username harus unik
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validasi email
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Panjang minimum password
    },
    createdAt: {
        type: Date,
        default: Date.now, // Waktu pendaftaran
    },
});

// Model User
const collection = mongoose.model('User', userSchema);

module.exports = collection;
