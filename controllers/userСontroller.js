const User = require("../models/User");
const Post = require('../models/Post')
const getAllUsers = (req, res) => {
  try {
    User.find().then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
const findUser = (req, res) => {
  try {
    User.findById(req.params.userId).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
const findUserByUserName = (req, res) => {
  try {
    User.findOne({ username: req.params.userName }).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
const userEdit = (req, res) => {
  /*   const id = req.params.userId; */
  const { avatar } = req.body;
  console.log(req.params.userId);
  try {
    User.findByIdAndUpdate(req.params.userId, {
      avatar,
    }).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

const UserMe = (req, res) => {
  try {
    if (req.user) {
      User.findById(req.user.user.id).then((result) => {
        result.password = "null";
        res.status(200).json(result);
      });
    } else {
      res.status(500).json({ message: "Ошибка сервера" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
const addSubscribe = (req, res) => {
  const userId = req.params.userId;
  const subscribeUserId = req.params.subscribeUserId;
  console.log(userId,subscribeUserId)
    User.findByIdAndUpdate(
      { _id: userId } ,
      { $push: { subscribersList: [subscribeUserId] } }
    )
    .then((result) => {
      console.log(result)
      res.status(200).json({message:'подписчик успешно добавлен'})
    })
    .catch((err)=>{
      console.log(err);
      res.status(500).json({ message: "Ошибка сервера" });
    })
};
const removeSubscribe = (req, res) => {
  const userId = req.params.userId;
  const subscribeUserId = req.params.subscribeUserId;
  
    User.findByIdAndUpdate(
      { _id: userId } ,
      { $pull: { subscribersList: [subscribeUserId] } }
    )
    .then((result) => {
      console.log(result)
      res.status(200).json({message:'отписан'})
    })
    .catch((err)=>{
      console.log(err);
      res.status(500).json({ message: "Ошибка сервера" });
    })
};

const deleteUserById = (req, res) => {
  const  username  = req.params.username;
  console.log(username)
  try {
    User.find({username}).then((result) => {


     if(result[0]?.posts?.length !== 0){
        result[0].posts.forEach((postMap)=>{
            console.log(postMap)
    
            Post.findByIdAndRemove(postMap[0]._id)
            .then((result) => {console.log(result)})
            .catch((err) => {
              console.log(err);
            });
          }) 
      } 
      
     User.findOneAndRemove({username}).then((resDel)=>{
        console.log(resDel)
      })
      .catch((err)=>{
        console.log(err)
      }) 
    });
    res.status(200).json({message:"Пользователь удалён"}); 
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

module.exports = {
  getAllUsers,
  userEdit,
  findUser,
  UserMe,
  findUserByUserName,deleteUserById,addSubscribe,removeSubscribe
};
