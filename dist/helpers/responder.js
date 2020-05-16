"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Responder =
/*#__PURE__*/
function () {
  function Responder() {
    (0, _classCallCheck2["default"])(this, Responder);
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  (0, _createClass2["default"])(Responder, [{
    key: "responseSuccess",
    value: function responseSuccess(res) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Success';
      var data = arguments.length > 2 ? arguments[2] : undefined;
      return res.status(200).json({
        status: 'Success',
        message: message,
        data: data
      });
    }
  }, {
    key: "responseUpdated",
    value: function responseUpdated(res) {
      var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Succesfully updated';
      var data = arguments.length > 2 ? arguments[2] : undefined;
      return res.status(201).json({
        status: 'Success',
        message: message,
        data: data
      });
    }
  }, {
    key: "responseCreated",
    value: function responseCreated(res, message, data) {
      return res.status(201).json({
        status: 'Success',
        message: message,
        data: data
      });
    }
  }, {
    key: "responseError",
    value: function responseError(res, message, data) {
      return res.status(200).json({
        status: 'Error',
        message: message,
        data: data
      });
    }
  }, {
    key: "responseDeleted",
    value: function responseDeleted(res) {
      return res.status(200).json({
        status: 'Success',
        message: 'Succesfully deleted'
      });
    }
  }, {
    key: "responseUnauthorized",
    value: function responseUnauthorized(res) {
      return res.status(401).json({
        status: 'Error',
        message: 'Unauthoirized'
      });
    }
  }, {
    key: "responseNotFound",
    value: function responseNotFound(res) {
      var errors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return res.status(404).json({
        status: 'Error',
        message: 'Not found',
        errors: errors
      });
    }
  }, {
    key: "resourceNotFound",
    value: function resourceNotFound(res, message) {
      return res.status(204).json({
        status: 'Success',
        message: message
      });
    }
  }, {
    key: "responseServerError",
    value: function responseServerError(res) {
      var errors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return res.status(500).json({
        status: 'Error',
        message: 'Internal Server Errors',
        errors: errors
      });
    }
  }]);
  return Responder;
}();

exports["default"] = Responder;