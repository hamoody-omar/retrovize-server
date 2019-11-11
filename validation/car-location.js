const isEmpty = require("./is-empty");

module.exports = function carLocation(data) {
  let errors = {};

  if (!data.locationCity) {
    errors.locationCity = "City is required";
  }

  if (!data.locationStateOrProvince) {
    errors.locationStateOrProvince = "State / Province is required";
  }

  if (!data.locationStreetAddress) {
    errors.locationStreetAddress = "Street address is required";
  }

  if (!data.locationZipCode) {
    errors.locationZipCode = "Zip code is required";
  }

  if (!data.locationCountry) {
    errors.locationCountry = "Country is required";
  } else {
    if (data.locationCountry !== "United States") {
      errors.locationCountry = "Country is invalid";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
