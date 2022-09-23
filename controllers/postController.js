const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const ImagesPost = require("../models/ImagePost");

const createPost = async (req, res) => {
  const {
    title,
    about,
    username,
    category,
    price,
    likes,
    views,
    podCategory,
    location,
    id,
    tel,
    post_images,
  } = req.body;
  console.log({ title, about, username, category, price, id });
  console.log(post_images);
  try {
    const newPost = new Post({
      title,
      about,
      username,
      category,
      podCategory,
      location,
      price,
      likes,
      views,
      id,
      tel,
      post_images,
    });
    console.log(newPost);
    await newPost.save();
    await User.findByIdAndUpdate(
      { _id: id },
      {
        $push: { posts: [newPost] },
      }
    );

    res.status(200).json({ message: "Пост успешно добавлен" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка при добавлении поста" });
  }
};

const allPosts = (req, res) => {
  console.log(req.query.category);
  console.log(req.postParams);
  try {
    Post.find().then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
const findPostById = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postID });
    console.log(post);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
const removeById = (req, res) => {
  try {
    User.find().then((result) => {
      result.forEach((value, index, element) => {
        console.log(value._id);
        Post.findByIdAndRemove(value._id)
          .then(() => {})
          .catch((err) => {
            console.log(err);
          });
      });
    });
    res.status(200).json({ message: "успешно удалил" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
const findPosts = (req, res) => {
  try {
    Post.find({
      $min: { price: "333150" },
      title: { $regex: req.query.title },
    }).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
const addPreview = (req, res) => {
  try {
    Post.findByIdAndUpdate(req.params.postID, {
      $inc: { views: 1 },
    }).then((result) => {
      res.status(200);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
const addFavorite = (req, res) => {
  const { newFavoritePost, id } = req.body;
  try {
    User.findByIdAndUpdate(
      { _id: id },
      {
        $favorite_posts: { posts: [newFavoritePost] },
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = {
  createPost,
  allPosts,
  findPostById,
  findPosts,
  removeById,
  addPreview,
  addFavorite,
};
