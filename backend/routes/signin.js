const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require("../db");

const util = require("util");
const queryAsync = util.promisify(db.query).bind(db);

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // vérifier que l'utilisateur n'existe pas déjà
    const checkQuery = "SELECT * FROM user WHERE email = ?";
    const result = await queryAsync(checkQuery, email);
    const userExists = Boolean(result.length);
    if (userExists) {
      return res.status(409).json({
        statusCode: 409,
        message: "User already exists with this email"
      });
    }

    // Générer un hash sur la base du mdp
    const hash = bcrypt.hashSync(password, 10);

    //Faire l'insertion si il n'existe pas déjà
    const insertQuery = "INSERT INTO user SET ?";
    const insResult = await queryAsync(insertQuery, {...req.body, password:hash});
    res.status(201).json({
      id: insResult.insertId,
      ...req.body,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('A problem occured !')
  }
});

module.exports = router;
