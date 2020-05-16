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

var dotenv = require("dotenv");

dotenv.config();

var cloudinary = require("cloudinary").v2;

var responder = new _responder["default"]();
var client = new _pg.Client({
  connectionString: process.env.DATABASE_URL
});
client.connect();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

var gifController =
/*#__PURE__*/
function () {
  function gifController() {
    (0, _classCallCheck2["default"])(this, gifController);
  }

  (0, _createClass2["default"])(gifController, null, [{
    key: "postGif",
    value: function postGif(req, res) {
      var id, title, uniqueFilename, file;
      return _regenerator["default"].async(function postGif$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = req.user.rows[0].id;
              title = req.body.title; // return res.json(title);

              uniqueFilename = new Date().toISOString();

              if (!req.files) {
                responder.responseNotFound(res, "No selected image");
              }

              file = req.files.image;
              _context.next = 7;
              return _regenerator["default"].awrap(cloudinary.uploader.upload(file.tempFilePath).then(function (image) {
                client.query("INSERT INTO gifs(created_on, gif_url, author_id, public_id, title)VALUES($1,$2,$3,$4, $5)", [uniqueFilename, image.url, id, image.public_id, title]).then(responder.responseCreated(res, "Gif succesfully uploaded"));
              })["catch"](function (err) {
                return responder.responseServerError(res, err);
              }));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "getAll",
    value: function getAll(req, res) {
      return _regenerator["default"].async(function getAll$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _regenerator["default"].awrap(client.query("SELECT * FROM gifs").then(function (gifs) {
                if (gifs.rows.length > 0) responder.responseSuccess(res, "".concat(gifs.rows.length, " gifs found"), gifs.rows);else responder.responseSuccess(res, "No gifs was found", gifs.rows);
              }));

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "getSingle",
    value: function getSingle(req, res) {
      return _regenerator["default"].async(function getSingle$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", res.json({
                single: "Select single by id"
              }));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }, {
    key: "getByUsers",
    value: function getByUsers(req, res) {
      return _regenerator["default"].async(function getByUsers$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", res.json({
                msg: "Get all gifs from certain user"
              }));

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }, {
    key: "deleteGif",
    value: function deleteGif(req, res) {
      var id, gif, _gif$rows$, author_id, public_id;

      return _regenerator["default"].async(function deleteGif$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = req.user.rows[0].id;
              _context5.prev = 1;
              _context5.next = 4;
              return _regenerator["default"].awrap(client.query("SELECT * FROM gifs WHERE gif_id=$1", [parseInt(req.params.id)]));

            case 4:
              gif = _context5.sent;

              if (gif.rows.length < 1) {
                responder.responseNotFound(res, "No gif with that id");
              }

              _gif$rows$ = gif.rows[0], author_id = _gif$rows$.author_id, public_id = _gif$rows$.public_id;
              if (author_id !== id) responder.responseUnauthorized(res);
              _context5.next = 10;
              return _regenerator["default"].awrap(cloudinary.uploader.destroy(public_id).then(function (result) {
                if (result.result === "not found") return res.json("Not found in database");else {
                  client.query("DELETE FROM gifs WHERE gif_id=$1", [parseInt(req.params.id)]).then(function (del) {
                    return responder.responseDeleted(res);
                  })["catch"](function (err) {
                    return responder.responseServerError(res, err);
                  });
                }
              })["catch"](function (err) {
                return console.log({
                  err: err
                });
              }));

            case 10:
              _context5.next = 15;
              break;

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](1);
              responder.responseServerError(res, _context5.t0);

            case 15:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[1, 12]]);
    }
  }]);
  return gifController;
}();

var _default = gifController;
exports["default"] = _default;