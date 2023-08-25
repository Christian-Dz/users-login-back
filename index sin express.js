require("dotenv").config();  // dependencia que ayuda a manejar variables de entorno

const http = require("http"); // Importamos el modulo http
const fs = require("fs");


function requestController(req, res) {
  // logica de nuestro servidor
  const url = req.url;
  const method = req.method;
  console.log(url, method);

  if (method === "GET" && url === "/") {
    res.setHeader("Content-type", "text/html; charset=utf-8");
    res.write("<h1>Hola desde node sin express</h1>");
    res.end();
    return
  }

  else if (method === "GET" && url === "/about") {
    res.setHeader("Content-type", "text/html; charset=utf-8");
    res.write("<h1>Hola desde about</h1>");
    res.end();
    return
  }
    
  else {
    res.setHeader("Content-type", "text/html; charset=utf-8");
    res.write("<h1>No se encontró nada f</h1>");
    res.end();
  }
}

// Configurar nuestro servidor
const server = http.createServer(requestController);

const PORT = process.env.PORT;  // Configurar el puerto

server.listen(PORT, function () {
  console.log("Aplicacion corriendo en puerto: " + PORT);
});
