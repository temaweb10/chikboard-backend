const express = require("express");
const router = express.Router();
const getPostMiddleware = require("../middleware/getPostMiddleware");
const {
  createPost,
  allPosts,
  findPostById,
  findPosts,
  removeById,
  addPreview,
  addFavorite,
  arrTest,changePostTypeById
} = require("../controllers/postController");

router.post("/api/add-post", createPost);
router.post("/api/add-favorite-post", addFavorite);
router.post("/api/arr", arrTest);
router.get("/api/posts", getPostMiddleware, allPosts);
router.get("/api/post/:postID", findPostById);
router.get("/api/search-post", findPosts);
router.put("/api/post-views-update/:postID", addPreview);
router.put("/api/post/type-change/:postID", changePostTypeById);
router.delete("/api/remove-by-id/:postID", removeById);

module.exports = router;
