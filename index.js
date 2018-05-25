require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const errorHandler = require("./handlers/error");
const {loginRequired} = require("./middleware/auth");

const PORT = 8081;

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const fragranceRoutes = require("./routes/fragrance");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth",authRoutes);
app.use("/api/users",loginRequired,userRoutes);
app.use("/api/fragrances",loginRequired,fragranceRoutes);

app.use(errorHandler);
app.listen(PORT,function(){
  console.log("server started")
});