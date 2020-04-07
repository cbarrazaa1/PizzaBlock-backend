const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  mode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mode",
  },
  money_pool: {
    type: Number,
    required: true,
  },
  prize: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "prize",
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], //Participaciones | es una manera de poder representar una relacion M TO N
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
