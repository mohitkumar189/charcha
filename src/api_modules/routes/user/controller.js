'use strict'
const Service = require('./service');
const LoginService = require('../user_logins/service');
const logger = require('../../../helpers/logger')
const apiResponse = require('../../../helpers/apiResponse');
const constants = require('../../../common/constants');
const async = require('async');
const service = new Service();
const loginService = new LoginService();

module.exports = {
    login: async (req, res, next) => {
        const body = req.body;
        let data = body.data;
        async.waterfall([
            (callback) => {
                service.getByPhone(data.phone)
                    .then((users) => {
                        callback(null, users)
                    })
                    .catch((error) => {
                        callback(error);
                    });
            },
            (users, callback) => {
                if (users.length > 0) {
                    //login
                    let userId = users[0]['id'];
                    callback(null, userId)
                } else {
                    //register
                    service.save(data)
                        .then((userId => {
                            callback(null, userId)
                        }))
                        .catch((error => {
                            callback(error);
                        }));
                }
            },
            (userId, callback) => {
                const OTP = '1234';
                let loginData = {
                    "user_id": userId,
                    "session_id": 'dffgdfg',
                    "otp": OTP
                }
                loginService.save(loginData)
                    .then((result) => {
                        if (result.insertId > 0) {
                            callback(null, {
                                "session_id": loginData.session_id
                            });
                        } else {
                            callback(new Error(constants.SAVING_ERROR));
                        }
                    })
                    .catch((error) => {
                        callback(error);
                    })
            }
        ], (error, result) => {
            if (error) {
                return apiResponse.sendJson(req, res, 400, error.message);
            } else {
                return apiResponse.sendJson(req, res, 200, constants.OTP_SENT, result);
            }
        })
    },
    getMe: async (req, res, next) => {
        try {
            const result = await new Service().getAll();
            return apiResponse.sendJson(req, res, 200, constants.DATA_FETCHED, result);
        } catch (error) {
            return next(new Error(constants.FETCHING_ERROR + " " + error.message));
        }
    },
    verifyOtp: async (req, res, next) => {
        const body = req.body;
        let data = body.data;
        async.waterfall([
            (callback) => {
                loginService.getBySessionId(data.session_id)
                    .then((result) => {
                        if (result.length > 0) {
                            if (result[0]['session_status' == 0]) {
                                callback(null, result[0]);
                            } else {
                                logger.info("---" + JSON.stringify(result[0]))
                                logger.info(result[0]['session_status'])
                                callback(new Error(constants.USED_SESSION));
                            }
                        } else {
                            callback(new Error(constants.NO_SESSION_FOUND));
                        }
                    })
                    .catch((error) => {
                        callback(error);
                    });
            }, (sessionData, callback) => {
                if (sessionData.otp == data.otp) {
                    //otp matched
                    callback(null, sessionData['id']);
                } else {
                    // incorrect otp
                    callback(new Error(constants.INVALID_OTP));
                }
            },
            (sessionId, callback) => {
                let updateData = {
                    "otp": "567",
                    "session_status": 1,
                    "login_status": 1,
                    "fill_type": 1
                }
                loginService.updateAtId(sessionId, updateData)
                    .then((result) => {
                        if (result.affectedRows > 0) {
                            callback(null)
                        } else {
                            callback(new Error(constants.UPDATING_ERROR));
                        }
                    })
                    .catch((error) => {
                        callback(error);
                    });
            }
        ], (error, result) => {
            if (error) {
                return apiResponse.sendJson(req, res, 400, error.message);
            } else {
                //generate token for user here
                return apiResponse.sendJson(req, res, 200, constants.OTP_VERIFIED, result);
            }
        })
    }
}