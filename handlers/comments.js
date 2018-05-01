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

exports.deleteComment = async function(req,res,next){
  try {
    
    let comment = await db.Comment.findById(req.params.comment_id);
    let user = await db.User.findById(comment.author.id);
    let fragrance = await db.Fragrance.findById(comment.forFragrance.id);

    //update references
    await user.comments.remove(comment);
    await fragrance.comments.remove(comment);
    user.save();
    fragrance.save();

    //remove comment
    await comment.remove();
 
    return res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
}

