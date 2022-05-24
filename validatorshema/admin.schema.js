const Joi = require("joi");

const adminValidatorSchema = {};

adminValidatorSchema.approveArticle = Joi.object().keys({
  id: Joi.string().required(),
});

module.exports = adminValidatorSchema;
