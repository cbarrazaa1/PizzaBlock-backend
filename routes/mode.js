const modeModel = require("../models/mode");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const path = require("path");
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();

var errorMsg = "Database cannot be reached, try again later";

//create mode
router.post("/create/mode", jsonParser, (req, res, next) => {
  let [name, description] = req.body;
  if (name == undefined || description == undefined) {
    res.statusMessage = "No tiene las propiedades suficientes";
    return res.status(406).send();
  }
  var modeEntry = {
    name: req.body.name,
    description: req.body.description,
  };

  modeModel
    .create(modeEntry)
    .then((createdMode) => {
      res.statusMessage = "Mode Añadido";
      return res.status(201).json(createdMode);
    })
    .catch((e) => {
      res.statusMessage = errorMsg;
      res.status(500).json({
        message: res.statusMessage,
      });
      return res;
    });
});

//get modes
router.get("/get/mode/all", (req, res, next) => {
  modeModel
    .find()
    .then((allModes) => {
      return res.status(200).json(allModes);
    })
    .catch((e) => {
      res.statusMessage = errorMsg;
      res.status(500).json({
        message: res.statusMessage,
      });
      return res;
    });
});

//update mode
router.put("/update/mode/:id", (req, res, next) => {
  if (req.params.id == "") {
    return res.status(406); //parameter needed
  }

  modeModel.findById(req.params.id).then((foundMode) => {
    var modeEntry = {
      name: req.body.name,
      description: req.body.description,
    };

    modeModel
      .updateOne({ _id: foundMode._id }, modeEntry)
      .then((updatedMode) => {
        res.statusMessage = "Updated Mode";
        res.status(200).json(updatedMode);
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

//delete mode
router.delete("/delete/mode/:id", (req, res, next) => {
  if (req.params.id == "") {
    return res.status(406);
  }

  modeModel
    .delete(req.params.id)
    .then((deletedMode) => {
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
