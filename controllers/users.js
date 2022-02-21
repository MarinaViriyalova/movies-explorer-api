const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequest = require('../errors/BadRequest');
const Unauthorized = require('../errors/Unauthorized');
const Conflict = require('../errors/Conflict');
const User = require('../models/user');
const { JWT_SECRET, NODE_ENV } = require('../config');
const NotFound = require('../errors/NotFound');
const {
  validationError, conflictEmailError, unauthorizedError, notFoundUserError,
} = require('../constants/index');

module.exports.createUser = (req, res, next) => {
  const {
    name, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, password: hash, email,
    }))
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-key', { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest(validationError);
      } else if (err.name === 'MongoError' && err.code === 11000) {
        throw new Conflict(conflictEmailError);
      }
      next(err);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-key', { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      throw new Unauthorized(unauthorizedError);
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error('PageNotFound'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest(validationError);
      } else if (err.message === 'PageNotFound') {
        throw new NotFound(notFoundUserError);
      }
      next(err);
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('PageNotFound'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new BadRequest(validationError);
      } else if (err.message === 'PageNotFound') {
        throw new NotFound(notFoundUserError);
      } else if (err.name === 'MongoError' && err.code === 11000) {
        throw new Conflict(conflictEmailError);
      }
      next(err);
    })
    .catch(next);
};
