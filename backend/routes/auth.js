const express = require('express');
const { register, login , otpGen , matchOtp} = require('../controllers/authController');
const fetchuser = require('../middlewares/fetchUser');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/genOTP', fetchuser,otpGen);
router.get('/matchOTP', fetchuser,matchOtp);

module.exports = router;
