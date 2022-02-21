const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

module.exports.validateCreateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.email': 'Поле email должно содержать email',
        'any.required': 'Поле email должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Поле password должно быть заполнено',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля name - 2',
        'string.max': 'Максимальная длина поля name - 30',
        'any.required': 'Поле name должно быть заполнено',
      }),
  }),
});

module.exports.validateAuthenticationBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.email': 'Поле email должно содержать email',
        'any.required': 'Поле email должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Поле password должно быть заполнено',
      }),
  }),
});

module.exports.validateEditProfileBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля name - 2',
        'string.max': 'Максимальная длина поля name - 30',
        'any.required': 'Поле name должно быть заполнено',
      }),
    email: Joi.string().email()
      .messages({
        'string.email': 'Поле email должно содержать email',
        'any.required': 'Поле email должно быть заполнено',
      }),
  }),
});

module.exports.validateMovieIdParams = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});

module.exports.validateCreateMovieBody = celebrate({
  body: Joi.object().keys({
    movieId: Joi.number().required()
      .messages({
        'any.required': 'Поле movieId должно быть заполнено',
      }),
    country: Joi.string().required()
      .messages({
        'any.required': 'Поле country должно быть заполнено',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Поле director должно быть заполнено',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Поле duration должно быть заполнено',
      }),
    year: Joi.number().required().min(1900).max(2021)
      .messages({
        'number.min': 'Минимальное значение поля year - 1900',
        'number.max': 'Максимальное значение поля year - 2021',
        'any.required': 'Поле year должно быть заполнено',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Поле description должно быть заполнено',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле image должно быть валидным url-адресом');
    }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле trailer должно быть валидным url-адресом');
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле thumbnail должно быть валидным url-адресом');
    }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Поле nameRU должно быть заполнено',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Поле nameEN должно быть заполнено',
      }),
  }),
});
