
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
//const mongoose = require("mongoose");
//const Schema = mongoose.Schema;

/* mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Conexion exitosa")
  })
  .catch((err) => 
    console.log("Hubo un error al conectarse", { err })
  ); */

app.use(express.static("public")); // Middleware de archivos estaticos
//app.use(express.json()); // Middleware para parsear el body de las requests

// Setting the routes
//app.get("/api/tasks", (req, res) => {
app.get("/", (req, res) => {
  res.send("hello world");
});

//app.post("/api/tasks", (req, res) => {
app.post("/", (req, res) => {
  //const body = req.body;
  //res.status(201).json({ok:true, message: "Tarea creada"})
});

// Listening the app in a port
app.listen(port, () => {
  console.log(`Listening in port: ${port}`);
});