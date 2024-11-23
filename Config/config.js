const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://Marco:1234marco@cluster0-shard-00-00.rxj3p.mongodb.net:27017,cluster0-shard-00-01.rxj3p.mongodb.net:27017,cluster0-shard-00-02.rxj3p.mongodb.net:27017/?ssl=true&replicaSet=atlas-2riovo-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0");

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

const collection = mongoose.model('User', userSchema);

module.exports = collection;



