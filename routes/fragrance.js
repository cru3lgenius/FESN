const express = require("express");
const router = express.Router({mergeParams:true});

const {createFragrance,getFragrances,getFragrance} = require("../handlers/fragrances");
const {createComment,deleteComment} = require("../handlers/comments");
const { ensureCorrectUser } = require("../middleware/auth");
const { attachAuthorId } = require("../middleware/comments");


router.route("/")
      .get(getFragrances)
      .post(createFragrance);

router.route("/:id")
      .get(getFragrance);

router.route("/:id/comments")
      .post(createComment);

router.delete("/:id/comments/:comment_id",attachAuthorId,ensureCorrectUser,deleteComment);
      
module.exports = router;