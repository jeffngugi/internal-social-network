import express from 'express';
import articleController from '../controllers/articleController';
const router = express.Router();
const passport = require('passport');

const { create, getArticles, editArticle, getSingle } = articleController;
router.post('/', passport.authenticate('jwt', { session: false }), create);
router.get('/', getArticles);
router.patch('/:id', passport.authenticate('jwt', { session: false }), editArticle);
router.get('/:id', getSingle);

module.exports = router;