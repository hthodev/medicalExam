const { body } = require("express-validator");

const updateDataValidate = [
  body("email").optional().isEmail().withMessage("Provide valid email"),
  body("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First name is required")
    .isString()
    .withMessage("First name should be string"),
  body("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last name is required")
    .isString()
    .withMessage("Last name should be string"),
  body("address")
    .exists({ checkFalsy: true })
    .withMessage("Address is required")
    .isString()
    .withMessage("Address should be string"),
  body("phone")
    .optional()
    .isString()
    .withMessage("phone number should be string")
    .custom((value) => {
      if (value.length !== 10) {
        return Promise.reject("Phone number should be 10 digits");
      } else {
        return true;
      }
    }),
  body("gender").exists({ checkFalsy: true }).withMessage("Gender is required"),
];

module.exports = { updateDataValidate };