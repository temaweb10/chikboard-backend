const { Schema, model } = require("mongoose");

const User = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    tel: { type: String, required: true },
   /*  subscribers: [
      {
        type: Schema.Types.Array,
        ref: "SubscribersUser",
      },
    ], */
    subscribersList: [
      {
        type: Schema.Types.Array,
        ref: "SubscribersUserS"
        , required: true 
      },
    ],
    location: { type: String },
    avatar: { type: String, default: null },
    roles: [{ type: String, ref: "Role" }],
    posts: [
      {
        type: Schema.Types.Array,
        ref: "Post",
      },
    ],
    favorite_posts: [
      {
        type: Schema.Types.Array,
        ref: "Post",
      },
    ],
    rating: { type: Number, default: 0 },
    feedback_count: { type: Number, default: 0 },
    subscribed_count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = model("User", User);
