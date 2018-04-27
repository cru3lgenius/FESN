const express = require("express");
const router = express.Router();


router.get('/signin',function(req,res){
  console.log("I am loging in");
  res.send("signin");
  
})

router.get('/signup',function(req,res){
  console.log("I am signing up");
  res.send("signup");
})

module.exports = router;