const express = require('express');
const { uploadController} = require('../controllers/uploadController');
const fetchuser = require('../middlewares/fetchUser');
const uploadMiddleware = require('../middlewares/multerConfig');
const router = express.Router();

router.post('/uploadFile', fetchuser, uploadMiddleware,uploadController);

module.exports = router;