import express from 'express';
import authController from '../controllers/authController';
const router = express.Router();

const { loginUser, currentUser } = authController;
const passport = require('passport');

router.post('/signin', loginUser);
router.get('/current', passport.authenticate('jwt', { session: false }), currentUser);

module.exports = router;