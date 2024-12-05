const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');

// const connection = mongoose.connection;
// console.log("mg = ", mongoose.connection);
// autoIncrement.initialize(connection);

const usersSchema = new mongoose.Schema({
    // userId: {
    //     type: Number,
    //     unique: true,
    // },
    username: {
        type: String,
        required: true,
        unique: true,
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
        minlength: 8, // Panjang minimum password
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],
        default: 'user',
    },
});

// usersSchema.plugin(autoIncrement.plugin, {
//     model: 'Users',
//     field: 'userId',
//     startAt: 1,
//     incrementBy: 1
// });

const collection = mongoose.model('Users', usersSchema);

module.exports = collection;