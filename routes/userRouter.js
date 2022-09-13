const express = require("express");
const router = express.Router();
const { getAllUsers, userEdit } = require("../controllers/userСontroller");

router.get("/api/users", getAllUsers);
router.put("/api/user/edit/:userId", userEdit);

module.exports = router;
