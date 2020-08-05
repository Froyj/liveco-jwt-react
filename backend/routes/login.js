const express = require("express");
const router = express.Router();
const connection = require("../db");

const bcrypt = require("bcrypt");
const util = require("util");
const queryAsync = util.promisify(connection.query).bind(connection);

const { createToken } = require("../services/jwt");

router.post("/",  async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const query = `SELECT * FROM user WHERE email = ?`;
    const result = await queryAsync(query, email);
    const hashedPassword = result[0].password;
    const isAuthentified = await bcrypt.compare(password, hashedPassword);
    const { user_id: userId } = result[0];
    if (isAuthentified) {
      // Creer un token
      const token = createToken({ userId });
      res.status(200).json({
        userId,
        token
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("A problem occured !");
  }
});

module.exports = router;
