const db = require("../models");


exports.getUser = async function(req,res,next){
  try {
    let user = await db.User.findById(req.params.id).populate("comments",{
      text:true,
      forFragrance:true
    }).populate("fragrances",{
      brand:true,
      createdAt:true,
      imgUrl:true
    });
    const {id,comments,fragrances,username,email,communityRole,socialMediaLinks,profileImageUrl} = user;
    return res.status(200).json({
      id,
      username,
      email,
      fragrances,
      comments,
      communityRole,
      socialMediaLinks,
      profileImageUrl
    });
  } catch (error) {
    next(error);
  }
}

exports.getUsers = async function(req,res,next){
  try {
    let allUsers = await db.User.find();
    let filteredUsers = allUsers.map(user=>{
      const {id,username,email,fragrances,comments} = user;
      return {id,username,email,fragrances,comments};
    });
    return res.status(200).json(filteredUsers);
  } catch (error) {
    next(error);
  }
}