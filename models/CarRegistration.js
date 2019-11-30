const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CarRegistrationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  carID: {
    type: String,
    required: true
  },
  plateNumber: {
    type: String,
    required: true
  },
  plateStateOrProvince: {
    type: String,
    required: true
  }
});

module.exports = CarRegistration = mongoose.model(
  "CarRegistration",
  CarRegistrationSchema
);
