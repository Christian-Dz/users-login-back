const http = require("http")

function requestController() {
  // logica de nuestro servidor
console.log("recibimos una nueva request")
}

const server = http.createServer(requestController)

server.listen(4000)
