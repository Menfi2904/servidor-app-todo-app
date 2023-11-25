const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  id:String,
  title: String,
  description: String,
  completed: Boolean,
});

const Task = mongoose.model("tasks", taskSchema);

module.exports = Task;
