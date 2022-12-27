const { Schema, model } = require("mongoose");

const SubscribersUserList = new Schema({
  subscribersList: { type: String },
});

module.exports = model("SubscribersUser", SubscribersUserList);
