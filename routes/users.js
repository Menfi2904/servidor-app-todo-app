const express = require("express");
const userRouter = express();
const userModel = require("../models/usersModels");

userRouter
  .get("/", async (req, res) => {
    const users = await userModel.find();
    res.json(users);
  })
  .post("/", async (req, res) => {
    const reqUser = req.body;
    const newUser = new userModel(reqUser);
    newUser.save();
    res.status(200).send(`usuario ${newUser.username} creado exitosamente`);
  })
  .put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
    const updateUser = await userModel.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );
    if (updateUser) {
      res.status(200).json(updateUser);
    } else {
      res.status(404).send(`El usuario con id ${id} no fue encontrado`);
    }
  })
  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deleteUser = await userModel.findByIdAndDelete(id);
    if (deleteUser) {
      res.status(200).send(`El usuario con id ${id} fue borrado ${deleteUser}`);
    } else {
      res.status(404).send(`El usuario con ${id} no fue borrado`);
    }
  });

module.exports = userRouter;
