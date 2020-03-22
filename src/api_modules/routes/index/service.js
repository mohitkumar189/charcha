"use strict";

const db = require('../../../configs/db')
const _ = require("underscore");
const logger = require("../../../helpers/logger");
const QueryExecuter = require("../../../helpers/queryExecuter");
const TABLE_NAME = "user_analytics";

module.exports = class Service {
    
  constructor() {}

  save(data) {
    let query = `INSERT INTO ${TABLE_NAME} SET ?`;
    return new Promise((resolve, reject) => {
      new QueryExecuter(db)
        .executeQuery(query, data)
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }
};
