const Joi = require("joi");

const adminValidatorSchema = {};

adminValidatorSchema.updateArticle = Joi.object().keys({
  id: Joi.string().required(),
});

module.exports = adminValidatorSchema;
