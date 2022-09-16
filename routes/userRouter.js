const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  userEdit,
  findUser,
} = require("../controllers/userСontroller");

router.get("/api/users", getAllUsers);
router.get("/api/user/find/:userId", findUser);
router.put("/api/user/edit/:userId", userEdit);

module.exports = router;
