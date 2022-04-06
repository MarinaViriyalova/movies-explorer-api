const router = require('express').Router();
const { getCurrentUser, updateProfile } = require('../controllers/users');
const { validateEditProfileBody } = require('../validators');

router.get('/me', getCurrentUser);
router.patch('/me', validateEditProfileBody, updateProfile);

module.exports = router;
