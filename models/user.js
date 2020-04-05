const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    unique: true,
  },
  street_addr: {
    type: String,
  },
  zip_code: {
    type: Number,
  },
  country: {
    //Tengo dudas en cuanto a como almacenaremos el valor de country
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {}, //Tengo dudas en como handlear este pex
  balance: {
    type: NumberDecimal(0.0),
  },
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }], //Participaciones | es una manera de poder representar una relacion M TO N
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
