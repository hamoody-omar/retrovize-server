const express = require("express");
const passport = require("passport");

const router = express.Router();

// Load input validation
const validateDrivingLicenseInput = require("../../validation/driving-license");

// Load DrivingLicense model
const DrivingLicense = require("../../models/DrivingLicense");

// @route   POST api/profile/driving-license
// @desc    Save driving license
// @access  Private
router.post(
  "/driving-license",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateDrivingLicenseInput(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).jsonp(errors);
    }

    const drivingLicense = {
      user: req.body.user.id,
      firstName: req.body.firstName,
      middleName: req.body.middleName ? req.body.middleName : "",
      lastName: req.body.lastName,
      licenseNumber: req.body.licenseNumber,
      issuingMonth: req.body.issuingMonth,
      issuingYear: req.body.issuingYear,
      issuingCountry: req.body.issuingCountry,
      issuingStateOrProvince: req.body.issuingStateOrProvince,
      birthDay: parseInt(req.body.birthDay, 10),
      birthMonth: parseInt(req.body.birthMonth, 10),
      birthYear: parseInt(req.body.birthYear, 10)
    };

    DrivingLicense.findOne({ user: req.body.user.id }).then(dL => {
      // update
      if (dL) {
        DrivingLicense.findOneAndUpdate(
          { user: req.body.user.id },
          { $set: drivingLicense },
          { new: true }
        ).then(dL => res.json(dL));
      } else {
        // save new driving license
        new DrivingLicense(drivingLicense).save().then(dL => res.json(dL));
      }
    });
  }
);

module.exports = router;
