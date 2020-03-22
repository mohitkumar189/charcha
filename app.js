'use strict'

const apiResponse = require("./helpers/apiResponse");
const tokenValidator = require('./middlewares/tokenValidator');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const rfs = require('rotating-file-stream')
const bearerToken = require('express-bearer-token');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
//const auth = require('express-rbac');
const acl = require('express-acl');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const app = express();

const authController = require('./helpers/authController');
const logger = require('./helpers/logger');
const db = require('./config/db').connect();
const upload = require('./helpers/fileUploader');

const logDirectory = path.join(__dirname, 'log');
// create a rotating write stream
const accessLogStream = rfs('api_access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

app.use(helmet());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));
app.post('/upload', upload.single('image'), (req, res) => { });
//--------------API DOCS------------------
app.use('/api-docss', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//It manages the token variable in request
const reqTokenObj = {
    bodyKey: 'access_token',
    queryKey: 'access_token',
    headerKey: 'Bearer',
    reqKey: 'token'
};
app.use(bearerToken(reqTokenObj));

//TEST PATH
app.get('/get-token', (req, res, next) => {
    const token = authController.generateToken({
        role: "admin"
    });
    res.json(token);
})

//It validate the token variable in request
//app.use(tokenValidator);


/*
    ------------------------ACL CONFIG START-------------------
*/
let responseObject = {
    status: 'Access Denied',
    message: 'You are not authorized to access this resource'
};

let configObject = {
    baseUrl: '/',
    searchPath: 'decoded.role', //will search for role in req.decoded.role
    defaultRole: 'anonymous'
};

//acl.config(configObject, responseObject);

//app.use(acl.authorize);
/*
    ------------------------ACL CONFIG END-------------------
*/

/*
app.use(function (req, res) {
    res.json(req.decoded);
});
*/

//Route Handler
app.use('/api/v1', require('./router'));

//error handler
app.use((err, req, res, next) => {
    if (err) {
        apiResponse.sendJson(req, res, 500, err.message);
    }
})

/*
process.on('uncaughtException', (exception) => {
    console.log("-----Exception occured---"+exception);
})
process.on('unhandledRejection', (exception) => {
    console.log("-----Exception occured---");
})
*/

module.exports = app;