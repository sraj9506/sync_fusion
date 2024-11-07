const express = require('express');
const { generateQR } = require('../controllers/qrController');
const fetchuser = require('../middlewares/fetchUser');
const { syncUser } = require('../middlewares/syncUser');
const router = express.Router();

router.get('/generateQR',fetchuser ,syncUser,generateQR);


module.exports = router;