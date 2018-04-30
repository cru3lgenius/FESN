const express = require("express");
const router = express.Router({mergeParams:true});

const {getUser,getUsers} = require("../handlers/users");


router.route("/:id").get(getUser);

router.route("/").get(getUsers);

module.exports = router;


