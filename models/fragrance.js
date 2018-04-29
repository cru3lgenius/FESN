const mongoose = require("mongoose");

const fragranceSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  uploadedBy:{
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
  rating:{
    type:Number,
    min:0,
    max:5,
    default:0
  },
  imageUrl:{
    type:String
  },
  comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Comment"
  }]
});

const Fragrance = mongoose.model("Fragrance",fragranceSchema);
module.exports = Fragrance;