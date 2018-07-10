'use strict'

const Service = require('./service');
const apiResponse = require('../../helpers/apiResponse')
const Model = require('./model');
const logger = require('../../helpers/logger');
const common = require('../../helpers/common');
const constants = require('../../helpers/constants');

module.exports = {

    loginUser: async (req, res, next) => {
        let objectToSave = {}
        const body = req.body;
        if (body.phone) {
            objectToSave['phone'] = body.phone;
        } else {
            return apiResponse.sendJson(req, res, 400, constants.error.EMPTY_PHONE);
        }
        try {
            let data = await Service.save(objectToSave);
            apiResponse.sendJson(req, res, 201, null, data);
        } catch (err) {
            next(err);
        }
    },
    validateOtp: async (req, res, next) => {
        let objectToSave = {}
        const body = req.body;

        for (const key in body) {
            if (body.hasOwnProperty(key)) {
                objectToSave[key] = body[key];
            }
        }

        try {
            let data = await Service.save(objectToSave);
            apiResponse.sendJson(req, res, 201, null, data);
        } catch (err) {
            next(err);
        }
    }
}