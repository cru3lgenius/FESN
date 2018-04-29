require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const errorHandler = require("./handlers/error");

const PORT = 8080;

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth",authRoutes);
app.use("/api/users/:id",userRoutes);

app.use(errorHandler);
app.listen(PORT,function(){
  console.log("server started")
});