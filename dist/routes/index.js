"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// import userRouter from './users';
// import roleRouter from './userRoles';
var apiPrefix = '/api/v1'; // add your route to this list

var routes = [// userRouter,
  // roleRouter
];

var _default = function _default(app) {
  routes.forEach(function (route) {
    return app.use(apiPrefix, route);
  });
  return app;
};

exports["default"] = _default;