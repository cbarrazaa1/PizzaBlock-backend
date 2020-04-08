const gameModel = require("../models/game");
const userModel = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const path = require("path");
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();

var errorMsg = "Database cannot be reached, try again later";

//create game
router.post("/create/game", jsonParser, (req, res, next) => {
  var gameEntry = {
    mode: req.body.mode_id,
    money_pool: req.body.money_pool,
    prize: req.body.prize_id,
  };

  gameModel
    .create(userEntry)
    .then((createdGame) => {
      return res.status(200).json(createdGame); //Envia el objeto [usuario] a Frontend
    })
    .catch((e) => {
      res.statusMessage = errorMsg;
      res.status(500).json({
        message: res.statusMessage,
      });
      return res;
    });
});

//get game by id
router.post("/get/game/:id", jsonParser, (req, res, next) => {
  if (req.params.id == "") {
    return res.status(406); //parameter needed
  }

  gameModel
    .find({ _id: req.params.id })
    .then((foundGame) => {
      return res.status(200).json(foundGame);
    })
    .catch((e) => {
      res.statusMessage = errorMsg;
      res.status(500).json({
        message: res.statusMessage,
      });
      return res;
    });
});

//get all games
router.get("/get/game/all", (req, res, next) => {
  gameModel
    .find()
    .then((allGames) => {
      return res.status(200).json(allGames);
    })
    .catch((e) => {
      res.statusMessage = errorMsg;
      res.status(500).json({
        message: res.statusMessage,
      });
      return res;
    });
});

//update game users attribute
router.post("/charge");
//update game money_pool attribute

//update game winner attribute

module.exports = router;
