const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
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
    type: String,
    required: true,
    unique: true,
  },
  street_addr: {
    type: String,
  },
  zip_code: {
    type: Number,
  },
  state: {
    type: String,
  },
  country: {
    //Tengo dudas en cuanto a como almacenaremos el valor de country
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  // profilePictureUrl: {
  //   type: String,
  // required: true,
  // },
  balance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Balance",
  },
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }], //Participaciones | es una manera de poder representar una relacion M TO N
  rank: {
    type: Number,
  },
  experience_points: {
    type: Number,
  },
  level: {
    type: Number,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
