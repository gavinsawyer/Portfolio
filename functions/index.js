const app = require("firebase-admin/app");


app
  .initializeApp();

exports
  .getFocus = require("./focus/get")
  .default;
exports
  .setFocus = require("./focus/set")
  .default;

exports
  .getDaytime = require("./daytime/get")
  .default;
exports
  .setDaytime = require("./daytime/set")
  .default;
