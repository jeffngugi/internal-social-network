import express from 'express';
const router = express.Router();
import UserCtrl from '../controllers/userController';

router.get('/test', UserCtrl.test)
router.post('/create', UserCtrl.create);
router.put('/update', UserCtrl.update);
router.delete('/:id', UserCtrl.delete);
router.get('/test', UserCtrl.test)
router.get('/all', UserCtrl.all);

module.exports = router;