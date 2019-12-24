import express from 'express';
import authController from '../controllers/authController';
const router = express.Router();

const { loginUser } = authController;

router.post('/login', loginUser);
router.get('login', (req, res) => {
    res.json({ message: 'Login user' });
})
module.exports = router;