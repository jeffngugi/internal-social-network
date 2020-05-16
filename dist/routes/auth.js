"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _authController = _interopRequireDefault(require("../controllers/authController"));

var router = _express["default"].Router();

var loginUser = _authController["default"].loginUser,
    currentUser = _authController["default"].currentUser;

var passport = require('passport');

router.post('/signin', loginUser);
router.get('/current', passport.authenticate('jwt', {
  session: false
}), currentUser);
module.exports = router;