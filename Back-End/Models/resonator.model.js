const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    img: { type: String, required: true },
    link: { type: String },
    bgColor: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Character", characterSchema);
