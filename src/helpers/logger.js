const chalk = require('chalk');
const winston = require('winston');
const appPath = require('app-root-path').path;
const path = require('path');
const INFO_LOG = 'INFO :: ';
const DEBUG_LOG = 'DEBUG :: ';
const ERROR_LOG = 'ERROR :: ';
const logDirectory = path.join(appPath, 'logs');
const errorLogs = path.join(logDirectory, 'error.log');
const infoLogs = path.join(logDirectory, 'application_logs.log');

const infoLoggeer = new(winston.Logger)({
    level: 'info',
    transports: [
        new winston.transports.File({
            filename: infoLogs
        })
    ]
});

const errorLogger = new(winston.Logger)({
    level: 'error',
    transports: [
        new winston.transports.File({
            filename: errorLogs
        })
    ]
});

module.exports.info = function (message) {
    const logMessage = INFO_LOG + message;
    infoLoggeer.info(logMessage);
    console.log(chalk.blue(logMessage));
}
module.exports.error = function (message) {
    const logMessage = ERROR_LOG + message;
    errorLogger.error(logMessage);
    if (process.env.NODE_ENV == 'development') {
        console.log(chalk.red(logMessage));
    }
}
module.exports.debug = function (message) {
    if (process.env.NODE_ENV == 'development') {
        console.log(chalk.green(DEBUG_LOG + message))
    }
}