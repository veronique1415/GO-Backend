const jwt = require("jsonwebtoken");

function createError(statusCode, message) {
    return res.status(statusCode).json({ error: message });
  }

module.exports = (req, res, next) => {
  const bearerTokenString = req.headers.authorization;

  if (!bearerTokenString) {
    return createError(401, "Resource requires Bearer token in Authorization header");
  }

  // turn the header authorization from a string to an array split on the space in between `Bearer token`
  const splitBearerTokenString = bearerTokenString.split(" ");


  if (splitBearerTokenString.length !== 2) {
    return createError(400, "Bearer token is malformed");
  }
  //get token from bearer
  const token = splitBearerTokenString[1];

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
        return createError(403, "Invalid JWT");
    }
    next();
  });
};