const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const createToken = (payload) => {
  const token = jwt.sign(
    {
      data: payload,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    process.env.JWT_KEY
  );
  return token;
};

const simpleAuth = expressJwt({
  secret: process.env.JWT_KEY,
  algorithms: ["HS256"],
});

const roleBasedAuth = (roles = []) => {
  if(typeof roles === 'string') {
    roles = [roles];
  }

  return [
    simpleAuth,
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.data.role)) {
        return res.status(403).send('You shall not pass !')
      }
      next();
    }
  ]
}


module.exports = {
  createToken,
  simpleAuth,
  roleBasedAuth
};
