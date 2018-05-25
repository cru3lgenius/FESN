const jwt = require("jsonwebtoken");


exports.ensureCorrectUser = function(req,res,next){
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
      if(decoded && decoded.id === req.author_id ){
        next();
      }else{
        next({
          status:"401",
          message:"Unauthorized!"
        });
      }
    });
  } catch (error) {
    next({
      status:"401",
      message:"Unauthorized!"
    });
  }
}

exports.loginRequired = function(req,res,next){
  try {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
      if(decoded){
        next();
      }else{
        return next({
          status:401,
          message:"Please log in first :)"
        })
      }
    });
  } catch (error) {
    return next(
      {
        status:401,
        message:"Please log in first :)"
      }
    );
  }
}