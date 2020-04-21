const userModel = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const path = require("path");
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();
let jwt = require("jsonwebtoken");
var errorMsg = "Database cannot be reached, try again later";
const {
  JWTTOKEN,
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY,
} = require("./../config");
const stripe = require("stripe")(STRIPE_SECRET_KEY);
//create user
router.post("/create/user", jsonParser, (req, res, next) => {
  let [
    name,
    last_name,
    user_name,
    email,
    street_addr,
    zip_code,
    country,
    password,
  ] = req.body;
  if (
    name == undefined ||
    last_name == undefined ||
    user_name == undefined ||
    email == undefined ||
    street_addr == undefined ||
    zip_code == undefined ||
    country == undefined ||
    password == undefined
  ) {
    res.statusMessage = "No tiene las propiedades suficientes";
    return res.status(406).send();
  }

  var userEntry = {
    name: name,
    last_name: last_name,
    user_name: user_name,
    email: email,
    street_addr: street_addr,
    zip_code: zip_code,
    country: country,
    password: password,
    balance: 0.0,
    rank: 0,
    experience_points: 0,
    level: 0,
  };

  userModel
    .create(userEntry)
    .then((createdUser) => {
      res.statusMessage = "Usuario Añadido";
      return res.status(201).json(createdUser); //Envia el objeto [usuario] a Frontend
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
router.get("/get/users", (req, res, next) => {
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
//get user by user_name
router.get("/get/user/:user_name", (req, res, next) => {
  if (req.params.user_name == "") {
    return res.status(406); //parameter needed
  }

  userModel
    .findOne({ user_name: req.params.user_name })
    .then((foundUser) => {
      if (foundUser != undefined) {
        return res.status(200).json({ foundUser });
      }
      res.statusMessage = "No se encontró el usuario por nombre de usuario";
      return res.status(400).send();
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
router.get("/get/user/:email", (req, res, next) => {
  if (req.params.email == "") {
    return res.status(406); //parameter needed
  }
  userModel
    .findOne({ email: req.params.email })
    .then((foundUser) => {
      if (foundUser != undefined) {
        return res.status(200).json({ foundUser });
      }
      res.statusMessage = "No se encontró el usuario por email";
      return res.status(400).send();
    })
    .catch((e) => {
      res.statusMessage = errorMsg;
      res.status(500).json({
        message: res.statusMessage,
      });
      return res;
    });
});

//get user by id
router.get("/get/user/:_id", (req, res, next) => {
  if (req.params._id == "") {
    return res.status(406); //parameter needed
  }
  
  userModel
    .findOne({ _id: req.params._id })
    .then((foundUser) => {
      if (foundUser != undefined) {
        return res.status(200).json({ foundUser });
      }
      res.statusMessage = "No se encontró el usuario por id";
      return res.status(400).send();
    })
    .catch((e) => {
      res.statusMessage = errorMsg;
      res.status(500).json({
        message: res.statusMessage,
      });
      return res;
    });
});

//login
router.post("/login", jsonParser, (req, res) => {
  let { email, password } = req.body;

  if (email == undefined || password == undefined) {
    res.statusMessage = "No hay email o password";
    return res.status(406).send();
  }
  userModel
    .findOne({ email: email })
    .then((foundUser) => {
      if (foundUser != undefined) {
        let data = {
          emai: foundUser.email,
          password: foundUser.password,
          id: foundUser._id,
        };
        if (password != foundUser.password) {
          res.statusMessage = "Invalid password";
          return res.status(400).send();
        }

        let token = jwt.sign(data, JWTTOKEN, {
          expiresIn: 60 * 120,
        });
        console.log(token);
        return res.status(200).json({ token, id: foundUser._id });
      } else {
        res.statusMessage = "No se encontró el usuario por login";
        return res.status(400).send();
      }
    })
    .catch((e) => {
      res.statusMessage = errorMsg;
      res.status(500).json({
        message: res.statusMessage,
      });
      return res;
    });
});

//validate token
router.get("/validate/:token", (req, res) => {
  //let token = req.headers.authorization;
  let token = req.params.token;
  token = token.replace("Bearer ", "");

  jwt.verify(token, JWTTOKEN, (err, foundUser) => {
    if (err) {
      res.statusMessage = "Token not valid";
      return res.status(400).send();
    }
    return res.status(200).json({ message: "success", id: foundUser._id });
  });
});
//update user
router.put("/update/user/:id", (req, res, next) => {
  if (req.params.id == "") {
    return res.status(406).send(); //parameter needed
  }

  userModel.findById(req.params.id).then((foundUser) => {
    updatedUser = {
      name: req.body.name || foundUser.name,
      last_name: req.body.last_name || foundUser.last_name,
      user_name: req.body.user_name || foundUser.user_name,
      email: req.body.email || foundUser.email,
      street_addr: req.body.street_addr || foundUser.street_addr,
      zip_code: req.body.zip_code || foundUser.zip_code,
      country: req.body.country || foundUser.country,
      password: req.body.password || foundUser.password,
      rank: req.body.rank || foundUser.rank,
      experience_points:
        req.body.experience_points || foundUser.experience_points,
      level: req.body.level || foundUser.level,
    };

    userModel
      .updateOne({ _id: foundUser._id }, updatedUser)
      .then((response) => {
        res.statusMessage = "Updated User";
        res.status(200).json(response);
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
      return res.status(200).json(deletedUser);
    })
    .catch((e) => {
      res.statusMessage = errorMsg;
      return res.status(500).json({
        status: 500,
        message: res.statusMessage,
      });
    });
});
//charge user
router.post("/charge/", jsonParser, (req, res, next) => {
  let [amount, description, stripeEmail, stripeToken] = req.body;

  if (
    amount == undefined ||
    description == undefined ||
    stripeEmail == undefined ||
    stripeToken == undefined
  ) {
    res.statusMessage = "No tiene las propiedades suficientes";
    return res.status(406).send();
  }

  stripe.customers
    .create({
      email: stripeEmail,
      source: stripeToken,
    })
    .then((customer) =>
      stripe.charges.create({
        amount,
        description: description,
        currency: "usd",
        customer: customer.id,
      })
    )
    .then((charge) => {
      res.statusMessage = "Cargo Hecho";
      return res.status(201).json(charge);
    })
    .catch((e) => {
      res.statusMessage = errorMsg;
      res.status(500).json({
        message: res.statusMessage,
      });
      return res;
    });
});

module.exports = router;
