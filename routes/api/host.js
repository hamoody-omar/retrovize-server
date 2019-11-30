const express = require("express");
const unirest = require("unirest");
const passport = require("passport");
const router = express.Router();
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

// Load models
const CarDescriptionFeatures = require("../../models/CarDescriptionFeatrues");
const CarID = require("../../models/CarID");
const CarSpecification = require("../../models/CarSpecification");
const CarLocation = require("../../models/CarLocation");
const CarRegistration = require("../../models/CarRegistration");
const CarPriceAvailability = require("../../models/CarPriceAvailability");

// Load input validations
const validateGetCarSpecification = require("../../validation/get-car-specification");
const validateSaveCarSpecification = require("../../validation/save-car-specification");
const validateCarRegistration = require("../../validation/car-registration");
const validateCarLocation = require("../../validation/car-location");
const validateCarDesFtr = require("../../validation/car-description-features");
const validateCarPriceAvailability = require("../../validation/car-price-availability");

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

    const specification = {
      user: req.body.user.id,
      carID: req.body.ID,
      vin: req.body.specification.vin,
      year: req.body.specification.year ? req.body.specification.year : "",
      make: req.body.specification.make,
      model: req.body.specification.model,
      trim_level: req.body.specification.trim_level
        ? req.body.specification.trim_level
        : "",
      engine: req.body.specification.engine
        ? req.body.specification.engine
        : "",
      style: req.body.specification.style ? req.body.specification.style : "",
      made_in: req.body.specification.made_in
        ? req.body.specification.made_in
        : "",
      steering_type: req.body.specification.steering_type
        ? req.body.specification.steering_type
        : "",
      anti_brake_system: req.body.specification.anti_brake_system
        ? req.body.specification.anti_brake_system
        : "",
      tank_size: req.body.specification.tank_size
        ? req.body.specification.tank_size
        : "",
      overall_height: req.body.specification.overall_height
        ? req.body.specification.overall_height
        : "",
      overall_length: req.body.specification.overall_length
        ? req.body.specification.overall_length
        : "",
      overall_width: req.body.specification.overall_width
        ? req.body.specification.overall_width
        : "",
      standard_seating: req.body.specification.standard_seating
        ? req.body.specification.standard_seating
        : "",
      optional_seating: req.body.specification.optional_seating
        ? req.body.specification.optional_seating
        : "",
      highway_mileage: req.body.specification.highway_mileage
        ? req.body.specification.highway_mileage
        : "",
      city_mileage: req.body.specification.city_mileage
        ? req.body.specification.city_mileage
        : "",
      odometer: req.body.odometer,
      transmission: req.body.transmission,
      isClean: req.body.isClean
    };

    CarSpecification.findOne({
      user: req.body.user.id,
      carID: req.body.ID
    }).then(cS => {
      // update
      if (cS) {
        CarSpecification.findOneAndUpdate(
          { user: req.body.user.id },
          { $set: specification },
          { new: true }
        ).then(cS =>
          CarID.findOneAndUpdate(
            { user: req.body.user.id, carID: req.body.ID },
            { $set: { carSpecification: cS } }
          )
            .then(cI => res.jsonp(cI))
            .catch(res.status(400).jsonp({ id: "Something went wrong" }))
        );
      } else {
        new CarSpecification(specification).save().then(cS => {
          new CarID({
            user: req.body.user.id,
            carID: req.body.ID,
            carSpecification: cS
          })
            .save()
            .then(cI => res.jsonp(cI));
        });
      }
    });

    return res.jsonp(req.body);
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
      res.jsonp(uniReq.body.specification);
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
    res.jsonp(specification);
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

    const carRegistration = {
      user: req.body.user.id,
      carID: req.body.ID,
      plateNumber: req.body.plateNumber,
      plateStateOrProvince: req.body.plateStateOrProvince
    };

    CarRegistration.findOne({
      user: req.body.user.id,
      carID: req.body.ID
    }).then(cR => {
      // update
      if (cR) {
        CarRegistration.findOneAndUpdate(
          { user: req.body.user.id, carID: req.body.ID },
          { $set: carRegistration },
          { new: true }
        ).then(cR =>
          CarID.findOneAndUpdate(
            { user: req.body.user.id, carID: req.body.ID },
            { $set: { carRegistration: cR } }
          )
            .then(cI => res.jsonp(cI))
            .catch(res.status(400).jsonp({ id: "Something went wrong" }))
        );
      } else {
        new CarRegistration(carRegistration).save().then(cR =>
          CarID.findOneAndUpdate(
            { user: req.body.user.id, carID: req.body.ID },
            { $set: { carRegistration: cR } }
          )
            .then(cI => res.jsonp(cI))
            .catch(res.status(400).jsonp({ id: "Something went wrong" }))
        );
      }
    });

    return res.jsonp(req.body);
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

    const carLocation = {
      user: req.body.user.id,
      carID: req.body.ID,
      locationCity: req.body.locationCity,
      locationStateOrProvince: req.body.locationStateOrProvince,
      locationStreetAddress: req.body.locationStreetAddress,
      locationZipCode: req.body.locationZipCode,
      locationCountry: req.body.locationCountry,
      locationAptSuite: req.body.locationAptSuite
        ? req.body.locationAptSuite
        : ""
        ? req.body.locationAptSuite
        : ""
    };

    CarLocation.findOne({ user: req.body.user.id, carID: req.body.ID }).then(
      cL => {
        if (cL) {
          CarLocation.findOneAndUpdate(
            { user: req.body.user.id, carID: req.body.ID },
            { $set: carLocation },
            { new: true }
          ).then(cL =>
            CarID.findOneAndUpdate(
              { user: req.body.user.id, carID: req.body.ID },
              { $set: { carLocation: cL } }
            ).then(cI => res.jsonp(cI))
          );
        } else {
          new CarLocation(carLocation)
            .save()
            .then(cL =>
              CarID.findOneAndUpdate(
                { user: req.body.user.id, carID: req.body.ID },
                { $set: { carLocation: cL } }
              ).then(cI => res.jsonp(cI))
            );
        }
      }
    );
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
    /*if (!isValid) {
      return res.status(400).jsonp(errors);
    }*/

    const carDescriptionFeatures = {
      user: req.body.user.id,
      carID: req.body.ID,
      description: req.body.description,
      features: req.body.features
    };

    CarDescriptionFeatures.findOne({
      user: req.body.user.id,
      carID: req.body.ID
    }).then(cD => {
      if (cD) {
        CarDescriptionFeatures.findOneAndUpdate(
          { user: req.body.user.id, carID: req.body.ID },
          { $set: carDescriptionFeatures },
          { new: true }
        ).then(cD =>
          CarID.findOneAndUpdate(
            { user: req.body.user.id, carID: req.body.ID },
            { $set: { carDescriptionFeatures: cD } }
          ).then(cI => res.jsonp(cI))
        );
      } else {
        new CarDescriptionFeatures(carDescriptionFeatures)
          .save()
          .then(cD =>
            CarID.findOneAndUpdate(
              { user: req.body.user.id, carID: req.body.ID },
              { $set: { carDescriptionFeatures: cD } }
            ).then(cI => res.jsonp(cI))
          );
      }
    });
  }
);

