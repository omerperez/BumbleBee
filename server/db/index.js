const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const url = process.env.DB_CONNECTION;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => console.log("connection error"));

const db = mongoose.connection;
module.exports = db;
