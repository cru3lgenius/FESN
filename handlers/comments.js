const db = require("../models");

exports.createComment = async function(req,res,next){
  try {
    let comment = await db.Comment.create(req.body);
    let author = await db.User.findById(comment.author.id);
    author.comments.push(comment);
    await author.save();
    let forFragrance = await db.Fragrance.findById(comment.forFragrance.id);
    forFragrance.comments.push(comment);
    await forFragrance.save();
    return res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
  
}