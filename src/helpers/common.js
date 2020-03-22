"use strict";

const moment = require("moment-timezone");
const zone = "Asia/Kolkata";
moment.tz.setDefault(zone);

module.exports = {
  getTime: time => {
    if (time) {
      return moment(time).format();
    } else {
      return moment().format();
    }
  },
  getTimeZone: () => {
    return moment.tz.guess();
  },
  generateOtp: length => {
    return "1234";
  },
  isValidPhone: phone => {
    return true;
  },
  contentType: content => {
    if (content != undefined) {
      return typeof content;
    } else return null;
  },
  currentDate: formatType => {
    //default format 2018-05-09T12:00:22+05:30
    const common_format = "MMMM Do YYYY, h:mm:ss a"; // May 9th 2018, 11:59:39 am
    if (formatType) {
      return new moment().format(formatType);
    } else {
      return new moment().format();
    }
  },
  isSame: (str1, str2) => {
    if (str1 && str2) {
      if (str1 == str2) return true;
      else return false;
    } else {
      return false;
    }
  },
};
