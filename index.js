require("dotenv").config();

const express = require("express");
const app = express();

const port = process.env.PORT;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Conexion exitosa al servidor con mongoose");
  })
  .catch((err) =>
    console.log("Hubo un error al conectarse al servidor con mongoose", { err })
  );
  
const taskSchema = new Schema({
  name: String,
  done: Boolean
})

const Task = mongoose.model("Task", taskSchema, "Tasks");

app.use(express.static("public")); // Middleware de archivos estaticos
app.use(express.json()); // Middleware para parsear el body de las requests

// Setting the routes
app.get("/api/tasks", (req, res) => {
  res.send("hello world");
});

app.post("/api/tasks", (req, res) => {
  const body = req.body;
  Task.create({
    name: body.text,
    done: false,
  }).then((createdTask) =>
  {
    res
      .status(201)
      .json({ ok: true, message: "Tarea creada con el metodo POST", data: createdTask })
  }).catch((err) => {
    res
      .status(400)
      .json({ ok: false, message: "Error al crear la tarea con el metodo POST"});
  })
  
});

// Listening the app in a port
app.listen(port, () => {
  console.log(`Listening in port: ${port}`);
});
