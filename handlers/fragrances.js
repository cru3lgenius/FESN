const db = require("../models");

exports.createFragrance = async function(req,res,next){
  try {
     let fragrance = await db.Fragrance.create(req.body);
     let creator = await db.User.findById(req.body.uploadedBy.id);
     creator.fragrances.push(fragrance);
     await creator.save();
     return res.status(200).json(fragrance);
  } catch (error) {
     next(error);
  }
}

exports.getFragrances = async function(req,res,next){
  try {
    let allFragrances = await db.Fragrance.find();
    console.log(allFragrances);
    return res.status(200).json(allFragrances);
  } catch (error) {
    next(error);
  }
}

exports.getFragrance = async function(req,res,next){
  try {
    let fragrance = await db.Fragrance.findById(req.params.id);
    return res.status(200).json(fragrance);
  } catch (error) {
    next(error);
  }
}