const mongoose = require("mongoose");

const ModeSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Mode = mongoose.model("Mode", ModeSchema);

module.exports = Mode;
