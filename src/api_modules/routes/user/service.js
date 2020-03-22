'use strict'

const db = require('../../../configs/db');
const _ = require("underscore");
const common = require('../../../helpers/common')
const logger = require("../../../helpers/logger");
const QueryExecuter = require("../../../helpers/queryExecuter");
const TABLE_NAME = "users";
const UPDATE_VER = ", __v =__v +1";

module.exports = class Service {

    constructor() {}

    getAll() {
        const query = `SELECT * FROM ${TABLE_NAME}`;
        return new Promise((resolve, reject) => {
            new QueryExecuter(db).executeQuery(query)
                .then(result => resolve(result))
                .catch(error => reject(error))
        });
    }
    getByPhone(phone) {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE phone = ${phone}`;
        return new Promise((resolve, reject) => {
            new QueryExecuter(db).executeQuery(query)
                .then(result => resolve(result))
                .catch(error => reject(error))
        });
    }
    save(options) {
        const query = `INSERT INTO ${TABLE_NAME} SET ?`;
        return new Promise((resolve, reject) => {
            new QueryExecuter(db).executeQuery(query, options)
                .then(result => resolve(result.insertId))
                .catch(error => reject(error))
        });
    }

    getById(id) {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`;
        return new Promise((resolve, reject) => {
            new QueryExecuter(db).executeQuery(query, id)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    }

    updateAtId(id, options) {
        options['last_updated'] = common.currentDate();
        const query = `UPDATE ${TABLE_NAME} SET ?  ${UPDATE_VER} WHERE id = ${id}`;
        return new Promise((resolve, reject) => {
            new QueryExecuter(db).executeQuery(query, options)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    }
}