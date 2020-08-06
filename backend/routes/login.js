const express = require("express");
const router = express.Router();
const connection = require("../db");

const bcrypt = require("bcrypt");
const util = require("util");
const queryAsync = util.promisify(connection.query).bind(connection);

const { createToken } = require("../services/jwt");

router.post("/",  async (req, res) => {
  const { email, password } = req.body;
  try {
    // on récupère le mot de passe encrypté en base
    const query = `SELECT * FROM user WHERE email = ?`;
    const result = await queryAsync(query, email);
    const hashedPassword = result[0].password;
    // on compare avec bcrypt le mdp entré et celui hashé en base
    const isAuthentified = await bcrypt.compare(password, hashedPassword);
    const { user_id: userId } = result[0];
    // On passe le token dans les cookies si l'utilisateur est authentifié
    if (isAuthentified) {
      const token = createToken({ userId });
      res.cookie('token', token, { httpOnly: true });
      res.cookie('id', userId);
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
