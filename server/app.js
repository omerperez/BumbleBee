const express = require("express");
const db = require("./db/index");
const bodyParser = require("body-parser");
const user = require("./Routes/userRoutes");
const dotenv = require("dotenv");

const cors = require("cors");
const app = express();
app.use(cors());
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true, useUnifiedTopology: true }));
app.use(bodyParser.json());

db.on("error", (error) => {
  console.log(error);
});


app.use("/", user);
app.use(express.static('front'));
app.get('s3Url', (req, res) => {
    
})
app.listen(process.env.PORT);
