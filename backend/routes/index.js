const express = require('express');
const router = express.Router();

const comments = require('./comments');
const users = require('./users');

router.use('/comments', comments)
router.use('/users', users)

module.exports = router;