const randomString = require('randomstring');

exports.test = (req, res) => {
    res.json({
        msg: 'User works'
    })
}

exports.create = (req, res) => {
    const { name, email } = req.body;
    const password = randomString.generate(8);

    // return req.body;
    res.json({
        msg: 'Createa user',
        name,
        email,
        password

    })
}

exports.update = (req, res) => {
    res.json({
        msg: 'Update a user'
    })
}


exports.delete = (req, res) => {
    res.json({
        msg: 'delete a user'
    })
}



exports.add = (x, y) => {
    return x + y;
};
