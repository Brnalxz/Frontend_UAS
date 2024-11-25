const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: String,
    email: String,
    // password: String, // Need to get Encrypted later
    // bio: String,
    // // joinDate: Date,
    // location: String,
});

module.exports = mongoose.model('Users', usersSchema);

