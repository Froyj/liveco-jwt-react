const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const createToken = (payload) => {
  const token = jwt.sign(
    {
      data: { ...payload },
      exp: Math.floor(Date.now() / 1000) + 3600,
    },
    process.env.JWT_KEY
  );

  return token;
};

const authWithJwt = expressJwt({
  secret: process.env.JWT_KEY,
  algorithms: ["HS256"]
});

const checkUserId = (req, res, next) => {
  if(parseInt(req.params.userId) === req.user.data.userId) {
    return next();
  }
  res.status(401).send("You cannot see this!!!")
}



module.exports = { authWithJwt, createToken, checkUserId };
