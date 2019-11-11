const isEmpty = require("./is-empty");

module.exports = function getCarSpecification(data) {
  let errors = {};

  data.VIN = !isEmpty(data.VIN) ? data.VIN : "";

  if (data.VIN.length !== 17) {
    errors.VIN = "VIN must be 17 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
