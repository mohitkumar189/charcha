"use strict";

var express = require("express");
var router = express.Router();
const appPath = "api/v";
const baseFolder = "./api_modules/";
const appVersions = [
  { version: 1, path: "app_routes" },
  { version: 2, path: "app_routes" },
];

appVersions.forEach((indexValue, index) => {
  router.use(
    `/${appPath}${indexValue["version"]}`,
    require(`${baseFolder}${indexValue["path"]}`)
  );
});

module.exports = router;
