const jwt = require("jsonwebtoken");
const { ClientError } = require("../helpers/errors");

const validateToken = (req, res, next) => {
  const header = req.header("authorization");

  if (!header) {
    throw new Error("Access denied");
  } else {
    const [bearer, token] = header.split(" ");

    if (bearer == "Bearer" && token) {
      try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          throw new ClientError("Token is expired");
        } else if (err.name === "JsonWebTokenError") {
          throw new ClientError("Token is invalid");
        }
      }
    } else {
      throw new Error("Token Invalid");
    }
  }
};

module.exports = { validateToken };
