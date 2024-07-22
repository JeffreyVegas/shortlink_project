const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// const path = require("path");

const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const Errorhander = require("./middleware/error");

var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

const user = require("./routes/UserRoutes");
const url = require("./routes/UrlRoutes");

app.use("/api/v1", user);
app.use("/api/v1", url);

app.use(Errorhander);

module.exports = app;
