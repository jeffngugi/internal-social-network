const randomString = require('randomstring');
const { Client } = require('../config/index');
import Responder from '../helpers/responder';
const responder = new Responder();
Client.connect();

exports.test = (req, res) => {
    const jeff = { 'name': 'Jeff ngugi', age: 23 }
    // responder.responseUpdated(res, 'Successfully tested')
    responder.responseSuccess(res, 'Email already taken');
}
/**
 * 
 */
exports.create = async (req, res) => {
    var userDetails = req.body;
    const password = 'password';
    const is_admin = false;
    var pair = { is_admin, password };
    var userDetails = { ...userDetails, ...pair };
    const userEmail = userDetails.email;

    const user = await Client.query('SELECT * FROM users WHERE email=$1', [userEmail]);
    if (user.rows.length > 0) {
        responder.responseSuccess(res, 'Email already taken')
    } else {
        const {
            first_name, last_name, email, gender, job_role, department, address, is_admin, password
        } = userDetails

        Client.query('INSERT INTO users(first_name, last_name, email, gender, job_role, department, address, is_admin, password)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)',
            [first_name, last_name, email, gender, job_role, department, address, is_admin, password])
            .then(responder.responseSuccess(res, 'User successfully created'))

    }



}

exports.all = async (req, res) => {
    await Client.query('SELECT * FROM users')
        .then(users => {
            if (users.rows.length > 0) responder.responseSuccess(res, `${users.rows.length} users found`, users.rows)
            else responder.responseSuccess(res, 'No user was found', users.rows)
        })
    // .catch(responder.responseNotFound(res, ['No user found in the system']));
}

exports.update = async (req, res) => {
    const userDetails = req.body;
    const userEmail = userDetails.email;
    const user = await Client.query('SELECT * FROM users WHERE email=$1', [userEmail]);

    if (user.rows.length > 0) {
        const update = await Client.query('')
    } else {
        responder.responseNotFound(res, ['User not found', 'dkdk']);
    }

    res.json({
        msg: userDetails
    })
}
// #330*0000#

exports.delete = async (req, res) => {
    // return res.json({ id: req.params.id })
    try {
        const user = await Client.query('SELECT * FROM users WHERE id=$1', [parseInt(req.params.id)])
        if (user.rows.length > 0) {
            await Client.query('DELETE FROM users WHERE id=$1', [parseInt(req.params.id)])
                .then(responder.responseDeleted(res, 'User succesfully deleted'))
                .catch(responder.responseServerError(res))
        } else {
            responder.responseSuccess(res, 'User not found');
        }
    } catch (err) {
        responder.responseServerError(res, err)
    }
}



exports.add = (x, y) => {
    return x + y;
};
