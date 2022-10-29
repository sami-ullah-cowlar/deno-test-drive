const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("./localhost-key.pem", "utf8"),
  cert: fs.readFileSync("./localhost.pem", "utf8"),
};

let app = https.createServer(options, (request, response) => {
  let data = "";
  request.on("data", (chunk) => data += chunk);
  request.on("end", () => {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ name: JSON.parse(data).name }));
  });
});

app.listen(3003);
