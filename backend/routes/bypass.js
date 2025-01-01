const express = require('express');
const { bypassVerification } = require('../automation/bypassVerification');
const router = express.Router();
router.get('/verification', bypassVerification);
module.exports = router;