import express from 'express';
import gifController from '../controllers/gifController';
const passport = require('passport');
const router = express.Router();

const { postGif, getAll, getSingle, getByUsers, deleteGif } = gifController;

router.post('/', passport.authenticate('jwt', { session: false }), postGif);
router.get('/', getAll);
router.get('/:id', getSingle);
router.get('/user/:id', getByUsers);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteGif);


module.exports = router;