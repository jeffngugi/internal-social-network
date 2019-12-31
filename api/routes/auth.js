import express from 'express';
import authController from '../controllers/authController';
const router = express.Router();

const { loginUser, currentUser } = authController;
const passport = require('passport');

router.post('/login', loginUser);
router.get('/current', passport.authenticate('jwt', { session: false }), currentUser);
router.get('login', (req, res) => {
    res.json({ message: 'Login user' });
})
module.exports = router;