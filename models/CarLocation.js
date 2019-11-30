const mongose = require("mongoose");
const Schema = mongose.Schema;

// Create Schema
const CarLocationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  carID: {
    type: String,
    required: true
  },
  locationCity: {
    type: String,
    required: true
  },
  locationStateOrProvince: {
    type: String,
    required: true
  },
  locationStreetAddress: {
    type: String,
    required: true
  },
  locationZipCode: {
    type: String,
    required: true
  },
  locationCountry: {
    type: String,
    required: true
  },
  locationAptSuite: {
    type: String
  }
});

module.exports = CarLocation = mongose.model("CarLocation", CarLocationSchema);
