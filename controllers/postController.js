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
    descPost,
  } = req.body;
  console.log(podCategory);
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
      descPost,
    });
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
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
const removeById = (req, res) => {
  try {
    User.find().then((result) => {
      result.forEach((value, index, element) => {
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
  const { title } = req.body;
  console.log(title);
  try {
    Post.find({
      title: { $regex: String(title) },
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
    ).then((result) => {
      res.status(200);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
const changePostTypeById = (req, res) => {
  const { newType, postID } = req.body;
  try {
    Post.findByIdAndUpdate(
      { _id: postID },
      {
        typePost: newType,
      }
    ).then((result) => {
      console.log(result);
      console.log("try");
      res.status(200).json({ message: "Тип изменён" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
const arrTest = (req, res) => {
  try {
    const { arr } = req.body;
    console.log(req.body);
    console.log(req.body.arr[0].a);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "ошибка сервера",
    });
  }
};

const recommendPosts = (req, res) => {
  const { recommend } = req.body;
  console.log(title);
  try {
    Post.find({
      category: { $regex: String(title) },
      podCategory: { $regex: String(title) },
    }).then((result) => {
      res.status(200).json(result);
    });
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
  arrTest,
  changePostTypeById,
  recommendPosts,
};
