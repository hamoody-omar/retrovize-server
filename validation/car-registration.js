const isEmpty = require("./is-empty");

module.exports = function validateCarRegistration(data) {
  let errors = {};

  if (!data.plateNumber) {
    errors.plateNumber = "Plate number is required";
  }

  if (!data.plateStateOrProvince) {
    errors.plateStateOrProvince = "Plate State / Province is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
