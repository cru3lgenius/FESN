const mongoose = require("mongoose");

const fragranceSchema = new mongoose.Schema({
  brand:{
    type:String,
    required:true
  },
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
  imageUrl:{
    type:String
  },
  comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Comment"
  }],
  createdAt:{
    type:Date,
    default:Date.now
  },
  description:{
    type:String
  },
  occasion:{
    type:String,
    required:true
  },
  season:{
    type:String,
    required:true
  },
  performance:{
    type:String,
    required:true
  }
});

const Fragrance = mongoose.model("Fragrance",fragranceSchema);
module.exports = Fragrance;