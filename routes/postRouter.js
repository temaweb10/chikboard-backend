const express = require("express");
const router = express.Router();
const getPostMiddleware = require("../middleware/getPostMiddleware");
const {
  createPost,
  allPosts,
  findPostById,
} = require("../controllers/postController");

router.post("/api/add-post", createPost);
router.get("/api/posts", getPostMiddleware, allPosts);
router.get("/api/post/:postID", findPostById);

module.exports = router;
