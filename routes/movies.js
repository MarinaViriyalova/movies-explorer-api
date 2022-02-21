const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateCreateMovieBody, validateMovieIdParams } = require('../validators');

router.get('/', getMovies);
router.post('/', validateCreateMovieBody, createMovie);
router.delete('/:movieId', validateMovieIdParams, deleteMovie);

module.exports = router;
