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

var _dotenv = _interopRequireDefault(require("dotenv"));

var _responder = _interopRequireDefault(require("../helpers/responder"));

_dotenv["default"].config();

var responder = new _responder["default"]();
var client = new _pg.Client({
  connectionString: process.env.DATABASE_URL
});
client.connect();

var articleController =
/*#__PURE__*/
function () {
  function articleController() {
    (0, _classCallCheck2["default"])(this, articleController);
  }

  (0, _createClass2["default"])(articleController, null, [{
    key: "create",
    value: function create(req, res) {
      var _req$user$rows$, id, first_name, last_name, userName, _req$body, title, article, date;

      return _regenerator["default"].async(function create$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$user$rows$ = req.user.rows[0], id = _req$user$rows$.id, first_name = _req$user$rows$.first_name, last_name = _req$user$rows$.last_name;
              userName = first_name + ' ' + last_name;
              _req$body = req.body, title = _req$body.title, article = _req$body.article;
              date = new Date().toISOString();
              _context.next = 7;
              return _regenerator["default"].awrap(client.query('INSERT INTO articles(created_on, title,author_id, author_name,article)VALUES($1,$2,$3,$4,$5)', [date, title, id, userName, article]).then(function (article) {
                return responder.responseSuccess(res, 'article successfully created', article.rows);
              })["catch"](function (err) {
                return responder.responseNotFound(res, err);
              }));

            case 7:
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              responder.responseServerError(res, _context.t0);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 9]]);
    }
  }, {
    key: "getArticles",
    value: function getArticles(req, res) {
      return _regenerator["default"].async(function getArticles$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _regenerator["default"].awrap(client.query('SELECT * FROM articles ORDER BY article_id DESC').then(function (articles) {
                return responder.responseSuccess(res, "".concat(articles.rows.length, " articles on the feed"), articles.rows);
              })["catch"](function (err) {
                return responder.responseServerError(res, err);
              }));

            case 3:
              _context2.next = 8;
              break;

            case 5:
              _context2.prev = 5;
              _context2.t0 = _context2["catch"](0);
              responder.responseServerError(_context2.t0);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 5]]);
    }
  }, {
    key: "editArticle",
    value: function editArticle(req, res) {
      var userId, articleId, _req$body2, title, article, articles, author_id, update;

      return _regenerator["default"].async(function editArticle$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              userId = req.user.rows[0].id;
              articleId = parseInt(req.params.id);
              _req$body2 = req.body, title = _req$body2.title, article = _req$body2.article;
              _context3.next = 6;
              return _regenerator["default"].awrap(singleArticle(articleId));

            case 6:
              articles = _context3.sent;
              if (articles.rows.length < 1) responder.responseNotFound(res, 'Article not found');
              author_id = articles.rows[0].author_id;
              if (author_id !== userId) responder.responseUnauthorized(res);
              _context3.next = 12;
              return _regenerator["default"].awrap(client.query('UPDATE articles SET title=$1, article=$2 WHERE article_id=$3', [title, article, articleId]));

            case 12:
              update = _context3.sent;

              if (!update) {
                _context3.next = 16;
                break;
              }

              _context3.next = 16;
              return _regenerator["default"].awrap(singleArticle(articleId).then(function (article) {
                return responder.responseSuccess(res, 'Article succesfully updated', article.rows[0]);
              }));

            case 16:
              _context3.next = 21;
              break;

            case 18:
              _context3.prev = 18;
              _context3.t0 = _context3["catch"](0);
              responder.responseServerError(res, {
                err: _context3.t0
              });

            case 21:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 18]]);
    }
  }, {
    key: "getSingle",
    value: function getSingle(req, res) {
      var articleId, article, data, comments;
      return _regenerator["default"].async(function getSingle$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              articleId = parseInt(req.params.id);
              _context4.next = 4;
              return _regenerator["default"].awrap(singleArticle(articleId));

            case 4:
              article = _context4.sent;
              if (article.rows.length < 1) responder.responseNotFound(res, 'Sorry, Article not found');
              data = article.rows[0];
              delete data.author_id;
              _context4.next = 10;
              return _regenerator["default"].awrap(client.query('SELECT * FROM comments WHERE article_id=$1', [articleId]));

            case 10:
              comments = _context4.sent;
              // const newcomments = comments.map(cmnt => {
              //     comment_id = cmnt.comment_id,
              //         author_id = cmnt.author_id,
              //         comment = cmnt.comment
              // })
              data.comments = comments.rows;
              responder.responseSuccess(res, 'Article found', data);
              _context4.next = 18;
              break;

            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](0);

              (function (err) {
                return responder.responseServerError(res, err);
              });

            case 18:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[0, 15]]);
    }
  }, {
    key: "deleteArtlce",
    value: function deleteArtlce(req, res) {
      var userId, articleId, article, author_id;
      return _regenerator["default"].async(function deleteArtlce$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              userId = req.user.rows[0].id;
              articleId = parseInt(req.params.id);
              _context5.next = 5;
              return _regenerator["default"].awrap(singleArticle(articleId));

            case 5:
              article = _context5.sent;
              if (article.rows.length < 1) responder.responseNotFound(res, 'Sorry, Article not found');
              author_id = article.rows[0].author_id;
              if (userId !== author_id) responder.responseUnauthorized(res);
              _context5.next = 11;
              return _regenerator["default"].awrap(client.query('DELETE from articles where article_id=$1', [articleId]).then(function (del) {
                if (del) responder.responseDeleted(res);
              })["catch"](function (err) {
                return responder.responseNotFound(res, 'Something went wrong');
              }));

            case 11:
              return _context5.abrupt("return", res.json({
                userId: userId,
                articleId: articleId,
                author_id: author_id
              }));

            case 14:
              _context5.prev = 14;
              _context5.t0 = _context5["catch"](0);
              responder.responseServerError(res, _context5.t0);

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[0, 14]]);
    }
  }]);
  return articleController;
}();

var singleArticle = function singleArticle(articleId) {
  var articles = client.query('SELECT * FROM articles WHERE article_id=$1', [articleId]);
  return articles;
};

var _default = articleController;
exports["default"] = _default;