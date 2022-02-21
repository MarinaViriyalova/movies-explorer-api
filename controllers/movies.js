const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const {
  validationError, notFoundMovieError, forbiddenError,
} = require('../constants/index');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send({ data: movies }))
    .catch((err) => next(err))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    owner,
    movieId,
  })
    .then((movie) => res.status(200).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest(validationError);
      }
      next(err);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new Error('PageNotFound'))
    .then((movie) => {
      if (String(movie.owner) === req.user._id) {
        Movie.findByIdAndRemove(movie.id)
          .then((deleteMovie) => {
            res.status(200).send({ data: deleteMovie });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        throw new Forbidden(forbiddenError);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest(validationError);
      } else if (err.message === 'PageNotFound') {
        throw new NotFound(notFoundMovieError);
      }
      next(err);
    })
    .catch(next);
};
