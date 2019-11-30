const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateDrivingLicense(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.licenseNumber = !isEmpty(data.licenseNumber) ? data.licenseNumber : "";
  data.issuingMonth = !isEmpty(data.issuingMonth) ? data.issuingMonth : "";
  data.issuingYear = !isEmpty(data.issuingYear) ? data.issuingYear : "";
  data.issuingCountry = !isEmpty(data.issuingCountry)
    ? data.issuingCountry
    : "";
  data.issuingStateOrProvince = !isEmpty(data.issuingStateOrProvince)
    ? data.issuingStateOrProvince
    : "";

  data.birthDay = !isEmpty(data.birthDay) ? data.birthDay : false;
  data.birthMonth = !isEmpty(data.birthMonth) ? data.birthMonth : false;
  data.birthYear = !isEmpty(data.birthYear) ? data.birthYear : false;

  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.firstName = "First name must be between 2 and 30 characters";
  }

  if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = "Last name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First name field is required";
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last name field is required";
  }

  if (data.licenseNumber) {
    const parsed = parseInt(data.licenseNumber, 10);
    if (isNaN(parsed)) {
      errors.licenseNumber = "License number is invalid";
    }
  }

  if (Validator.isEmpty(data.licenseNumber)) {
    errors.licenseNumber = "License number is required";
  }

  if (Validator.isEmpty(data.issuingMonth)) {
    errors.issuingMonth = "Issuing month field is required";
  }

  if (Validator.isEmpty(data.issuingYear)) {
    errors.issuingYear = "Issuing year field is required";
  }

  if (Validator.isEmpty(data.issuingCountry)) {
    errors.issuingCountry = "Issuing country field is required";
  }

  if (Validator.isEmpty(data.issuingStateOrProvince)) {
    errors.issuingStateOrProvince =
      "Issuing state / province field is required";
  }

  if (data.birthDay) {
    const parsed = parseInt(data.birthDay, 10);
    if (isNaN(parsed)) {
      errors.birthDay = "birth day is invalid";
    }
  } else {
    errors.birthDay = "birth day is required";
  }

  if (data.birthMonth) {
    const parsed = parseInt(data.birthMonth, 10);
    if (isNaN(parsed)) {
      errors.birthMonth = "birth month is invalid";
    }
  } else {
    errors.birthMonth = "birth month is required";
  }

  if (data.birthYear) {
    const parsed = parseInt(data.birthYear, 10);
    if (isNaN(parsed)) {
      errors.birthYear = "birth year is invalid";
    }
  } else {
    errors.birthYear = "birth year is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
