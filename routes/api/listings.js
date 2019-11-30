const express = require("express");
const passport = require("passport");

const router = express.Router();

// Load models
const CarID = require("../../models/CarID");

// @route   GET api/listings
// @desc    Get all cars associated with the logged in user
// @access  Private
router.post(
  "/car-listings",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("user");
    console.log(req.body.user);
    CarID.find({ user: req.body.user.id, isPublished: true })
      .then(cIDs => {
        if (cIDs) {
          console.log("car ids");
          console.log(cIDs);
          return res.jsonp(cIDs);
        } else {
          console.log("No published car");
          return res.jsonp({});
        }
      })
      .catch(err => res.status(400).jsonp({ error: err }));
  }
);

module.exports = router;
