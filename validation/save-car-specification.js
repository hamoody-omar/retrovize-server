const isEmpty = require("./is-empty");

module.exports = function saveCarSpecification(data) {
  let errors = {};

  console.log(data);

  if (!data.specification) {
    errors.VIN = "VIN is invalid";
  }

  //const specification = data.specification.specification;

  /*  vin: "1B3BD4FB4BN507956",
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
      city_mileage: "21 miles/gallon" */

  //specification.vin = !isEmpty(specification.vin) ? specification.vin : "";
  data.odometer = !isEmpty(data.odometer) ? data.odometer : "";
  data.transmission = !isEmpty(data.transmission) ? data.transmission : "";

  /*if (specification && specification.vin.length !== 17) {
    errors.VIN = "VIN must be 17 characters";
  }*/

  if (!data.transmission) {
    errors.transmission = "Odemter is required";
  } else {
    if (data.transmission !== "Automatic" || data.transmission !== "Manual") {
      //pass
    } else {
      errors.transmission = "Transimission is invalid";
    }
  }

  if (!data.odometer) {
    errors.odometer = "Odometer is required";
  } else {
    if (
      data.odometer === "0-50K miles" ||
      data.odometer === "50K-100K miles" ||
      data.odometer === "100K-150K miles" ||
      data.odometer === "150K+ miles"
    ) {
      //pass
    } else {
      errors.odometer = "Odometer is invalid";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
