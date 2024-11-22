const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/Login-tut");

connect.then(()=> {
    console.log("database connected");
});

const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    }
});


const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;
