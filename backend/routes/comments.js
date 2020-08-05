const express = require("express");
const router = express.Router({mergeParams: true});
const connection = require("../db");

router.get("/", (req, res, next) => {
  const { userId } = req.params;
  let query = "SELECT * FROM comment";
  if (userId) {
    query += " WHERE user_id=?"
  }
  query += " "
  connection.query(query, userId, (err, results, fields) => {
    res.status(200).json(results);
  });
});

router.get("/:commentId", (req, res, next) => {
  const { userId, commentId } = req.params;
  const query = "SELECT * FROM comment WHERE comment_id=? AND user_id=?;";
  connection.query(query, [commentId, userId], (err, results, fields) => {
    res.status(200).json(results[0]);
  });
});

router.post("/", (req, res, next) => {
  const { userId } = req.params;
  const { message } = req.body;
  const query = "INSERT INTO comment SET ?;";
  connection.query(query, { message, user_id: userId }, (error, results, fields) => {
    if (error) console.log(error);
    res.status(201).json({
      comment_id: results.insertId,
      message,
      user_id: userId,
    });
  });
});

router.put("/:commentId", (req, res, next) => {
  const { userId, commentId } = req.params;
  const { message } = req.body;
  const query = "UPDATE comment SET ? WHERE comment_id=? and user_id=?;";
  connection.query(query, [{message}, commentId, userId], (error, results, fields) => {
    res.status(201).json({
      comment_id: commentId,
      message,
    });
  });
});

router.delete("/:commentId", (req, res, next) => {
  const { commentId, userId } = req.params;
  const query = "DELETE FROM comment WHERE comment_id=? and user_id=?;";
  connection.query(query, [commentId, userId], (error, results, fields) => {
    res.sendStatus(204);
  });
});

module.exports = router;
