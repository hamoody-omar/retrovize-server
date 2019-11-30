const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CarDescriptionFeaturesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  carID: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  features: {
    type: [String]
  }
});

module.exports = CarDescriptionFeatures = mongoose.model(
  "CarDescriptionFeatures",
  CarDescriptionFeaturesSchema
);
