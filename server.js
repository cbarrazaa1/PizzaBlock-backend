const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");
let jwt = require("jsonwebtoken");
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  if (req.method === "OPTIONS") {
    return res.send(204);
  }
  next();
});

let user = require("./routes/user");
let game = require("./routes/game");
let prize = require("./routes/prize");
let mode = require("./routes/mode");

app.use(express.static("public"));
app.use(morgan("dev"));

const {
  DATABASE_URL,
  PORT,
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY,
  JWTTOKEN,
} = require("./config");

mongoose.set("useNewUrlParser", true);
mongoose.connect("mongodb://localhost/backend-pizzablock", {
  useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(user);
app.use(game);
app.use(prize);
app.use(mode);

let server;

function runServer(port, DATABASE_URL) {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, (response) => {
      if (response) {
        return reject(response);
      } else {
        server = app
          .listen(port, () => {
            console.log("App is running on port " + port);
            resolve();
          })
          .on("error", (err) => {
            mongoose.disconnect();
            return reject(err);
          });
      }
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing the server");
      server.close((err) => {
        if (err) {
          return reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}

runServer(PORT, DATABASE_URL).catch((err) => {
  console.log(err);
});

module.exports = { app, runServer, closeServer };
