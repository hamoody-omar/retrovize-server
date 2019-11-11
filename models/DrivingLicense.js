const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DrivingLicenseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  firstName: {
    type: String
  },
  middleName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  licenseNumber: {
    type: String,
    required: true
  },
  issuingMonth: {
    type: String,
    required: true
  },
  issuingYear: {
    type: String,
    required: true
  },
  issuingCountry: {
    type: String,
    required: true
  },
  issuingStateOrProvince: {
    type: String,
    required: true
  },
  dateOfbirth: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = DrivingLicense = mongoose.model(
  "DrivingLicense",
  DrivingLicenseSchema
);
