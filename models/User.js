const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

//mongoose user collection
const User = mongoose.model("user", userSchema);

module.exports = User;