const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const post = new Schema({
  title: { type: String },
  about: { type: String },
  username: { type: String },
  category: { type: String },
  price: { type: Number },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  id: { type: String },
});

module.exports = mongoose.model("Post", post);
