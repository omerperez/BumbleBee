const express = require("express");
const db = require("./db/index");
const bodyParser = require("body-parser");
const user = require("./Routes/userRoutes");
const car = require("./Routes/carRoutes");
const dotenv = require("dotenv");

const cors = require("cors");
const app = express();
app.use(cors());
dotenv.config();

db.on("error", (error) => {
  console.log(error);
});

app.use(bodyParser.urlencoded({ extended: true, useUnifiedTopology: true }));
app.use(bodyParser.json());

app.use("/user", user);
app.use("/car", car);

app.listen(process.env.PORT);