const express = require("express");
const authRouter = express();
const userModel = require("../models/usersModels");
const { generateToken } = require("../utils/jwt");

authRouter.post("/", async (req, res) => {
  console.log("entro una peticion de autorizacion");
  console.log(req.body);
  const { username, password } = req.body;
  const user = await userModel.findOne({ username, password });
  if (!user) {
    res.status(401).json("usuario no registrado");
  } else {
    const accessToken = generateToken({ username: user.username });
    res.header("authorization", accessToken).json({
      mensaje: "usuario autenticado",
      token: accessToken,
    });
  }
});

module.exports = authRouter;
