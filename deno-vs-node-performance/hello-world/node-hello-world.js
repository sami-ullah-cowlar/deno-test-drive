const http = require("http");

const server = http.createServer(function (request, response) {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ body: "Hello world" }));
});

server.listen(3001);
