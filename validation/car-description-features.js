const isEmpty = require("./is-empty");

module.exports = function carDesFtr(data) {
  let errors = {};

  if (!data.description) {
    errors.description = "Description is required";
  }

  if (data.features) {
    const features = data.features;
    for (let i = 0; i < features.length; i++) {
      const feature = features[i];
      if (
        feature == "GPS" ||
        feature == "Bluetooth" ||
        feature == "USBInput" ||
        feature == "audioInput" ||
        feature == "EVHybrid" ||
        feature == "allWheelDrive" ||
        feature == "convertible" ||
        feature == "sunRoof"
      ) {
        //pass
      } else {
        errors.features = "Feature is invalid";
        break;
      }
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
