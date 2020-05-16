"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _responder = _interopRequireDefault(require("../helpers/responder"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var randomString = require('randomstring');

var _require = require('../config/index'),
    Client = _require.Client;

var bcrypt = require('bcryptjs');

var responder = new _responder["default"]();
Client.connect();

exports.test = function (req, res) {
  var jeff = {
    'name': 'Jeff ngugi',
    age: 23
  }; // responder.responseUpdated(res, 'Successfully tested')

  responder.responseSuccess(res, 'Email already taken');
};
/**
 * 
 */


exports.create = function _callee(req, res) {
  var userDetails, password, salt, newpassword, is_admin, pair, userEmail, user, _userDetails, first_name, last_name, email, gender, job_role, department, address, _is_admin, _password;

  return _regenerator["default"].async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userDetails = req.body;
          password = 'password';
          _context.next = 4;
          return _regenerator["default"].awrap(bcrypt.genSalt(10));

        case 4:
          salt = _context.sent;
          _context.next = 7;
          return _regenerator["default"].awrap(bcrypt.hash(password, salt));

        case 7:
          newpassword = _context.sent;
          // return res.json({ newpassword })
          is_admin = false;
          pair = {
            is_admin: is_admin,
            password: password
          };
          userDetails = _objectSpread({}, userDetails, {}, pair);
          userEmail = userDetails.email;
          _context.next = 14;
          return _regenerator["default"].awrap(Client.query('SELECT * FROM users WHERE email=$1', [userEmail]));

        case 14:
          user = _context.sent;

          if (user.rows.length > 0) {
            responder.responseError(res, 'Email already taken');
          } else {
            _userDetails = userDetails, first_name = _userDetails.first_name, last_name = _userDetails.last_name, email = _userDetails.email, gender = _userDetails.gender, job_role = _userDetails.job_role, department = _userDetails.department, address = _userDetails.address, _is_admin = _userDetails.is_admin, _password = _userDetails.password;
            Client.query('INSERT INTO users(first_name, last_name, email, gender, job_role, department, address, is_admin, password)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)', [first_name, last_name, email, gender, job_role, department, address, _is_admin, newpassword]).then(responder.responseSuccess(res, 'User successfully created'));
          }

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.all = function _callee2(req, res) {
  return _regenerator["default"].async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _regenerator["default"].awrap(Client.query('SELECT * FROM users').then(function (users) {
            if (users.rows.length > 0) responder.responseSuccess(res, "".concat(users.rows.length, " users found"), users.rows);else responder.responseSuccess(res, 'No user was found', users.rows);
          }));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.update = function _callee3(req, res) {
  var userDetails, userEmail, user, update;
  return _regenerator["default"].async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          userDetails = req.body;
          userEmail = userDetails.email;
          _context3.next = 4;
          return _regenerator["default"].awrap(Client.query('SELECT * FROM users WHERE email=$1', [userEmail]));

        case 4:
          user = _context3.sent;

          if (!(user.rows.length > 0)) {
            _context3.next = 11;
            break;
          }

          _context3.next = 8;
          return _regenerator["default"].awrap(Client.query(''));

        case 8:
          update = _context3.sent;
          _context3.next = 12;
          break;

        case 11:
          responder.responseNotFound(res, ['User not found', 'dkdk']);

        case 12:
          res.json({
            msg: userDetails
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // #330*0000#


exports["delete"] = function _callee4(req, res) {
  var user;
  return _regenerator["default"].async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _regenerator["default"].awrap(Client.query('SELECT * FROM users WHERE id=$1', [parseInt(req.params.id)]));

        case 3:
          user = _context4.sent;

          if (!(user.rows.length > 0)) {
            _context4.next = 9;
            break;
          }

          _context4.next = 7;
          return _regenerator["default"].awrap(Client.query('DELETE FROM users WHERE id=$1', [parseInt(req.params.id)]).then(responder.responseDeleted(res, 'User succesfully deleted'))["catch"](responder.responseServerError(res)));

        case 7:
          _context4.next = 10;
          break;

        case 9:
          responder.responseSuccess(res, 'User not found');

        case 10:
          _context4.next = 15;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](0);
          responder.responseServerError(res, _context4.t0);

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.add = function (x, y) {
  return x + y;
};