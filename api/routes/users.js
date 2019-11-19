const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/userController');

router.get('/test', UserCtrl.test)


module.exports = router;