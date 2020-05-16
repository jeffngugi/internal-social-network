"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _articleController = _interopRequireDefault(require("../controllers/articleController"));

var _commentController = _interopRequireDefault(require("../controllers/commentController"));

var router = _express["default"].Router();

var passport = require('passport');

var create = _articleController["default"].create,
    getArticles = _articleController["default"].getArticles,
    editArticle = _articleController["default"].editArticle,
    getSingle = _articleController["default"].getSingle,
    deleteArtlce = _articleController["default"].deleteArtlce;
var comment = _commentController["default"].comment;
router.post('/', passport.authenticate('jwt', {
  session: false
}), create);
router.get('/', getArticles);
router.patch('/:id', passport.authenticate('jwt', {
  session: false
}), editArticle);
router.get('/:id', getSingle);
router["delete"]('/:id', passport.authenticate('jwt', {
  session: false
}), deleteArtlce);
router.post('/:id/comment', passport.authenticate('jwt', {
  session: false
}), comment);
module.exports = router;