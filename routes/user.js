const userModel = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const path = require("path");
const JWTTOKEN = require("./config");
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();
let jwt = require("jsonwebtoken");
var errorMsg = "Database cannot be reached, try again later";

//create user
router.post("/create/user", (req, res, next) => {
  var userEntry = {
    name: req.body.name,
    last_name: req.body.last_name,
    user_name: req.body.user_name,
    email: req.body.email,
    street_addr: req.body.street_addr,
    zip_code: req.body.zip_code,
    country: req.body.country,
    password: req.body.password,
    balance: 0.0,
  };

  userModel
    .create(userEntry)
    .then((createdUser) => {
      res.send(createdUser); //Envia el objeto [usuario] a Frontend
    })
    .catch((e) => {
      res.statusMessage = errorMsg;
      res.status(500).json({
        message: res.statusMessage,
      });
      return res;
    });
});

//get user by user_name
router.post("/get/user/:user_name", (req, res, next) => {
  if (req.params.user_name == "") {
    return res.status(406); //parameter needed
  }

  userModel
    .find({ user_name: req.params.user_name })
    .then((foundUser) => {
      return res.status(200).json(foundUser);
    })
    .catch((e) => {
      res.statusMessage = errorMsg;
      res.status(500).json({
        message: res.statusMessage,
      });
      return res;
    });
});

//get user by email
router.post("/get/user/:email", (req, res, next) => {
  if (req.params.email == "") {
    return res.status(406); //parameter needed
  }

  userModel
    .find({ email: req.params.email })
    .then((foundUser) => {
      return res.status(200).json(foundUser);
    })
    .catch((e) => {
      res.statusMessage = errorMsg;
      res.status(500).json({
        message: res.statusMessage,
      });
      return res;
    });
});

/* //login
router.post("/login"),jsonParser, (req, res, next) => {
  let { email, password } = req.body;

  if (email == undefined || password == undefined) {
    res.statusMessage = "No hay email o password";
    return res.status(406).send();
  }
  userModel
    .find({ email: email })
    .then((foundUser) => {
      if (foundUser != undefined) {
        let data = {
          emai: foundUser.email,
          password: foundUser.password,
          id: foundUser._id
        };
        if (password != foundUser.password) {
          res.statusMessage = "Invalid password";
          return res.status(400).send();
        }

        let token = jwt.sign(data, JWTTOKEN, {
          expiresIn: 60 * 120
        });
        console.log(token);
        return res.status(200).json({ token, id: foundUser._id });
      }
      res.statusMessage = "No se encontró el usuario";
      return res.status(400).send();
    })
    .catch((e) => {
      res.statusMessage = errorMsg;
      res.status(500).json({
        message: res.statusMessage,
      });
      return res;
    });
}
//validate token
app.get("/validate/:token", (req, res) => {
  //let token = req.headers.authorization;
  let token = req.params.token;
  token = token.replace("Bearer ", "");

  jwt.verify(token, JWTTOKEN, (err, foundUser) => {
    if (err) {
      res.statusMessage = "Token not valid";
      return res.status(400).send();
    }
    return res.status(200).json({ message: "Success", id: foundUser._id });
  });
}); */

//get all users
router.get("/get/user/all", (req, res, next) => {
  userModel
    .find()
    .then((allUsers) => {
      return res.status(200).json(allUsers);
    })
    .catch((e) => {
      res.statusMessage = errorMsg;
      res.status(500).json({
        message: res.statusMessage,
      });
      return res;
    });
});
//update user
router.put("/update/user/:id", (req, res, next) => {
  if (req.params.id == "") {
    return res.status(406); //parameter needed
  }

  userModel.findById(req.params.id).then((foundUser) => {
    updatedUser = {
      name: req.body.name,
      last_name: req.body.last_name,
      user_name: req.body.user_name,
      email: req.body.email,
      street_addr: req.body.street_addr,
      zip_code: req.body.zip_code,
      country: req.body.country,
      password: req.body.password,
    };

    userModel
      .updateOne({ _id: foundUser._id }, updatedUSer)
      .then((updatedUser) => {
        res.status(200).json(updatedUser);
      })
      .catch((e) => {
        res.statusMessage = errorMsg;
        res.status(500).json({
          message: statusMessage,
        });

        return res;
      });
  });
});

//delete user
router.delete("/delete/user/:id", (req, res, next) => {
  if (req.params.id == "") {
    return res.status(406);
  }

  userModel
    .delete(req.params.id)
    .then((deletedUser) => {
      return res.status(200);
    })
    .catch((e) => {
      res.statusMessage = errorMsg;
      return res.status(500).json({
        status: 500,
        message: res.statusMessage,
      });
    });
});

module.exports = router;
