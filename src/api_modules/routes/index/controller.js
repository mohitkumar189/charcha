'use strict'
const Service = require('./service');
const logger = require('../../../helpers/logger')
const apiResponse = require('../../../helpers/apiResponse');
const constants = require('../../../common/constants');

module.exports = {
    /*
       /---------------------------ROOT LEVEL-----------------
       */
    getAll: async (req, res, next) => {
        let parent_id;
        if (req.query.pid) {
            parent_id = req.query.pid;
        } else {
            parent_id = 0;
        }
        try {
            const result = await new Service().getAll(parent_id);
            return apiResponse.sendJson(req, res, 200, constants.DATA_FETCHED, result);
        } catch (error) {
            return next(new Error(constants.FETCHING_ERROR + " " + error.message));
        }
    },
    save: async (req, res, next) => {
        const body = req.body;
        let data = body.data;
        let objectToSave = {};
        objectToSave['user_agent'] = JSON.stringify(req.useragent);
        objectToSave['ip_address'] = req.clientIp;

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                objectToSave[key] = data[key];
            }
        }
        try {
            const result = await new Service().save(objectToSave);
            return apiResponse.sendJson(req, res, 201, constants.DATA_SAVED, result);
        } catch (error) {
            return next(new Error(constants.SAVING_ERROR + " " + error.message));
        }
    },
    updateAll: async (req, res, next) => {

    },
    patchUpdateAll: async (req, res, next) => {

    },
    deleteAll: async (req, res, next) => {

    },

    /*
    /---------------------------ID LEVEL-----------------
    */
    getById: async (req, res, next) => {
        try {
            const result = await new Service().getById(req.params.id);
            return apiResponse.sendJson(req, res, 201, constants.DATA_FETCHED, result);
        } catch (error) {
            return next(new Error(constants.FETCHING_ERROR + " " + error.message));
        }
    },
    saveAtId: async (req, res, next) => {

    },
    updateAtId: async (req, res, next) => {
        const body = req.body;
        let data = body.data;
        let objectToSave = {};
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                objectToSave[key] = data[key];
            }
        }
        try {
            const result = await new Service().updateAtId(req.params.id, objectToSave);
            return apiResponse.sendJson(req, res, 201, constants.DATA_UPDATED);
        } catch (error) {
            return next(new Error(constants.UPDATING_ERROR + " " + error.message));
        }
    },
    patchUpdateAtId: async (req, res, next) => {

    },
    deleteAtId: async (req, res, next) => {

    }
}