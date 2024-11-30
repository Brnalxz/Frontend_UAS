const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Username harus unik
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validasi email
    },
    location: {
      type: String,
    },
    createAt: {
      type: Date,
      default: Date.now, // Waktu pendaftaran
    },
    profileImg: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const collection = mongoose.model("Users", profileSchema);

module.exports = collection;
