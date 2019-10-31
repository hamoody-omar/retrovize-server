const Validator = require("validator");
const isEmpty = require("./is-empty");
const passwordValidator = require("password-validator");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

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
    errors.lastName = "First name field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  // Create a schema
  const schema = new passwordValidator();

  // Add properties to it
  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(30) // Maximum length 30
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits() // Must have digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

  if (!schema.validate(data.password)) {
    errors.password =
      "Password must be between 8 and 30 characters\n" +
      "Password must have at least 1 uppercase character\n" +
      "Password must have at least 1 lowercase character\n" +
      "Password must have at least 1 digit";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!data.terms) {
    errors.terms = "You must agree to the terms and conditions to proceed";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
