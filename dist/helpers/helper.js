"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var Helper = {
  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail: function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
};
var _default = Helper;
exports["default"] = _default;