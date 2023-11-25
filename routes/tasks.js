const express = require("express");
const tasksRouter = express();
const taskModel = require("../models/taskModels");

tasksRouter
  .get("/", async (req, res) => {
    try {
      const tasks = await taskModel.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).send("Error al obtener las tareas");
    }
  })
  .post("/", async (req, res) => {
    try {
      const reqTask = req.body;
      const newTask = new taskModel(reqTask);
      await newTask.save();
      res
        .status(200)
        .json({ message: "Tarea creada exitosamente: " + newTask.title });
    } catch (error) {
      res.status(500).send("Error al crear la tarea");
    }
  })
  .put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
    const updateTaks = await taskModel.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );
    if (updateTaks) {
      res.status(200).json(updateTaks);
    } else {
      res.status(404).send(`la tarea con id ${id} no fue encontrada`);
    }
  })
  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deleteTask = await taskModel.findByIdAndDelete(id);
    if (deleteTask) {
      res.status(200).send(`la tarea con id ${id} fue borrada ${deleteTask}`);
    } else {
      res.status(404).send(`la tarea con ${id} no fue borrada`);
    }
  });

module.exports = tasksRouter;
