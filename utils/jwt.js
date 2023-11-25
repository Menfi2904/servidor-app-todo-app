const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(user) {
  console.log(user);
  return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "25m" });
}

function validateToken(req, res, next) {
  const accessToken = req.headers["authorization"];
  if (!accessToken) {
    res.json("acceso denegado, requiere un token");
  } else {
    jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        res.json("acceso denegado, token expirado o incorrecto");
        console.log(err);
      } else {
        next();
      }
    });
  }
}

module.exports = { generateToken, validateToken };
