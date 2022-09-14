const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
const postRouter = require("./routes/postRouter");
const userRouter = require("./routes/userRouter");
const testRouter = require("./routes/testRoutes");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const db = process.env.MONGO_URL;
const app = express();

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const start = async () => {
  try {
    await mongoose
      .connect(db)
      .then(() => console.log("db connect"))
      .catch((err) => console.log(err));

    app.listen(PORT, () => console.log(`SERVER START ON PORT ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();

app.use(authRouter);
app.use(postRouter);
app.use(userRouter);
app.use(testRouter);
