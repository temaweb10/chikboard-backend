const { Schema, model } = require("mongoose");

const SubscribedList = new Schema({
    SubscribedList: { type: String },
});

module.exports = model("SubscribedList", SubscribedList);
