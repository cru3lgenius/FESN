const db = require("../models");


exports.getUser = async function(req,res,next){
  try {
    let user = await db.User.findById(req.params.id);
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