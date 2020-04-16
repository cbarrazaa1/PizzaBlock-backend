const mongoose = require("mongoose");

const BalanceSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  balance: {
    //Hay que revisar como utilizar la API de dominos o cualquier otra API y ver como hacer los pedidos
    type: Number,
    required: true,
  },
});

const Balance = mongoose.model("Balance", BalanceSchema);

module.exports = Balance;
