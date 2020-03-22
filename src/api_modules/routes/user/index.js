const express = require('express');
const router = express.Router();
const Controller = require('./controller');

router.route('/login')
    .all((req, res, next) => {
        next();
    })
    .post(Controller.login);

router.route('/verifyOtp')
    .all((req, res, next) => {
        next();
    })
    .post(Controller.verifyOtp);

router.route('/me')
    .all((req, res, next) => {
        next();
    })
    .post(Controller.getMe);

module.exports = router;