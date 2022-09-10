const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");

const createPost = async (req, res) => {
  const { title, about, username, category, price, likes, views, id } =
    req.body;
  console.log({ title, about, username, category, price, id });
  try {
    const newPost = new Post({
      title,
      about,
      username,
      category,
      price,
      likes,
      views,
      id,
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
const findPostById = (req, res) => {
  try {
    Post.findById(req.params.postID).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = { createPost, allPosts, findPostById };
