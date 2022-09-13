const { Schema, model } = require("mongoose");

const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  subscribers: { type: Number, required: true, default: 0 },
  location: { type: String },
  avatar: { type: String, default: null },
  roles: [{ type: String, ref: "Role" }],
  posts: [
    {
      type: Schema.Types.Array,
      ref: "Post",
    },
  ],
});

module.exports = model("User", User);
