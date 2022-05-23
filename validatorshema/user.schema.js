const Joi = require("joi");

const userValidatorSchema = {};

userValidatorSchema.createArticle = Joi.object().keys({
  name: Joi.string().required(),
  content: Joi.string().required(),
});

module.exports = userValidatorSchema;
