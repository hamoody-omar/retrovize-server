const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Car picture schema
const CarPicture = new Schema({
  pictureName: {
    type: String
  },
  PicturePath: {
    type: String
  }
});

// Create Schema
const CarIDSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  carID: {
    type: String,
    required: true
  },
  carPicturePaths: {
    type: [String]
  },
  carSpecification: {
    type: Schema.Types.ObjectId,
    ref: "CarSpecification"
  },
  carRegistration: {
    type: Schema.Types.ObjectId,
    ref: "CarRegistration"
  },
  carLocation: {
    type: Schema.Types.ObjectId,
    ref: "CarLocation"
  },
  carDescriptionFeatures: {
    type: Schema.Types.ObjectId,
    ref: "CarDescriptionFeatures"
  },
  carPriceAvailability: {
    type: Schema.Types.ObjectId,
    ref: "CarPriceAvailability"
  },
  isPublished: {
    type: Boolean,
    default: false
  }
});

module.exports = CarID = mongoose.model("CarID", CarIDSchema);
