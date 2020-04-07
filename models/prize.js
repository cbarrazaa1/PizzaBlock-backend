const mongoose = require("mongoose");

const PrizeSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  pizza_type: {
    //Hay que revisar como utilizar la API de dominos o cualquier otra API y ver como hacer los pedidos
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Prize = mongoose.model("Prize", PrizeSchema);

module.exports = Prize;
