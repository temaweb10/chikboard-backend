const User = require("../models/User");

const getAllUsers = (req, res) => {
  try {
    User.find().then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
const userEdit = (req, res) => {
  /*   const id = req.params.userId; */
  const { avatar } = req.body;
  console.log(req.params.userId);
  try {
    User.findByIdAndUpdate(req.params.userId, {
      avatar,
    }).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = { getAllUsers, userEdit };
