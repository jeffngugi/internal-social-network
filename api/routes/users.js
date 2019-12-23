const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/userController');

router.get('/test', UserCtrl.test)
router.post('/create', UserCtrl.create);
router.put('/update', UserCtrl.update);
router.delete('/:id', UserCtrl.delete);
router.get('/test', UserCtrl.test)
router.get('/all', UserCtrl.all);

module.exports = router;