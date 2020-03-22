var express = require('express');
var router = express.Router();

//router.use('/', require('./routes/index/index'));
router.use('/user-auth', require('./routes/user_auth'));

module.exports = router;
