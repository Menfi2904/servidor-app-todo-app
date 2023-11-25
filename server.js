const express = require("express");
const app = express();
const port = 5000;

const userRouter = require("./routes/users");
const tasksRouter = require("./routes/tasks");

const authRouter = require("./routes/auth");
const connectDb = require("./utils/dbConnection");
const { validateToken } = require("./utils/jwt");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/users", validateToken, connectDb, userRouter);
app.use("/tasks", validateToken, connectDb, tasksRouter);
app.use("/auth", connectDb, authRouter);

app.get("/", (req, res) => {
  res.send("Base de datos: lista de tareas con MongoDB atlas");
});

app.listen(port, () => {
  console.log("servidor iniciando en el puerto... ", port);
});
