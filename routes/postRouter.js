const express = require("express");
const router = express.Router();
const getPostMiddleware = require("../middleware/getPostMiddleware");
const {
  createPost,
  allPosts,
  findPostById,
  findPosts,
  removeById,
} = require("../controllers/postController");

router.post("/api/add-post", createPost);
router.get("/api/posts", getPostMiddleware, allPosts);
router.get("/api/post/:postID", findPostById);
router.get("/api/search-post", findPosts);
/* router.delete("/api/remove-by-id/:postID", removeById); */

module.exports = router;
