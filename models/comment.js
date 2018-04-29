const mongoose = require("mongoose");
const User = require("./user");
const Fragrance = require("./fragrance");

const commentSchema = new mongoose.Schema({
  author:{
    username:{
      type:String,
      required:true
    },
    id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    }
  },
  text:{
    type:String,
    maxlength:200,
    minlength:1
  },
  forFragrance:{
    name:{
      type:String,
      required:true
    },
    id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Fragrance",
      required:true
    }  
  }
},{
  timestamps:true
});


commentSchema.pre("remove",async function(next){
  try {
    let author = await User.findById(this.author.id);
    let fragrance = await fragrance.findById(this.forFragrance.id);

    author.comments.remove(this.id);
    author.save();

    fragrance.comments.remove(this.id);
    fragrance.save();
    return next();
  } catch (error) {
    return next(error);
  }
})

const Comment = mongoose.model("Comment",commentSchema);
module.exports = Comment;