// @route   POST api/host/car-price-availability
// @desc    Save car price and availability such GPS , Sunroof and many more
// @access  Private
router.post(
  "/car-price-availability",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCarPriceAvailability(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).jsonp(errors);
    }

    let advanceNotice;
    switch (req.body.advanceNotice) {
      case "12 hours":
        advanceNotice = 12;
        break;

      case "1 day":
        advanceNotice = 24;
        break;

      case "2 days":
        advanceNotice = 48;
        break;

      case "3 days":
        advanceNotice = 72;
        break;

      default:
        advanceNotice: 12;
    }

    let minimumTrip;
    switch (req.body.minimumTrip) {
      case "Any":
        minimumTrip = 24;
        break;

      case "1 day":
        minimumTrip = 24;
        break;

      case "2 days":
        minimumTrip = 48;
        break;

      case "3 days":
        minimumTrip = 72;
        break;

      case "4 days":
        minimumTrip = 96;
        break;

      case "5 days":
        minimumTrip = 120;
        break;

      default:
        minimumTrip: 24;
    }

    let maximumTrip;
    switch (req.body.maximumTrip) {
      case "Any":
        maximumTrip = 24;
        break;

      case "5 days":
        maximumTrip = 120;
        break;

      case "1 week":
        maximumTrip = 168;
        break;

      case "2 weeks":
        maximumTrip = 336;
        break;

      case "3 weeks":
        maximumTrip = 504;
        break;

      case "1 month":
        minimumTrip = 672;
        break;

      default:
        maximumTrip: 24;
    }

    const carPriceAvail = {
      user: req.body.user.id,
      carID: req.body.ID,
      dailyPrice: req.body.dailyPrice,
      advanceNotice: advanceNotice,
      minimumTrip: minimumTrip,
      maximumTrip: maximumTrip
    };

    CarPriceAvailability.findOne({
      user: req.body.user.id,
      carID: req.body.ID
    }).then(cPA => {
      if (cPA) {
        CarPriceAvailability.findOneAndUpdate(
          { user: req.body.user.id, carID: req.body.ID },
          { $set: carPriceAvail },
          { new: true }
        ).then(cPA =>
          CarID.findOneAndUpdate(
            { user: req.body.user.id, carID: req.body.ID },
            { $set: { carPriceAvailability: cPA } }
          ).then(cI => res.jsonp(cI))
        );
      } else {
        new CarPriceAvailability(carPriceAvail)
          .save()
          .then(cPA =>
            CarID.findOneAndUpdate(
              { user: req.body.user.id, carID: req.body.ID },
              { $set: { carPriceAvailability: cPA } }
            ).then(cI => res.jsonp(cI))
          );
      }
    });
  }
);
/*
// Mongo URI
const mongoURI = require("../../config/keys").mongoURI;

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("carPhotosUploads");
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        console.log("fillle");
        console.log(file);
        console.log();
        console.log();
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "carPhotosUploads"
        };
        resolve(fileInfo);
      });
    });
  }
});*/

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/media/carPictures");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const imageFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  //limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: imageFilter
});

