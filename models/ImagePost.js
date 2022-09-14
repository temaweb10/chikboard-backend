const { Schema, model } = require("mongoose");

const ImagesPost = new Schema({
  image_url: { type: String },
});

module.exports = model("ImagesPost", ImagesPost);
