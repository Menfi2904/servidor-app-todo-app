const mongoose = require("mongoose");

async function connectDb(req, res, next) {
  try {
    await mongoose.connect(
      "mongodb+srv://garciamenfi31:12345@cluster0.biodlsd.mongodb.net/?retryWrites=true&w=majority",
      { dbName: "TodoApp" }
    );
    console.log("conexion exitosa");
    next();
  } catch (error) {
    console.log("Error:", error);
  }
}

module.exports = connectDb;
