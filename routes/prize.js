const prizeModel = require("../models/prize");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const path = require("path");
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();

var errorMsg = "Database cannot be reached, try again later";

//create prize
router.post("/create/prize", (req, res, next) => {
  var prizeEntry = {
    pizza_type: req.body.pizza_type,
    price: req.body.price,
  };

  userModel
    .create(prizeEntry)
    .then((createdPrize) => {
      res.send(createdPrize); //Envia el objeto [usuario] a Frontend
    })
    .catch((e) => {
      res.statusMessage = errorMsg;
      res.status(500).json({
        message: res.statusMessage,
      });
      return res;
    });
});

//get prize
router.get("/get/prize/all", (req, res, next) => {
  prizeModel
    .find()
    .then((allPrizes) => {
      return res.status(200).json(allPrizes);
    })
    .catch((e) => {
      res.statusMessage = errorMsg;
      res.status(500).json({
        message: res.statusMessage,
      });
      return res;
    });
});

//update prize
router.put("/update/prize/:id", (req, res, next) => {
  if (req.params.id == "") {
    return res.status(406); //parameter needed
  }

  prizeModel.findById(req.params.id).then((foundPrize) => {
    var prizeEntry = {
      pizza_type: req.body.pizza_type,
      price: req.body.price,
    };

    prizeModel
      .updateOne({ _id: foundPrize._id }, updatedPrize)
      .then((updatedPrize) => {
        res.status(200).json(updatedPrize);
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

//delete prize
router.delete("/delete/prize/:id", (req, res, next) => {
  if (req.params.id == "") {
    return res.status(406);
  }

  prizeModel
    .delete(req.params.id)
    .then((deletedPrize) => {
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
