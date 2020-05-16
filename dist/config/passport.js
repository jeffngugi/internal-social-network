"use strict";

var _pg = require("pg");

var dotenv = require('dotenv');

dotenv.config();

var JwtStrategy = require('passport-jwt').Strategy;

var ExtractJwt = require('passport-jwt').ExtractJwt;

var client = new _pg.Client({
  connectionString: process.env.DATABASE_URL
});
client.connect();
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
var id = 16;

module.exports = function (passport) {
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    client.query('SELECT * FROM users WHERE id=$1', [parseInt(jwt_payload.id)]).then(function (user) {
      if (user) {
        return done(null, user);
      }

      return done(null, false);
    })["catch"](function (err) {
      return console.log(err);
    });
  }));
};