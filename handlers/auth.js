const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req,res,next){

  try {
    
    let {email,password} = req.body;
    let userEntry = await db.User.findOne({email});

    if(typeof userEntry !== 'undefined' && userEntry !== null){

      const isMatch = await userEntry.comparePassword(password,next);
      let {username,id,profileImageUrl} = userEntry;
      
      if(isMatch){
        let token = jwt.sign({
          username,
          id,
          profileImageUrl
        },process.env.SECRET_KEY);
        return res.status(200).json({
          id,
          username,
          profileImageUrl,
          token
        });
      }else{
        return next({
          status:400,
          message:"Invalid Email or Password."
        });
      }
      
    }else{
      //Handle user not existing
      return next({
        status:400,
        message:"There is no user with the given email."
      });
    }
    res.send(userEntry);
  } catch (error) {
      return next({
        status:400,
        message:error.message
      });
  }

}

exports.signup = async function(req,res,next){
  
  try {
    let user = await db.User.create(req.body);
    let {id,username,profileImageUrl} = user;
    let token = jwt.sign({
      id,
      username,
      profileImageUrl
    },process.env.SECRET_KEY);
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    });
  } catch (error) {
    next({
      status:400,
      message:error.message
    })
  }

}