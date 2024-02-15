const express = require("express");
const passwordReset = require('../controllers/passwordReset');

const router = express.Router();

router.post('/password', passwordReset); 

module.exports = router;