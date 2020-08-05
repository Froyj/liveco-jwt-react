const express = require('express');
const router = express.Router();

const comments = require('./comments');
const users = require('./users');
const signin = require('./signin');
const login = require('./login');

router.use('/comments', comments)
router.use('/users', users)
router.use('/signin', signin)
router.use('/login', login)

module.exports = router;