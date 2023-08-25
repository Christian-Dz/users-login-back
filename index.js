require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;

app.use(express.static("public")); // Middleware de archivos estaticos

// Setting the routes
app.get("/", (req, res) => {
  res.send("hello world");
});

// Listening the app in a port
app.listen(port, () => {
  console.log(`Listening in port: ${port}`);
});
