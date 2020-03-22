"use strict";
const _ = require('underscore');
const logger = require('./logger')

module.exports = class QueryExecuter {

    constructor(db) {
        this.db = db;
    }

    executeQuery(query, options = {}) {
        return new Promise((resolve, reject) => {
            this.db.getConnection(function (err, connection) {
                if (err) {
                    logger.error("ERROR::" + err)
                    connection.release();
                    reject(err);
                }
                connection.query(query, options, function (err, result) {
                    logger.info("QUERY::" + this.sql);
                    connection.release();
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result);
                    }
                });
                connection.on('error', function (err) {
                    logger.error("ERROR::" + err)
                    connection.release();
                    reject(err);
                });
            })
        })
    }
}