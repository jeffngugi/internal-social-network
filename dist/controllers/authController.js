"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _pg = require("pg");

var _responder = _interopRequireDefault(require("../helpers/responder"));

var dotenv = require('dotenv');

var jwt = require('jsonwebtoken');

dotenv.config();

var bcrypt = require('bcryptjs');

var responder = new _responder["default"]();
var client = new _pg.Client({
  connectionString: process.env.DATABASE_URL
});
client.connect();

var authController =
/*#__PURE__*/
function () {
  function authController() {
    (0, _classCallCheck2["default"])(this, authController);
  }

  (0, _createClass2["default"])(authController, null, [{
    key: "loginUser",
    value: function loginUser(req, res) {
      var _req$body, email, password;

      return _regenerator["default"].async(function loginUser$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, email = _req$body.email, password = _req$body.password;
              _context.prev = 1;
              _context.next = 4;
              return _regenerator["default"].awrap(client.query('SELECT * FROM users WHERE email=$1', [email]).then(function (user) {
                if (user.rows.length > 0) {
                  var pass = user.rows[0].password;

                  if (bcrypt.compareSync(password, pass)) {
                    var secret = process.env.JWT_SECRET;
                    var payload = {
                      id: user.rows[0].id,
                      name: user.rows[0].first_name,
                      lastName: user.rows[0].last_name
                    };
                    jwt.sign(payload, secret, {
                      expiresIn: 3600
                    }, function (err, token) {
                      responder.responseSuccess(res, '', {
                        token: 'Bearer ' + token
                      });
                    }); // responder.responseSuccess(res, { payload });
                  } else {
                    responder.responseError(res, 'Wrong password/email');
                  }
                } else {
                  responder.responseError(res, 'No user registered with that email');
                }
              }));

            case 4:
              _context.next = 9;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](1);
              responder.responseServerError(res, [_context.t0]);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 6]]);
    }
  }, {
    key: "currentUser",
    value: function currentUser(req, res) {
      var _req$user$rows$, id, email, first_name, last_name, data;

      return _regenerator["default"].async(function currentUser$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$user$rows$ = req.user.rows[0], id = _req$user$rows$.id, email = _req$user$rows$.email, first_name = _req$user$rows$.first_name, last_name = _req$user$rows$.last_name;
              data = {
                id: id,
                email: email,
                fullNames: first_name + ' ' + last_name
              };
              responder.responseSuccess(res, 'Logged in user', data);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }]);
  return authController;
}();

var _default = authController;
exports["default"] = _default;