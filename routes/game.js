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
  let [mode_id, money_pool, prize] = req.body;
  if (
    mode_id == undefined ||
    money_pool == undefined ||
    prize_id == undefined
  ) {
    res.statusMessage = "No tiene las propiedades suficientes";
    return res.status(406).send();
  }

  var gameEntry = {
    mode: mode_id,
    money_pool: money_pool,
    prize: prize_id,
  };

  gameModel
    .create(gameEntry)
    .then((createdGame) => {
      res.statusMessage = "Juego Añadido";
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
router.get("/get/game/:id", jsonParser, (req, res, next) => {
  if (req.params.id == "") {
    return res.status(406); //parameter needed
  }

  gameModel
    .findById(req.params.id)
    .then((foundGame) => {
      if (foundGame != undefined) {
        return res.status(200).json({ foundGame });
      }
      res.statusMessage = "No se encontró el juego";
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

//update game money_pool attribute

//update game winner attribute

module.exports = router;
