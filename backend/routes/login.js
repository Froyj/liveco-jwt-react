const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require("../db");

const util = require("util");
const queryAsync = util.promisify(db.query).bind(db);

const { createToken } = require('../services/jwt');

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const query = `
      SELECT u.*, r.name as role 
        FROM user as u 
      JOIN role as r
        ON u.id_role = r.id
      WHERE email = ?
    `;
    const result = await queryAsync(query, email);
    const { password: hashedPassword, id, role } = result[0];
    const isAuthentified = bcrypt.compareSync(password, hashedPassword);
    if(isAuthentified) {
      const token = createToken({ id, role })
      return res.status(200).json({
        id,
        role,
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
