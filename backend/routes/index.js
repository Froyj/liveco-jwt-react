const express = require("express");
const router = express.Router();

const comments = require("./comments");
const users = require("./users");
const signin = require("./signin");
const login = require("./login");
const { authWithJwt, checkUserId } = require("../services/jwt");

router.use("/comments", comments);
router.use("/users", users);
router.use("/signin", signin);
router.use("/login", login);

module.exports = router;
