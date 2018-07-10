const express = require('express');
const router = express.Router();
const Controller = require('./controller');

router
    .route('/login')
    .all((req, res, next) => {
        next()
    })
    .post(Controller.loginUser);

router
    .route('/validateOtp')
    .all((req, res, next) => {
        next()
    })
    .post(Controller.validateOtp)


module.exports = router;