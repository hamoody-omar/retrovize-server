const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CarSpecificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  carID: {
    type: String,
    required: true
  },
  vin: {
    type: String,
    required: true
  },
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  odometer: {
    type: String,
    required: true
  },
  transmission: {
    type: String,
    required: true
  },
  isClean: {
    type: Boolean,
    required: true
  },
  trim_level: {
    type: String
  },
  engine: {
    type: String
  },
  style: {
    type: String
  },
  made_in: {
    type: String
  },
  steering_type: {
    type: String
  },
  anti_brake_system: {
    type: String
  },
  tank_size: {
    type: String
  },
  overall_height: {
    type: String
  },
  overall_length: {
    type: String
  },
  overall_width: {
    type: String
  },
  standard_seating: {
    type: String
  },
  optional_seating: {
    type: String
  },
  highway_mileage: {
    type: String
  },
  city_mileage: {
    type: String
  }
});

module.exports = CarSpecification = mongoose.model(
  "CarSpecification",
  CarSpecificationSchema
);
