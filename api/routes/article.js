import express from 'express';
import articleController from '../controllers/articleController';
import commentController from '../controllers/commentController';
const router = express.Router();
const passport = require('passport');

const { create, getArticles, editArticle, getSingle, deleteArtlce } = articleController;
const { comment } = commentController;
router.post('/', passport.authenticate('jwt', { session: false }), create);
router.get('/', getArticles);
router.patch('/:id', passport.authenticate('jwt', { session: false }), editArticle);
router.get('/:id', getSingle);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteArtlce);
router.post('/:id/comment', passport.authenticate('jwt', { session: false }), comment)

module.exports = router;