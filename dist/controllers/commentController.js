"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _responder = _interopRequireDefault(require("../helpers/responder"));

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var responder = new _responder["default"]();
var client = new _pg.Client({
  connectionString: process.env.DATABASE_URL
});
client.connect();

var commentController =
/*#__PURE__*/
function () {
  function commentController() {
    (0, _classCallCheck2["default"])(this, commentController);
  }

  (0, _createClass2["default"])(commentController, null, [{
    key: "comment",
    value: function comment(req, res) {
      var articleId, id, comment, article, comments, data;
      return _regenerator["default"].async(function comment$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              articleId = parseInt(req.params.id);
              id = req.user.rows[0].id;
              comment = req.body.comment;
              _context.next = 6;
              return _regenerator["default"].awrap(client.query('SELECT * FROM articles WHERE article_id=$1', [articleId]));

            case 6:
              article = _context.sent;
              if (article.rows.length < 1) responder.responseNotFound(res, 'Article not found');
              _context.next = 10;
              return _regenerator["default"].awrap(client.query('INSERT INTO comments(article_id, author_id, comment) VALUES($1,$2,$3) returning *', [articleId, id, comment]));

            case 10:
              comments = _context.sent;

              if (comments) {
                data = {};
                data.articleTitle = article.rows[0].title;
                data.article = article.rows[0].article;
                data.comment = comments.rows[0].comment;
                responder.responseCreated(res, 'Successfully comment', data);
              } // return res.json({ articleId, id, comment });


              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](0);

              (function (err) {
                return responder.responseServerError(res, err);
              });

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 14]]);
    }
  }]);
  return commentController;
}();

var _default = commentController;
exports["default"] = _default;