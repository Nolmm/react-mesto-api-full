const { Joi, Segments } = require('celebrate');
// const url = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gm;


const authCheck = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};

const signupCheck = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2),
    avatar: Joi.string().uri()
  }),
}

const tokenCheck = {
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().regex(/^Bearer /),
  }).unknown(true),
};

const createCardCheck = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().uri().required(),
  }),
};

const deleteCardCheck = {
  [Segments.PARAMS]: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).required(),
  }),
};

const getUserCheck = {
  [Segments.PARAMS]: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).required(),
  }),
};

module.exports = {
  authCheck,
  tokenCheck,
  createCardCheck,
  deleteCardCheck,
  getUserCheck,
  signupCheck
}