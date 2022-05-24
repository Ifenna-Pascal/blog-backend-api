const Joi = require("joi");

const authValidatorSchema = {};

authValidatorSchema.signUp = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role: Joi.string(),
  email: Joi.string()
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$")),
  password: Joi.string().required(),
});

authValidatorSchema.login = Joi.object().keys({
  email: Joi.string()
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$")),
  password: Joi.string().required(),
});

module.exports = authValidatorSchema;
