require("dotenv").config();  // dependencia que ayuda a manejar variables de entorno

const http = require("http");

function requestController() {
  // logica de nuestro servidor
  console.log("recibimos una nueva request");
}

const server = http.createServer(requestController);

const PORT = process.env.PORT;  //

server.listen(PORT, function () {
  console.log("Aplicacion corriendo en puerto: " + PORT);
});
