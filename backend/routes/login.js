const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const connection = require("../db");

const util = require("util");
const queryAsync = util.promisify(connection.query).bind(connection);

const { createToken } = require('../services/jwt');

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const query = `SELECT * FROM user WHERE email = ?`;
    const result = await queryAsync(query, email);
    const { password: hashedPassword, user_id :userId } = result[0];
    const isAuthentified = bcrypt.compareSync(password, hashedPassword);
    if(isAuthentified) {
      const token = createToken({ userId })
      return res.status(200).json({
        id: userId,
        token
      })
    }
    res.status(400).send("I don't know you !")
  } catch (err) {
    console.log(err);
    res.status(500).send('A problem occured !')
  }
});

module.exports = router;
