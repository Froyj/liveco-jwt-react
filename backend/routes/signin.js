const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require("../db");

const util = require("util");
const queryAsync = util.promisify(db.query).bind(db);

const saltRounds = 10;

router.post("/", async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    const query = 'SELECT * FROM user WHERE email = ?';
    const results = await queryAsync(query, email);
    if(results.length > 0) {
      return res.status(409).send('User already exists');
    }
    const insertQuery = 'INSERT INTO user SET ?'
    //Hash du mdp et stockage du mdp hashé en base
    bcrypt.hash(password, saltRounds, async function(err, hash) {
      const insertResult = await queryAsync(insertQuery, {
        email,
        password: hash,
        name
      })
      res.status(201).json({
        id: insertResult.insertId,
        email,
        password: hash,
        name
      })
  });
  } catch (err) {
    console.log(err)
    res.status(500).send('A problem occured !')
  }
});

module.exports = router;
