const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  let checkData = data;
  delete checkData["image"];
  const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().min(6).required().email(),
    mobile: Joi.string().min(9).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().min(6).required(),
    role: Joi.string().required(),
  });
  return schema.validate(checkData);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
};