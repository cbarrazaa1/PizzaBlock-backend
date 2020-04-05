const userModel = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.router();
const path = require("path");
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();

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
