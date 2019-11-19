exports.test = (req, res) => {
    res.json({
        msg: 'User works'
    })
}

exports.add = (x, y) => {
    return x + y;
};
