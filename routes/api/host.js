const express = require("express");
const unirest = require("unirest");
const passport = require("passport");

const router = express.Router();

// Load input validations
const validateGetCarSpecification = require("../../validation/get-car-specification");
const validateSaveCarSpecification = require("../../validation/save-car-specification");
const validateCarRegistration = require("../../validation/car-registration");
const validateCarLocation = require("../../validation/car-location");
const validateCarDesFtr = require("../../validation/car-description-features");

// Load DrivingLicense model
//const CarSpecification = require("../../models/CarSpecification");

// @route   POST api/host/car-specification
// @desc    Save car specification such as vin, year, make, and model
// @access  Private
router.post(
  "/car-specification",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSaveCarSpecification(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).jsonp(errors);
    }

    /*const drivingLicense = {
      user: req.user.id,
      firstName: req.body.firstName,
      middleName: req.body.middleName,
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

    return res.json(req.body);
  }
);

// @route   POST api/host/get-car-specification
/* @desc    get car specification such year, make, and model by providing the VIN
            This api uses rapidapi vin decoder to get the specification of a VIN*/
// @access  Private
router.post(
  "/get-car-specification",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateGetCarSpecification(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).jsonp(errors);
    }

    /*const uniReq = unirest(
      "GET",
      "https://vindecoder.p.rapidapi.com/decode_vin"
    );

    uniReq.query({
      vin: req.body.VIN
    });

    uniReq.headers({
      "x-rapidapi-host": "vindecoder.p.rapidapi.com",
      "x-rapidapi-key": "ac6591af4cmsh611fa77bcdfd5d0p191724jsnfc4a05813b5e"
    });

    uniReq.end(function(uniReq) {
      if (uniReq.error) {
        errors = { VIN: "There was some error." };
        return res.status(400).jsonp({ errors });
      }
      console.log("specification");
      console.log(uniReq.body.specification);
      res.json(uniReq.body.specification);
    });*/

    const specification = {
      vin: "1B3BD4FB4BN507956",
      year: "2011",
      make: "Dodge",
      model: "Avenger",
      trim_level: "Express",
      engine: "2.4L L4 DOHC 16V",
      style: "Sedan (4-Door)",
      made_in: "United States",
      steering_type: "R&P",
      anti_brake_system: "4-Wheel ABS",
      tank_size: null,
      overall_height: "58.40 inches",
      overall_length: "192.60 inches",
      overall_width: "72.80 inches",
      standard_seating: "5",
      optional_seating: null,
      highway_mileage: "30 miles/gallon",
      city_mileage: "21 miles/gallon"
    };
    res.json(specification);
  }
);

// @route   POST api/host/car-registration
// @desc    Save car registration such plate number and state or province
// @access  Private
router.post(
  "/car-registration",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCarRegistration(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).jsonp(errors);
    }

    return res.json(req.body);
  }
);

// @route   POST api/host/car-location
// @desc    Save car location such streed address city , country and state or province
// @access  Private
router.post(
  "/car-location",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCarLocation(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).jsonp(errors);
    }

    return res.json(req.body);
  }
);

// @route   POST api/host/car-description-features
// @desc    Save car description and features such GPS , Sunroof and many more
// @access  Private
router.post(
  "/car-description-features",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCarDesFtr(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).jsonp(errors);
    }

    return res.json(req.body);
  }
);

module.exports = router;
