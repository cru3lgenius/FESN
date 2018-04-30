const db = require("../models");


exports.getUser = async function(req,res,next){
  try {
    let user = await db.User.findById(req.params.id).populate("comments",{
      text:true,
      forFragrance:true
    });
    const {comments,fragrances,_id,username,email} = user;
    return res.status(200).json({
      username,
      email,
      fragrances,
      comments
    });
  } catch (error) {
    next(error);
  }
}

exports.getUsers = async function(req,res,next){
  try {
    let allUsers = await db.User.find();
    let filteredUsers = allUsers.map(user=>{
      const {username,email,fragrances,comments} = user;
      return {username,email,fragrances,comments};
    });
    return res.status(200).json(filteredUsers);
  } catch (error) {
    next(error);
  }
}