// @route POST /upload
// @desc  Uploads file to DB
// @access  Private
router.post("/upload-car-photo", upload.single("imageData"), (req, res) => {
  console.log(req.body.ID);
  console.log(req.file.path);
  console.log(req.file);
  console.log(req.body.userid);

  CarID.findOne({ user: req.body.userid, carID: req.body.ID }).then(cI => {
    if (cI) {
      console.log("we have the id let us update it");
      const carPicturePaths = cI.carPicturePaths;
      carPicturePaths.push(req.file.path);
      CarID.findOneAndUpdate(
        { user: req.body.userid, carID: req.body.ID },
        { $set: { carPicturePaths: carPicturePaths } }
      )
        .then(cI => {
          console.log("successful");
          return res.jsonp(cI);
        })
        .catch(err => {
          console.log("successful");
          return res.status(400).jsonp({ picture: err });
        });
    } else {
      console.log("we have a problem");
      return res.status(400).jsonp({ ID: "car ID is not found!" });
    }
  });
});

// @route   POST api/host/publish-car
// @desc    Publish the car on Retrovize
// @access  Private
router.post(
  "/publish-car",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //const { errors, isValid } = validateCarDesFtr(req.body);

    // check validation
    /*if (!isValid) {
      return res.status(400).jsonp(errors);
    }*/

    CarID.findOne({
      user: req.body.user.id,
      carID: req.body.ID
    }).then(cI => {
      if (cI) {
        CarID.findOneAndUpdate(
          { user: req.body.user.id, carID: req.body.ID },
          { $set: { isPublished: true } },
          { new: true }
        ).then(cI => {
          console.log("car publish successful");
          return res.jsonp(cI);
        });
      } else {
        console.log("we have a problem");
        return res.status(400).jsonp({ ID: "car ID is not found!" });
      }
    });
  }
);

module.exports = router;
