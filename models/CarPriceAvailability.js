const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CarPriceAvailabilitySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  carID: {
    type: String,
    required: true
  },
  dailyPrice: {
    type: Number,
    required: true
  },
  // hour
  advanceNotice: {
    type: Number,
    required: true
  },
  // hour
  minimumTrip: {
    type: Number,
    required: true
  },
  // hour
  maximumTrip: {
    type: Number,
    required: true
  }
});

module.exports = CarPriceAvailability = mongoose.model(
  "CarPriceAvailability",
  CarPriceAvailabilitySchema
);
