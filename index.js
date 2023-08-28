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
  Task.find().then((tasks) => {
    res
      .status(200)
      .json({ ok: true, data: tasks });
  })
    .catch((err) => {
      res
        .status(400)
        .json({ ok: false, message: "Hubo un problema en la peticion GET" });
  })
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

app.put("/api/tasks/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;
  Task.findByIdAndUpdate(id, {
    name: body.text
  })
    .then((updatedTask) => {
      res
        .status(200)
        .json({
          ok: true,
          message: "Tarea actualizada con el metodo PUT",
          data: updatedTask,
        });
    })
    .catch((err) => {
      res
        .status(400)
        .json({
          ok: false,
          message: "Error al editar la tarea con el metodo PUT",
        });
    });
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = req.params.id;
  Task.findByIdAndRemove(id)
    .then((deletedTask) => {
      res.status(200).json({ ok: true, data: deletedTask });
    })
    .catch((err) => {
      res
        .status(400)
        .json({
          ok: false,
          message: "Error al eliminar la tarea con el metodo DELETE",
        });
    });
});

// Listening the app in a port
app.listen(port, () => {
  console.log(`Listening in port: ${port}`);
});
