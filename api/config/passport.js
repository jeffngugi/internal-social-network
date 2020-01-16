const dotenv = require('dotenv');
import { Client } from 'pg';
dotenv.config();
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const client = new Client({ connectionString: process.env.DATABASE_URL });
client.connect();


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
const id = 16;

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            client.query('SELECT * FROM users WHERE id=$1', [parseInt(jwt_payload.id)])
                .then((user) => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch((err) => console.log(err));
        })
    );
};