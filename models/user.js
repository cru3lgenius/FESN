const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  profileImageUrl:{
    type:String
  }
});

userSchema.pre("save",async function(next){
  try {
    if(!this.isModified("password")){
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password,10);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    next(error);
  } 
});

userSchema.methods.comparePassword = async function(candidatePassword,next){
  try {
    
    let isMatch = await bcrypt.compare(candidatePassword,this.password);
    
    return isMatch;
  } catch (error) {
    return next(error);
  }
}

const User = mongoose.model("User",userSchema);

module.exports = User;