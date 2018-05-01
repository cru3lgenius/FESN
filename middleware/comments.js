const db = require("../models");


exports.attachAuthorId = async function(req,res,next){ 
  try {
    let comment = await db.Comment.findById(req.params.comment_id);
    req.author_id = comment.author.id.toString() ;
    next(); 
  } catch (error) {
    next(error);
  }
}