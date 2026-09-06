const Joi = require("joi");

// For owner creating an item (PBI 1)
const createItemSchema = Joi.object({
  nickname: Joi.string().min(1).max(100).required(),
  description: Joi.string().max(500).allow("", null),
  photoUrl: Joi.string().uri().allow("", null),
  verification: Joi.object({
    enabled: Joi.boolean().required(),
    question: Joi.when("enabled", {
      is: true,
      then: Joi.string().min(1).max(200).required(),
      otherwise: Joi.string().allow("", null)
    })
  }).required()
});

// For public found report submission (PBI 2)
const foundReportSchema = Joi.object({
  finder: Joi.object({
    name: Joi.string().max(100).allow("", null),
    email: Joi.string().email().required(),
    phone: Joi.string().max(50).allow("", null)
  }).required(),
  message: Joi.string().min(1).max(2000).required(),
  foundLocationText: Joi.string().max(500).allow("", null),
  photoUrl: Joi.string().uri().allow("", null),
  verificationAnswer: Joi.string().max(200).allow("", null)
});

module.exports = {
  createItemSchema,
  foundReportSchema
};