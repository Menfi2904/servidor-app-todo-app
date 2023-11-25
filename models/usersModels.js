const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const Task = mongoose.model("users", taskSchema);

module.exports = Task;
