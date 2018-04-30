const express = require("express");
const router = express.Router({mergeParams:true});
const {createFragrance,getFragrances,getFragrance} = require("../handlers/fragrances");
const {createComment} = require("../handlers/comments");

router.route("/")
      .get(getFragrances)
      .post(createFragrance);

router.route("/:id")
      .get(getFragrance)

router.route("/:id/comments")
      .post(createComment);

      
module.exports = router;