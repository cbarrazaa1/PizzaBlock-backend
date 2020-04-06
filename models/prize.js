const mongoose = require("mongoose");

const PrizeSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  pizza_type: {
    //Hay que revisar como utilizar la API de dominos o cualquier otra API y ver como hacer los pedidos
    type: Number,
    required: true
  },
  price: {
    type: NumberDecimal(0.0),
    required: true
  }
});

const Prize = mongoose.model("Prize", PrizeSchema);

module.exports = Prize;