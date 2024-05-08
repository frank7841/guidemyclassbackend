const { AuthenticationError } = require("apollo-server-errors");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let authHeader;
  if (req.cookies["refreshtoken"] === undefined) {
    authHeader = req.headers.authorization;
  } else {
    authHeader = req.cookies["refreshtoken"];
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(authHeader, process.env.JWT_KEY);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
  req.user_code = decodedToken.user_code;

  req.username = decodedToken.username;
  req.token = authHeader;

  next();
};
