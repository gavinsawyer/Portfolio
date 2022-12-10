const app = require("firebase-admin/app");


app
  .initializeApp();

exports
  .getAll = require("./all/get")
  .default;

exports
  .setFocus = require("./focus/set")
  .default;
exports
  .resetFocus = require("./focus/reset")
  .default;

exports
  .setLocation = require("./location/set")
  .default;
exports
  .toggleLocation = require("./location/toggle")
  .default;

exports
  .setTime = require("./time/set")
  .default;
