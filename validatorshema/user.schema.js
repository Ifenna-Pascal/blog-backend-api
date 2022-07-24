const Joi = require("joi");

const userValidatorSchema = {};

userValidatorSchema.createArticle = Joi.object().keys({
  name: Joi.string().required(),
  content: Joi.string().required(),
});

userValidatorSchema.askQuestion = Joi.object().keys({
  question: Joi.string().required(),
})

userValidatorSchema.likeArticle = Joi.object().keys({
  id: Joi.string().required(),
});

module.exports = userValidatorSchema;
