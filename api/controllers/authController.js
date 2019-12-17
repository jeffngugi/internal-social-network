import { Client } from 'pg';
const dotenv = require('dotenv');
dotenv.config();
import Responder from '../helpers/responder';
const bcypt = require('bcryptjs');
const responder = new Responder();


const client = new Client({ connectionString: process.env.DATABASE_URL });
client.connect();


class authController {
    static async loginUser(req, res) {
        const { email, password } = req.body
        // return res.json({ email, password })
        try {
            await client.query('SELECT * FROM users WHERE email=$1', [email])
                .then(user => {
                    if (user.rows.length > 0) {
                        const pass = user.rows[0].password;
                        if (bcrypt.compareSync(password, pass)) {
                            return res.json('Password worked, return token')
                        } else {
                            responder.responseSuccess(res, 'Wrong password or email');
                        }
                        // const isTrue = bcrypt.compareSync("B4c0/\/", password);


                    } else {
                        responder.responseSuccess(res, 'No user registered with that email')
                    }
                })


        } catch (err) {
            responder.responseServerError(res, [err])
        }
    }
}

export default authController;