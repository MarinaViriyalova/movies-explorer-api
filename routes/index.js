const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateCreateUserBody, validateAuthenticationBody } = require('../validators');
const NotFound = require('../errors/NotFound');
const { notFoundError } = require('../constants/index');

router.post('/signup', validateCreateUserBody, createUser);
router.post('/signin', validateAuthenticationBody, login);
router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.all('/*', () => {
  throw new NotFound(notFoundError);
});

module.exports = router;
