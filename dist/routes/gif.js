"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _gifController = _interopRequireDefault(require("../controllers/gifController"));

var passport = require('passport');

var router = _express["default"].Router();

var postGif = _gifController["default"].postGif,
    getAll = _gifController["default"].getAll,
    getSingle = _gifController["default"].getSingle,
    getByUsers = _gifController["default"].getByUsers,
    deleteGif = _gifController["default"].deleteGif;
router.post('/', passport.authenticate('jwt', {
  session: false
}), postGif);
router.get('/', getAll);
router.get('/:id', getSingle);
router.get('/user/:id', getByUsers);
router["delete"]('/:id', passport.authenticate('jwt', {
  session: false
}), deleteGif);
module.exports = router;