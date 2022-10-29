const http = require("http");
const formidable = require("formidable");

const server = http.createServer(function (request, response) {
  const form = formidable({ multiples: true });
  form.parse(request, (err, fields, files) => {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ totalFields: Object.keys(fields).length }));
  });
});

server.listen(3005);
