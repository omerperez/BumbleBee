const app = require("./server");
const http = require("http");
const server = http.createServer(app);
const dotenv = require("dotenv");
dotenv.config();

const port = 8080;
server.listen(port, () => {
  console.log("server started on port " + port);
});
