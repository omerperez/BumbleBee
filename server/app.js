const dotenv = require("dotenv");
dotenv.config();
const app = require("./server");

const port = 8080; //process.env.port;
app.listen(port, () => {
  console.log("server started on port " + port);
});
