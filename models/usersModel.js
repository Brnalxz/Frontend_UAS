const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
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

const collection = mongoose.model('Users', usersSchema);

module.exports = collection;