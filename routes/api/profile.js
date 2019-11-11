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

    /*const drivingLicense = {
      user: req.user.id,
      firstName: req.body.firstName,
      middleName: req.body.middleName? req.body.middleName:"",
      lastName: req.body.lastName,
      licenseNumber: req.body.licenseNumber,
      issuingMonth: req.body.issuingMonth,
      issuingYear: req.body.issuingYear,
      issuingCountry: req.body.issuingCountry,
      issuingStateOrProvince: req.body.issuingStateOrProvince,
      dateOfbirth: Date.now()
    };
    DrivingLicense.findOne({ user: req.user.id }).then(dL => {
      // update
      if (dL) {
        DrivingLicense.findOneAndUpdate(
          { user: req.user.id },
          { $set: drivingLicense },
          { new: true }
        ).then(dL => res.json(dL));
      } else {
        // save new driving license
        new Profile(drivingLicense).save().then(dL => res.json(dL));
      }
    });*/
    const drivingLicense = {
      //user: req.user.id,
      firstName: req.body.firstName,
      middleName: req.body.middleName ? req.body.middleName : "",
      lastName: req.body.lastName,
      licenseNumber: req.body.licenseNumber,
      issuingMonth: req.body.issuingMonth,
      issuingYear: req.body.issuingYear,
      issuingCountry: req.body.issuingCountry,
      issuingStateOrProvince: req.body.issuingStateOrProvince,
      birthDay: req.body.birthDay,
      birthMonth: req.body.birthMonth,
      birthYear: req.body.birthYear
    };
    console.log("driving license");
    console.log(drivingLicense);
    return res.json(drivingLicense);
  }
);

module.exports = router;
