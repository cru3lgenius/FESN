const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = 8080;

const authRoutes = require("./routes/auth");


app.use(cors());
app.use(bodyParser.json());

app.use("/api/",authRoutes);

app.listen(PORT,function(){
  console.log("server started")
});