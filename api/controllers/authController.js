import { Client } from 'pg';
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
dotenv.config();
import Responder from '../helpers/responder';
const bcrypt = require('bcryptjs');
const responder = new Responder();


const client = new Client({ connectionString: process.env.DATABASE_URL });
client.connect();


class authController {
    static async loginUser(req, res) {
        const { email, password } = req.body
        try {
            await client.query('SELECT * FROM users WHERE email=$1', [email])
                .then(user => {
                    if (user.rows.length > 0) {
                        const pass = user.rows[0].password;
                        if (bcrypt.compareSync(password, pass)) {
                            const secret = process.env.JWT_SECRET
                            const payload = {
                                id: user.rows[0].id,
                                name: user.rows[0].first_name,
                                lastName: user.rows[0].last_name
                            }

                            jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
                                responder.responseSuccess(res, '', { token: 'Bearer ' + token })
                            })

                            // responder.responseSuccess(res, { payload });
                        } else {
                            responder.responseError(res, 'Wrong password/email');
                        }


                    } else {
                        responder.responseError(res, 'No user registered with that email')
                    }
                })


        } catch (err) {
            responder.responseServerError(res, [err])
        }
    }

    static async currentUser(req, res) {
        const { id, email, first_name, last_name } = req.user.rows[0];
        const data = {
            id,
            email,
            fullNames: first_name + ' ' + last_name
        }
        responder.responseSuccess(res, 'Logged in user', data)


    }
}

export default authController;