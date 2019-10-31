const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema for user
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  terms: {
    type: Boolean,
    required: true
  },
  inactivity: {
    type: Boolean,
    default: true
  },
  mktUpdtEmails: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("User", UserSchema);
