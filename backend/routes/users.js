const express = require("express");
const router = express.Router({mergeParams: true});
const connection = require("../db");

const comments = require('./comments');

router.get("/", (req, res, next) => {
  const query = "SELECT * FROM user;";
  connection.query(query, (err, results, fields) => {
    res.status(200).json(results);
  });
});

router.get("/:userId", (req, res, next) => {
  const { userId } = req.params;
  const query = "SELECT * FROM user WHERE user_id=?;";
  connection.query(query, userId, (err, results, fields) => {
    res.status(200).json(results[0]);
  });
});

router.post("/", (req, res, next) => {
  const { name, email, password } = req.body;
  const query = "INSERT INTO user SET ?;";
  connection.query(
    query,
    { name, email, password },
    (error, results, fields) => {
      if(error) console.log(error);
      res.status(201).json({
        user_id: results.insertId,
        name,
        email,
        password,
      });
    }
  );
});

router.put("/:userId", (req, res, next) => {
  const { userId } = req.params;
  const query = "UPDATE user SET ? WHERE user_id=?;";
  connection.query(query, [req.body, userId], (error, results, fields) => {
    res.status(201).json({
      user_id: userId,
      ...req.body,
    });
  });
});

router.delete("/:userId", (req, res, next) => {
  const { userId } = req.params;
  const query = "DELETE FROM user WHERE user_id=?;";
  connection.query(query, userId, (error, results, fields) => {
    res.sendStatus(204);
  });
});

router.use('/:userId/comments', comments);

module.exports = router;
