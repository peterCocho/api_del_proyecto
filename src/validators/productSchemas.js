
const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().optional().allow(''),
  price: Joi.number().positive().precision(2).required(),
});

module.exports = { productSchema };
