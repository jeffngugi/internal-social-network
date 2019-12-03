const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/userController');

router.get('/test', UserCtrl.test)
router.post('/create', UserCtrl.create);
router.put('/update', UserCtrl.update);
router.delete('delete', UserCtrl.delete);

module.exports = router;