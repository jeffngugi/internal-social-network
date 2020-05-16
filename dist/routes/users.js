"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

var router = _express["default"].Router();

router.get('/test', _userController["default"].test);
router.post('/create', _userController["default"].create);
router.put('/update', _userController["default"].update);
router["delete"]('/:id', _userController["default"]["delete"]);
router.get('/test', _userController["default"].test);
router.get('/all', _userController["default"].all);
module.exports = router;