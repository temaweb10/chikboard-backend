const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/userСontroller");

router.get("/api/users", getAllUsers);

module.exports = router;
