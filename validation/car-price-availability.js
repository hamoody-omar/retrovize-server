const isEmpty = require("./is-empty");

module.exports = function carPriceAvailability(data) {
  let errors = {};

  if (!data.dailyPrice) {
    errors.dailyPrice = "Daily price is required";
  } else {
    const parsed = parseInt(data.dailyPrice, 10);
    if (isNaN(parsed)) {
      errors.dailyPrice = "License number is invalid";
    } else {
      if (parsed === 0) {
        errors.dailyPrice = "License number is invalid";
      } else if (parsed % 1 !== 0) {
        errors.dailyPrice = "License number is invalid";
      }
    }
  }

  if (!data.advanceNotice) {
    errors.advanceNotice = "Advance notice is required";
  } else {
    if (
      data.advanceNotice === "12 hours" ||
      data.advanceNotice === "1 day" ||
      data.advanceNotice === "2 days" ||
      data.advanceNotice === "3 days"
    ) {
      //pass
    } else {
      errors.advanceNotice = "Odometer is invalid";
    }
  }

  if (!data.minimumTrip) {
    errors.minimumTrip = "Minimum trip is required";
  } else {
    if (
      data.minimumTrip === "Any" ||
      data.minimumTrip === "1 day" ||
      data.minimumTrip === "2 days" ||
      data.minimumTrip === "3 days" ||
      data.minimumTrip === "4 days" ||
      data.minimumTrip === "5 days"
    ) {
      //pass
    } else {
      errors.minimumTrip = "Minimum trip is invalid";
    }
  }

  if (!data.maximumTrip) {
    errors.maximumTrip = "Maximum trip is required";
  } else {
    if (
      data.maximumTrip === "Any" ||
      data.maximumTrip === "5 days" ||
      data.maximumTrip === "1 week" ||
      data.maximumTrip === "2 weeks" ||
      data.maximumTrip === "3 weeks" ||
      data.maximumTrip === "1 month"
    ) {
      //pass
    } else {
      errors.maximumTrip = "Maximum trip is invalid";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
