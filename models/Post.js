const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const post = new Schema(
  {
    title: { type: String, required: true },
    about: { type: String, required: true },
    username: { type: String },
    category: { type: String },
    podCategory: { type: String },
    location: { type: String, required: true },
    tel: { type: String },
    price: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    id: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", post);
