const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  userEdit,
  findUser,
  UserMe,
  findUserByUserName,deleteUserById
} = require("../controllers/userСontroller");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/api/users", getAllUsers);
router.get("/api/user/findById/:userId", findUser);
router.get("/api/user/find/:userName", findUserByUserName);
router.get("/api/me", authMiddleware, UserMe);
router.put("/api/user/edit/:userId", userEdit);
router.delete("/api/user/delete/:username", deleteUserById);

module.exports = router;
